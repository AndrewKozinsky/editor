import { useEffect } from 'react'
import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'
import actions from 'store/rootAction'
import useGetArticleSelectors from 'store/article/articleSelectors'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import StoreArticleTypes from 'store/article/articleTypes'
import { store } from 'store/rootReducer'
import articleManager from 'articleManager/articleManager'

/**
 * В зависимости от нажатой клавиши, которая хранится в Хранилище,
 * хук обновляет текст активного текстового компонента.
 */
export default function useChangeActiveTextComponent() {
    const { pressedKey, $links } = useGetArticleSelectors()
    const historyItem = articleManager.hooks.getCurrentHistoryItem()

    useEffect(function () {
        // id выделенного текстового компонента
        const textCompId = historyItem?.selectedTextComp?.dataCompId
        if (!pressedKey.code || !textCompId || !$links) return

        const selection = $links.$document.getSelection()

        const arrKeyTypes = ['ArrowLeft', 'ArrowRight', 'ArrowUp','ArrowDown']

        // Если нажали клавиши-стрелки, то передвинуть курсор
        if (arrKeyTypes.indexOf(pressedKey.code) !== -1 ) {
            moveFocusStick(pressedKey, selection)
        }
        // Если нажали Ctrl + A, то выделить весь текст
        else if (pressedKey.code === 'Text' && pressedKey.value === 'a' && pressedKey.ctrlKey) {
            selectAllText(selection)
        }
        // В остальных случаях обновить текст текстового компонента
        else {
            updateTextComp(selection, historyItem, textCompId, pressedKey, $links)
        }
    }, [pressedKey, $links, historyItem])
}

/**
 * Функция регулирует положение курсора в зависимости от нажатых клавиш-стрелок
 * @param {Object} pressedKey — данные о нажатой клавише
 * @param {Object} selection — объект выделения на странице
 */
function moveFocusStick(pressedKey: StoreArticleTypes.PressedKey, selection: Selection) {
    const { anchorOffset, focusOffset } = selection

    // Текстовый узел, где есть выделение
    const $text = selection.anchorNode as CharacterData

    // @ts-ignore
    // Если курсор находится в знаке пустого текста, то ничего не делать
    if ($text.tagName === 'EMPTY-TEXT-SIGN') return

    if (pressedKey.code === 'ArrowLeft') {
        // Запрет перемещения фокуса на несуществующую позицию
        if (focusOffset - 1 < 0) return

        if (pressedKey.shiftKey) {
            selection.setBaseAndExtent(
                $text, anchorOffset,
                $text, focusOffset - 1
            )
        }
        else {
            selection.setPosition(
                $text,
                focusOffset - 1
            )
        }
    }
    else if (pressedKey.code === 'ArrowRight') {
        // Запрет перемещения фокуса на несуществующую позицию
        if (focusOffset + 1 > $text.length) return

        if (pressedKey.shiftKey) {
            selection.setBaseAndExtent(
                $text, anchorOffset,
                $text, focusOffset + 1
            )
        }
        else {
            selection.setPosition(
                $text,
                focusOffset + 1
            )
        }
    }
}

/**
 * Функция выделяет весь текст в текстовом компоненте где сейчас стоит курсор
 * @param {Object} selection — объект выделения на странице
 */
function selectAllText(selection: Selection) {
    // Текстовый узел, где есть выделение
    const $text = selection.anchorNode as CharacterData

    selection.setBaseAndExtent(
        $text, 0,
        $text, $text.length
    )
}

/**
 * Функция, в зависимости от выделения в тексте и нажатой клавиши изменяет текст в статье и возвращает обновлённую статью
 * @param {Object} selection — объект выделения на странице
 * @param {Object} article — данные статьи
 * @param {Number} textCompId — id данных выделенного компонента
 * @param {Object} pressedKey — данные о нажатой клавише
 * @param {Object} $links — объект ссылок на элементы iFrame.
 */
