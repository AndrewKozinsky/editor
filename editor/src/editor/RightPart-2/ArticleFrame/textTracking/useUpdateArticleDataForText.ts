import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleManager from 'articleManager/articleManager'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import { getState } from 'utils/miscUtils'
import { updateDataInTextComp } from './manageUpdatingDTextComp'
import textManagerData from './textManagerData'
import articleActions from 'store/article/articleActions'
import { store } from 'store/rootReducer'

/** Хук отслеживает выделение компонентов и организует отрисовку текста у текстовых компонентов */
export function useTrackCompSelection() {
    const article = articleManager.hooks.getCurrentArticle()
    const flashedElems = articleManager.hooks.getFlashedElemCoords()
    const selectedElem = flashedElems?.selectedElem

    useEffect(function () {
        if (!article) return

        // Обновить данные текстового компонента если он был ранее выделен
        if (textManagerData.textCompId) {
            updateDataInTextComp('common')
        }

        // Если выделили текстовый компонент
        if (selectedElem.tagType === 'textComponent') {
            // Сохранить id выделенного текстового элемента
            textManagerData.setTextCompId(selectedElem.dataCompId)

            // Данные выделенного текстового компонента
            const dTextComp = articleManager.getComponent(article.dComps, selectedElem.dataCompId) as ArticleTypes.SimpleTextComponent

            // Сохранить изначальный текст компонента
            textManagerData.setInitialText(dTextComp.text)
            textManagerData.setNewText(dTextComp.text)
        }
    }, [selectedElem])
}

/** Хук ставит обработчики изменения текста. */
export function useSetHandlersToTrackText() {
    const { $links } = useGetArticleSelectors()
    // Were mouse move handlers set?
    const [handlerWasSet, setHandlerWasSet] = useState(false)

    useEffect(function () {
        if (!$links.$document || handlerWasSet) return

        // Поставить обработчик
        $links.$document.addEventListener('keypress', textChangeHandler)
        $links.$document.addEventListener('keydown', textChangeHandler)
        $links.$document.addEventListener('paste', textChangeHandler)
        $links.$document.addEventListener('cut', textChangeHandler)

        // Set flag that handlers were set
        setHandlerWasSet(true)
    }, [$links])
}

/**
 * Обработчик изменения текста выделенного текстового компонента
 * @param {Object} e — объект события
 */
function textChangeHandler(e: any) {
    // Ничего не делать если не выбран текстовый компонент
    if (!textManagerData.textCompId) return

    // Вставить новый объект истории если требуется
    if (['keypress', 'cut', 'paste'].includes(e.type) || e.type === 'keydown' && ['Backspace', 'Delete'].includes(e.code)) {
        if (!textManagerData.newHistoryItemCreated) createNewHistoryItem()
    }

    const { $body } = getState().article.$links

    // html-объект компонента
    const $textComp = articleManager.get$elemBy$body(
        $body, textManagerData.textCompId
    )

    // Если нажали символьную клавишу, то поставить новый текст в данные и Реакт обновит текст компонента
    if (['keypress', 'cut'].includes(e.type)) {
        setTimeout(() => textManagerData.setNewText($textComp.textContent), 50)
    }
    // Если нажали клавиши Backspace и Delete, то поставить новый текст в данные и Реакт обновит текст компонента
    else if (e.type === 'keydown' && ['Backspace', 'Delete'].includes(e.code)) {
        setTimeout(() => textManagerData.setNewText($textComp.textContent), 50)
    }
    // Если вставили текст
    else if (e.type === 'paste') {
        e.preventDefault()
        // Получить новый текст и вставить в textManagerData
        const newText = getPastedText(e)
        textManagerData.setNewText(newText)

        // Поставить новый текст в данные и Реакт обновит текст компонента
        updateDataInTextComp('paste', $textComp)
    }
}

/**
 * Функция возвращает текст, который должен быть после вставки другого текста
 * @param {Object} e — объект события
 */
function getPastedText(e: any) {
    //@ts-ignore
    // Вставляемый текст
    let paste = (e.clipboardData || window.clipboardData).getData('text')

    // Если в компоненте уже есть текст, то составить новую строку где будет совмещён существующий и новый текст
    const { $window } = getState().article.$links
    const selection = $window.getSelection()
    const { anchorOffset, focusOffset } = selection

    const { initialText } = textManagerData
    return initialText.substring(0, anchorOffset) + paste + initialText.substring(focusOffset)
}

/** Функция создаёт новый объект истории чтобы в него писать данные текстового компонента. */
function createNewHistoryItem() {
    const { article } = articleManager.getCurrentHistoryItem()
    const dTextComp = articleManager.getComponent(article.dComps, textManagerData.textCompId) as ArticleTypes.SimpleTextComponent

    // Создать новый объект истории со ссылкой на копию текстового компонента
    const compsAndMaxCompId = articleManager.updateTextInComponent(
        article, dTextComp
    )

    // Сохранить новый объект истории
    store.dispatch(articleActions.createAndSetHistoryItem(
        compsAndMaxCompId
    ))

    textManagerData.setNewHistoryItemCreated(true)
}
