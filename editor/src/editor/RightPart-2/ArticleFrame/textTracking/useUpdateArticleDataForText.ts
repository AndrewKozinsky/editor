import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleManager from 'articleManager/articleManager'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import { getState } from 'utils/miscUtils'
import { updateDataInTextComp } from './manageUpdatingDTextComp'
import textManagerStore from './textManagerStore'
import articleActions from 'store/article/articleActions'
import { store } from 'store/rootReducer'
import {useGetResizeHandler} from '../flashElements/useResizeFlashRects'

/** Хук отслеживает выделение компонентов и организует отрисовку текста у текстовых компонентов */
export function useTrackCompSelection() {
    const { $links } = useGetArticleSelectors()

    const article = articleManager.hooks.getCurrentArticle()
    const flashedElems = articleManager.hooks.getFlashedElemCoords()
    const selectedElem = flashedElems?.selectedElem

    useEffect(function () {
        if (!article) return

        // Обновить данные текстового компонента если он был ранее выделен
        if (textManagerStore.textCompId) {
            updateDataInTextComp('common')
        }

        // Если выделили текстовый компонент
        if (selectedElem.tagType === 'textComponent') {
            // Сохранить id выделенного текстового элемента
            textManagerStore.setTextCompId(selectedElem.dataCompId)

            // Данные выделенного текстового компонента
            const dTextComp = articleManager.getComponent(article.dComps, selectedElem.dataCompId) as ArticleTypes.SimpleTextComponent

            // Сохранить изначальный текст компонента
            textManagerStore.setInitialText(dTextComp.text)
            textManagerStore.setNewText(dTextComp.text)

            // Ничего не делать если текстовый компонент скрыт или скрыт родительский элемент
            if (articleManager.isItemHidden(dTextComp) || articleManager.isParentElemHidden(article.dComps, dTextComp, null, false, null)) {
                return
            }

            // Я столкнулся с проблемой когда при создании текстового компонента и написании туда текста он двоится.
            // Но если текст уже был написан ранее, то такого эффекта не возникает.
            // Как я считаю при создании текстового компонента туда помещается текстовый узел.
            // А если текст уже изменили и обновили Хранилище, то он пропадает.
            // Поэтому при выделении текстового компонента я проверяю, что если есть пустой текстовый узел, то удаляю его.
            // Нужно проверять именно на пустоту текстового узла. По-другому не работает.
            const $textComp = articleManager.get$elemBy$body($links.$body, textManagerStore.textCompId)
            if($textComp.firstChild?.textContent === '') {
                $textComp.firstChild.remove()
            }
        }
        else {
            // Очистить TextManagerData если текстовый компонент не выделен
            textManagerStore.setTextCompId(null)
            textManagerStore.setInitialText('')
            textManagerStore.setNewText('')
            textManagerStore.setNewHistoryItemCreated(false)
        }
    }, [selectedElem])
}

/** Хук ставит обработчики изменения текста. */
export function useSetHandlersToTrackText() {
    const { $links } = useGetArticleSelectors()
    // Were mouse move handlers set?
    const [handlerWasSet, setHandlerWasSet] = useState(false)

    // Ссылка на функцию, который нужно запускать для пересчёта положения
    // и размера подсвечивающих прямоугольников
    const resizeHandler = useGetResizeHandler()

    useEffect(function () {
        if (!$links.$document || handlerWasSet || !resizeHandler) return

        // Поставить обработчик
        $links.$document.addEventListener('input', (e: any) => textChangeHandler(e, resizeHandler))
        $links.$document.addEventListener('paste', (e: any) => textChangeHandler(e, resizeHandler))
        $links.$document.addEventListener('keydown', preventWrongKeys)

        // Set flag that handlers were set
        setHandlerWasSet(true)
    }, [$links, resizeHandler])
}

/**
 * Обработчик изменения текста выделенного текстового компонента
 * @param {Object} e — объект события
 * @param resizeHandler
 */
function textChangeHandler(e: any, resizeHandler: () => void) {
    // Ничего не делать если не выбран текстовый компонент
    if (!textManagerStore.textCompId) return

    // Ставить новый объект истории если требуется
    if (!textManagerStore.newHistoryItemCreated) {
        createNewHistoryItem()
    }

    // html-объект компонента
    const $textComp = articleManager.get$elemBy$body(
        getState().article.$links.$body, textManagerStore.textCompId
    )
    if (!$textComp) return

    // Если вставили текст
    if (e.type === 'paste') {
        e.preventDefault()

        // Получение объекта выделения
        const { $window } = getState().article.$links
        const selection = $window.getSelection()

        // Получить новый текст и новую позицию курсора
        const { newText, newCursorPosition } = getPastedTextInfo(e, selection)

        // Вставить новый текст в textManagerStore
        textManagerStore.setNewText(newText)

        // Поставить новый текст в данные и Реакт обновит текст компонента
        updateDataInTextComp('paste', $textComp)

        // Поставить курсор на позицию, где он должен быть
        setTimeout(() => {
            selection.collapse($textComp.firstChild, newCursorPosition)
        }, 10)

        setTimeout(resizeHandler, 10)
    }
    // Если изменили текст, то поставить новый текст в данные и Реакт обновит текст компонента
    else if (e.type === 'input' && ['insertText', 'deleteByCut', 'deleteContentBackward'].includes(e.inputType)) {
        setTimeout(() => {
            textManagerStore.setNewText($textComp.textContent)

            setTimeout(resizeHandler, 10)
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
 * Функция возвращает текст, который должен быть после вставки другого текста и новую позицию курсора
 * @param {Object} e — объект события
 * @param {Object} selection — объект выделения
 */
function getPastedTextInfo(e: any, selection: Selection) {
    //@ts-ignore
    // Вставляемый текст
    let paste = (e.clipboardData || window.clipboardData).getData('text')

    // Если в начале строки или в конце есть пробелы, то заменить их на &nbsp; потому что иначе они не будут отображаться
    if (paste.startsWith(' ')) {
        paste = '\u00A0' + paste.slice(1)
    }
    if (paste.endsWith(' ')) {
        paste = paste.slice(0, -1) + '\u00A0'
    }

    // Если в компоненте уже есть текст, то составить новую строку где будет совмещён существующий и новый текст
    const { anchorOffset, focusOffset } = selection

    const currentText = textManagerStore.newText

    const newText = currentText.substring(0, anchorOffset) + paste + currentText.substring(focusOffset)
    const newCursorPosition = anchorOffset + paste.length

    return {
        newText,
        newCursorPosition
    }
}

/** Функция создаёт новый объект истории чтобы в него писать данные текстового компонента. */
function createNewHistoryItem() {
    const { article } = articleManager.getCurrentHistoryItem()
    const dTextComp = articleManager.getComponent(article.dComps, textManagerStore.textCompId) as ArticleTypes.SimpleTextComponent

    // Создать новый объект истории со ссылкой на копию текстового компонента
    const compsAndMaxCompId = articleManager.updateTextInComponent(
        article, dTextComp
    )

    // Сохранить новый объект истории
    store.dispatch(articleActions.createAndSetHistoryItem(
        compsAndMaxCompId
    ))

    textManagerStore.setNewHistoryItemCreated(true)
}