function updateTextComp(
    selection: Selection,
    article: StoreArticleTypes.HistoryItem,
    textCompId: number,
    pressedKey: StoreArticleTypes.PressedKey,
    $links: StoreArticleTypes.LinksObj
) {
    const { anchorOffset, focusOffset } = selection

    // 1. Получить выделенный текстовый компонент
    const dTextComp = articleManager.getComponent(article.article.dComps, textCompId) as ArticleTypes.SimpleTextComponent

    // 2. Сделать его копию
    const dTextCompCopy = Object.assign({}, dTextComp)

    // 3. Обновить текст
    const newText = getNewText(selection, dTextCompCopy.text, pressedKey)
    if (!newText && newText !== '') return
    dTextCompCopy.text = newText

    // 4. Собрать новую статью
    const newArticle: StoreArticleTypes.HistoryItem = makeImmutableObj(article, dTextComp, dTextCompCopy)

    // Снять фокус потому что после пересборки статьи он окажется вначале текста из-за того,
    // что старый текст заменяется на новый, поэтому фокус сбивается.
    // Код ниже ставит его после введённого символа. Снятие фокуса позволяет избежать мерцания бегунка.
    selection.empty()

    // 5. Запустить экшен для обновления статьи
    store.dispatch(actions.article.updateCurrentArticle(newArticle))

    // 6. Поставить фокус после уставленного текста.
    // Задержка нужна чтобы Реакт успел перерисовать статью
    setTimeout(function () {
        setFocusToNewPosition($links.$document, dTextComp, pressedKey, anchorOffset, focusOffset)
    })
}

/**
 * Функция, в зависимости от выделения в тексте и нажатой клавиши изменяет исходный текст и возвращает новый текст
 * @param {Object} selection — объект выделения на странице
 * @param {String} currentText — текущий текст в текстовом компоненте
 * @param {Object} pressedKey — данные о нажатой клавише
 */
function getNewText(selection: Selection, currentText: string, pressedKey: StoreArticleTypes.PressedKey): string {
    // Если выделены символы и нажали клавишу удаления, то просто удалить выделенные символы
    if ((pressedKey.code === 'Backspace' || pressedKey.code === 'Delete') && !selection.isCollapsed) {
        return (
            currentText.slice(0, selection.anchorOffset) +
            currentText.slice(selection.focusOffset)
        )
    }
    // Если удаляют символ левее выделения
    else if (pressedKey.code === 'Backspace') {
        if (selection.anchorOffset > 0) {
            return (
                currentText.slice(0, selection.anchorOffset - 1) +
                currentText.slice(selection.focusOffset)
            )
        }
        return currentText
    }
    // Если удаляют символ правее выделения
    else if (pressedKey.code === 'Delete') {
        return (
            currentText.slice(0, selection.anchorOffset) +
            currentText.slice(selection.focusOffset + 1)
        )
    }
    // Если вставляют букву
    else if (pressedKey.code === 'Text') {
        return (
            currentText.slice(0, selection.anchorOffset) +
            pressedKey.value +
            currentText.slice(selection.focusOffset)
        )
    }
}

/**
 * Функция ставит выделяющую палку в то место, где она должна оказаться после изменения текста
 * @param {Document} $document — документ iFrame-а
 * @param {Object} dTextComp — данные о текстовом компоненте
 * @param {Object} pressedKey — данные о нажатой клавише
 * @param {Number} anchorOffset — значение смещения якоря
 * @param {Number} focusOffset — значение смещения фокуса
 */
function setFocusToNewPosition(
    $document: Document,
    dTextComp:  ArticleTypes.SimpleTextComponent,
    pressedKey: StoreArticleTypes.PressedKey,
    anchorOffset: number,
    focusOffset: number
) {
    const $textContainer = $document.querySelector(`[data-em-d-text-comp-id="${dTextComp.dCompId}"]`)
    const $text = $textContainer.firstChild

    let cursorPosition = anchorOffset

    if (pressedKey.code === 'Text') {
        cursorPosition = anchorOffset + pressedKey.value.length
    }
    else if (pressedKey.code === 'Backspace') {
        if (anchorOffset) {
            cursorPosition = anchorOffset - 1
        }
        else {
            cursorPosition = anchorOffset
        }
    }

    let range = new Range()
    range.setStart($text, cursorPosition)
    range.setEnd($text, cursorPosition)

    $document.getSelection().addRange(range)
}
