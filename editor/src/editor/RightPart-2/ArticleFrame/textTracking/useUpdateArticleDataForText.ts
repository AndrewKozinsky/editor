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
        else {
            // Очистить textCompId в TextManagerData если текстовый компонент не выделен
            textManagerData.setTextCompId(null)
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
        // Событие, чтобы отловить вставку эмоджи
        $links.$document.addEventListener('DOMCharacterDataModified', textChangeHandler)

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

    // Не ставить символ в текстовое поле если нажали недопустимую клавишу
    preventWrongKeys(e)

    // Ставить новый объект истории если требуется
    if (['paste', 'DOMCharacterDataModified', 'keypress'].includes(e.type) || e.type === 'keydown' && ['Backspace', 'Delete'].includes(e.code)) {
        if (!textManagerData.newHistoryItemCreated) {
            createNewHistoryItem()
        }
    }

    // html-объект компонента
    const $textComp = articleManager.get$elemBy$body(
        getState().article.$links.$body, textManagerData.textCompId
    )

    // Если вставили текст
    if (e.type === 'paste') {
        e.preventDefault()

        // Получить новый текст и вставить в textManagerData
        const newText = getPastedText(e)
        textManagerData.setNewText(newText)

        // Поставить новый текст в данные и Реакт обновит текст компонента
        updateDataInTextComp('paste', $textComp)
    }
    // Если изменили текст, то поставить новый текст в данные и Реакт обновит текст компонента
    else if (['DOMCharacterDataModified', 'keypress'].includes(e.type) || e.type === 'keydown' && ['Backspace', 'Delete'].includes(e.code)) {
        setTimeout(() => {
            if (!$textComp) return
            textManagerData.setNewText($textComp.textContent)
        }, 30)
    }
}

/**
 * Функция отменяет установку в текстовое поле недопустимых символов.
 * @param {Object} e — объект события
 */
function preventWrongKeys(e: any) {
    // Ничего не делать если нажали не символьные клавиши, которые не являются кнопками удаления влево или вправо
    if (e.type === 'keydown' && e.key === 'Enter') {
        e.preventDefault()
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
