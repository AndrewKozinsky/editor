import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleManager from 'articleManager/articleManager'
import textManagerData from './textManagerData'
import { store } from 'store/rootReducer'
import articleActions from 'store/article/articleActions'
import StoreArticleTypes from 'store/article/articleTypes'
import { getState } from 'utils/miscUtils'

/**
 * Хук отслеживает выделение компонентов.
 * Если это текстовый компонент, то ставит его id в Хранилище textManagerData.
 * Это требуется для функций ниже для понимания, что выделен текстовый компонент
 * и тогда текст текстового компонента должен сохраняться в данные.
 * Также сохраняются данные нужно ли создавать новый объект истории при изменении текстового компонента.
 */
export function useSetTextDetails() {
    const { $links } = useGetArticleSelectors()
    const flashedElems = articleManager.hooks.getFlashedElemCoords()
    const article = articleManager.hooks.getCurrentArticle()

    useEffect(function () {
        if (!$links || !flashedElems || !article) return
        const { selectedElem } = flashedElems

        // Если компонент не изменился, то ничего не делать
        if (selectedElem.dataCompId === textManagerData.textCompId) return

        // Занести id текстового компонента в textManagerData или обнулить
        if (selectedElem.tagType === 'textComponent') {
            textManagerData.setTextCompId(selectedElem.dataCompId)
            // Запретить перерисовку статьи
            textManagerData.setAllowToRenderArticle(false)
        }
        else {
            textManagerData.setTextCompId(null)
            // Разрешить перерисовку статьи
            textManagerData.setAllowToRenderArticle(true)
        }

        // Поставить флаг, что новый элемент истории для занесения нового текста ещё не поставлен.
        textManagerData.setNewHistoryItemCreated(false)
    }, [flashedElems])
}

/** Хук ставит обработчики изменения текста */
export function useUpdateArticleDataForText() {
    const { $links } = useGetArticleSelectors()
    // Were mouse move handlers set?
    const [handlerWasSet, setHandlerWasSet] = useState(false)

    useEffect(function () {
        if (!$links.$document || handlerWasSet) return

        // Поставить обработчики на изменение текста
        $links.$document.addEventListener('keydown', updateArticleDataForText)
        $links.$document.addEventListener('paste', updateArticleDataForText)
        $links.$document.addEventListener('cut', updateArticleDataForText)

        // Set flag that handlers were set
        setHandlerWasSet(true)
    }, [$links, handlerWasSet])
}

/* Обработчик изменения текста */
function updateArticleDataForText() {
    // Ничего не делать если выделен не текстовый компонент
    if (!textManagerData.textCompId) return

    // Создать новый объект истории для текста если он ещё не создан
    if (!textManagerData.newHistoryItemCreated) {
        const { article } = articleManager.getCurrentHistoryItem()
        const dTextComp = articleManager.getComponent(article.dComps, textManagerData.textCompId)
        if (dTextComp.dCompType !== 'simpleTextComponent') return

        // Создать новый объект истории с ссылкой на копию тексового компонента
        const compsAndMaxCompId = articleManager.updateTextInComponent(
            article, dTextComp
        )

        // Сохранить новый объект истории
        store.dispatch(articleActions.createAndSetHistoryItem(
            compsAndMaxCompId
        ))

        textManagerData.setNewHistoryItemCreated(true)
    }

    // Таймер чтобы браузер успел обновить текст, который я забираю
    setTimeout(function () {
        // Взять текст из документа и обновить данные выделенного текстового компонента
        updateTextCompDataWithTextInHtml()
    }, 100)
}

/** Функция получает текст выделенного текстового компонента из документа и ставит его в данные. */
function updateTextCompDataWithTextInHtml() {
    // Получение данных выделенного компонента
    const { article, selectedElem } = articleManager.getCurrentHistoryItem()

    // Данные выделенного текстового компонента
    const dTextComp = articleManager.getComponent(article.dComps, selectedElem.dataCompId)
    if (dTextComp.dCompType !== 'simpleTextComponent') return

    const { $body } = getState().article.$links

    // html-объект компонента
    const $textComp = articleManager.get$elemBy$body(
        $body, selectedElem.dataCompId
    )

    // Поставить новый текст в текстовый компонент
    dTextComp.text = $textComp.textContent
}

/**
 * Вспомогательная функция позволяющая или запрещает отрисовывать статью если выделен текстовый компонент.
 * Требуется если нужно отрисовать статью при выделенном текстовом компоненте потому что в этом случае отрисовка запрещается.
 * Применяется в кнопках левой нижней части редактора.
 * @param {Boolean} allowToRender — разрешить ли отрисовывать статью
 */
export function setArticleRenderIfTextCompSelected(allowToRender: boolean) {
    const { selectedElem } = articleManager.getFlashedElemCoords()
    if (selectedElem.tagType !== 'textComponent') return

    // Если требуется разрешить отрисовку статьи
    if (allowToRender) {
        textManagerData.setAllowToRenderArticle(true)
    }
    // Если нужно запретить, то сделаю небольшую задержку чтобы успели отработать сценарии отрисовывающие статью
    else {
        setTimeout(function () {
            // Запретить отрисовку статьи
            textManagerData.setAllowToRenderArticle(false)
        }, 100)
    }
}