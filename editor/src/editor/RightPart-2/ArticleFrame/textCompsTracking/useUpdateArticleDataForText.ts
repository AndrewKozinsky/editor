import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleManager from 'articleManager/articleManager'
import textManagerData from './textManagerData'
import { store } from 'store/rootReducer'
import articleActions from 'store/article/articleActions'
import { getState } from 'src/utils/miscUtils/miscUtils'

/**
 * Хук отслеживает выделение компонентов. Если это текстовый компонент, то ставит его id в Хранилище textManagerData.
 * Также обнуляет newHistoryItemCreated и
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
        }
        else {
            textManagerData.setTextCompId(null)
        }

        // Поставить флаг, что новый элемент истории для занесения нового текста ещё не поставлен.
        textManagerData.setNewHistoryItemCreated(false)
    }, [flashedElems])
}

/** Хук ставит обработчик ввода текста */
export function useUpdateArticleDataForText() {
    const { $links } = useGetArticleSelectors()
    // Were mouse move handlers set?
    const [handlerWasSet, setHandlerWasSet] = useState(false)

    useEffect(function () {
        if (!$links.$document || handlerWasSet) return

        // Set handlers
        $links.$document.addEventListener('keydown', updateArticleDataForText)

        // Set flag that handlers were set
        setHandlerWasSet(true)
    }, [$links, handlerWasSet])
}

/* Обработчик ввода текста */
function updateArticleDataForText() {
    // Ничего не делать если выделен не текстовый компонент
    if (!textManagerData.textCompId) return

    // Создать новый объект истории для текста если он ещё не создан
    if (!textManagerData.newHistoryItemCreated) {
        const { article } = articleManager.getCurrentHistoryItem()
        const dTextComp = articleManager.getComponent(article.dComps, textManagerData.textCompId)
        if (dTextComp.dCompType !== 'simpleTextComponent') return

        const compsAndMaxCompId = articleManager.updateTextInComponent(
            article, dTextComp
        )

        // Сохранить новый объект истории
        store.dispatch(articleActions.createAndSetHistoryItem(
            compsAndMaxCompId
        ))

        textManagerData.setNewHistoryItemCreated(true)
    }

    // Очистить таймер, который был поставлен в прошлый раз.
    // Это требуется, чтобы уменьшить нагрузку на Редакс при обновлении данных текстового компонента.
    // Чтобы данные обновлялись не чаще обозначенного времени
    clearTimeout(textManagerData.timerId)

    const timerId = setTimeout(function () {
        // Обновить данные выделенного текстового компонента
        updateTextCompDataWithTextInHtml()
    }, 200)

    textManagerData.setTimerId(timerId)
}

/** Функция обновляет текст выделенные текстового компонента в данных */
function updateTextCompDataWithTextInHtml() {
    // Получение данных выделенного компонента
    const { article, selectedElem } = articleManager.getCurrentHistoryItem()

    // Данные выделенного текстового компонента
    const dTextComp = articleManager.getComponent(article.dComps, selectedElem.dataCompId)
    if (dTextComp.dCompType !== 'simpleTextComponent') return

    const { $document, $body } = getState().article.$links
    const { anchorOffset, focusOffset } = $document.getSelection()

    // html-объект компонента
    const $textComp = articleManager.get$elemBy$body(
        $body, selectedElem.dataCompId
    )

    // Поставить новый текст в текстовый компонент
    dTextComp.text = $textComp.textContent
    // Сделать обратную операцию чтобы текст не двоился
    $textComp.textContent = dTextComp.text

    // Выделить те буквы, которые были выделены изначально
    setTimeout(function () {
        $document.getSelection().setBaseAndExtent(
            $textComp.firstChild, anchorOffset, $textComp.firstChild, focusOffset
        )
    }, 15)
}
