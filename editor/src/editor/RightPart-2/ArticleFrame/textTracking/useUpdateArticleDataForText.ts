import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleManager from 'articleManager/articleManager'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import { getState } from 'utils/miscUtils'
import { updateTextCompInArticleData } from './manageUpdatingDTextComp'
import textManagerData from './textManagerData'
import articleActions from 'store/article/articleActions'
import { store } from 'store/rootReducer'

/**
 * Хук отслеживает выделение компонентов.
 * Если это текстовый компонент, то ставит его id в Хранилище textManagerData.
 * Это требуется для других функций для понимания, что выделен текстовый компонент
 */
export function useSetTextDetails() {
    const article = articleManager.hooks.getCurrentArticle()
    const flashedElems = articleManager.hooks.getFlashedElemCoords()

    useEffect(function () {
        if (!flashedElems || !article) return
        const { selectedElem } = flashedElems

        // Если компонент не изменился, то ничего не делать
        if (selectedElem.dataCompId === textManagerData.textCompId) return

        // Если выделили текстовый компонент
        if (selectedElem.tagType === 'textComponent') {

            // Если раньше был выделен текстовый компонент, то поставить новый текст в данные.
            if (textManagerData.textCompId) {
                updateTextCompInArticleData()
            }

            // Сохранить id выделенного текстового элемента
            textManagerData.setTextCompId(selectedElem.dataCompId)

            // Данные выделенного текстового элемента
            const dTextComp = articleManager.getComponent(article.dComps, selectedElem.dataCompId) as ArticleTypes.SimpleTextComponent

            // Сохранить изначальный текст компонента
            textManagerData.setInitialText(dTextComp.text)
            textManagerData.setNewText(dTextComp.text)
        }
        // Обновить данные текстового компонента если он был ранее выделен и выделение сняли
        else if (!selectedElem.tagType) {
            updateTextCompInArticleData()
        }

        // Поставить флаг, что новый элемент истории для занесения нового текста ещё не поставлен.
        textManagerData.setNewHistoryItemCreated(false)
    }, [flashedElems])
}

/** Хук ставит обработчики изменения текста. */
export function useSetHandlersToTrackText() {
    const { $links } = useGetArticleSelectors()
    // Were mouse move handlers set?
    const [handlerWasSet, setHandlerWasSet] = useState(false)

    useEffect(function () {
        if (!$links.$document || handlerWasSet) return

        // Поставить обработчики на изменение текста
        $links.$document.addEventListener('keypress', trackTextChanges)
        $links.$document.addEventListener('keydown', trackTextDeleteChange)
        $links.$document.addEventListener('paste', trackPasteText)
        $links.$document.addEventListener('cut', trackTextChanges)

        // Set flag that handlers were set
        setHandlerWasSet(true)
    }, [$links])
}

/* Обработчик удаления текста в текстовом компоненте. Если текст удаляют, то запускается другой обработчик. */
function trackTextDeleteChange(e: any) {
    if (e.key === 'Backspace' || e.key === 'Delete') {
        trackTextChanges()
    }
}

/* Обработчик вставки текста.
 * Убирает с вставленного текста всё форматирование и контролирует положение фокуса. */
function trackPasteText(e: any) {
    e.preventDefault()

    // Ничего не делать если не выделен текстовый компонент
    if (!textManagerData.textCompId) return

    const { $body, $document, $window } = getState().article.$links

    // html-объект компонента
    const $textComp = articleManager.get$elemBy$body(
        $body, textManagerData.textCompId
    )

    const oldText = $textComp.textContent

    //@ts-ignore
    let paste = (e.clipboardData || window.clipboardData).getData('text')

    const selection = $window.getSelection()
    const {anchorOffset, focusOffset} = selection

    const newText = oldText.substring(0, anchorOffset) + paste + oldText.substring(focusOffset)

    createNewHistoryItem()

    updateTextDataWithTextInHtml(newText)
    updateTextCompInArticleData()

    setTimeout(function () {
        const selection = $window.getSelection()
        selection.collapse($textComp.firstChild, anchorOffset + paste.length)
    }, 100)
}


/* Обработчик изменения текста в текстовом компоненте. */
function trackTextChanges() {
    // Ничего не делать если не выделен текстовый компонент
    if (!textManagerData.textCompId) return

    // Создать новый объект истории для текста если он ещё не создан
    if (!textManagerData.newHistoryItemCreated) {
        createNewHistoryItem()
    }

    // Таймер чтобы браузер успел обновить текст, который я сохраняю
    setTimeout(updateTextDataWithTextInHtml, 50)
}

/** Функция получает текст выделенного текстового компонента из документа и сохраняет его в textManagerData. */
function updateTextDataWithTextInHtml(newText?: string) {
    const { $body } = getState().article.$links

    // html-объект компонента
    const $textComp = articleManager.get$elemBy$body(
        $body, textManagerData.textCompId
    )

    // Запомнить новый текст
    textManagerData.setNewText(newText || $textComp.textContent)
}

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