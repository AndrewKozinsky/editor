import {
    checkPressedKeys,
    PressedKeysObj
} from 'utils/getPressedKeys'
import {getState} from 'utils/miscUtils'
import fireEvent from '../../../../event/fireEvent'

/**
 * Сохранение статьи
 * @param {Object} e — объект события
 * @param {Object} pressedKeys — объект с данными о нажатых клавишах
 */
export function saveArticle(e: KeyboardEvent, pressedKeys: PressedKeysObj) {

    if (checkPressedKeys(pressedKeys, ['cmd', 's'])) {
        e.preventDefault()

        // Запустить событие сохранения статьи
        fireEvent({
            event: 'saveArticle',
        })
    }
}

/**
 * If you pressed Cmd + Z or Shift + Cmd + Z, then make undo or redo history step in article
 * @param {Object} e — объект события
 * @param {Object} pressedKeys — объект с данными о нажатых клавишах
 */
export function undoRedoArticleHistory(e: KeyboardEvent, pressedKeys: PressedKeysObj) {
    let direction: 'undo' | 'redo'

    if (checkPressedKeys(pressedKeys, ['cmd', 'z'])) {
        e.preventDefault()
        direction = 'undo'
    }
    else if (checkPressedKeys(pressedKeys, ['cmd', 'shift', 'z'])) {
        e.preventDefault()
        direction = 'redo'
    }
    else {
        return // Ничего не делать если не соответствует клавишам выше
    }

    // Запустить события перемещения по истории если это возможно
    fireEvent({
        event: 'makeHistoryStep',
        direction,
    })
}

/**
 * Удаление выделенного компонента или элемента
 * @param {Object} e — объект события
 * @param {Object} pressedKeys — объект с данными о нажатых клавишах
 */
export function deleteSelectedItem(e: KeyboardEvent, pressedKeys: PressedKeysObj) {
    // Разрешено ли удаление
    let allowDeleting = false

    const { history, historyCurrentIdx } = getState().article
    const historyItem = history[historyCurrentIdx]
    if (!historyItem) return

    const { selectedElem } = historyItem

    if (['element', 'rootElement'].includes(selectedElem.tagType)) {
        if (checkPressedKeys(pressedKeys, ['backspace'])) {
            allowDeleting = true
        }
        else if (checkPressedKeys(pressedKeys, ['delete'])) {
            allowDeleting = true
        }
        else if (checkPressedKeys(pressedKeys, ['shift', 'alt', 'cmd', 'backspace'])) {
            allowDeleting = true
        }
        else if (checkPressedKeys(pressedKeys, ['shift', 'alt', 'cmd', 'delete'])) {
            allowDeleting = true
        }
    }

    // Удалить текстовый компонент можно только если нажать 4 клавиши
    else if (selectedElem.tagType === 'textComponent') {
        if (checkPressedKeys(pressedKeys, ['shift', 'alt', 'cmd', 'backspace'])) {
            allowDeleting = true
        }
        else if (checkPressedKeys(pressedKeys, ['shift', 'alt', 'cmd', 'delete'])) {
            allowDeleting = true
        }
    }


    if (allowDeleting) {
        // Запустить события удаления выделенного элемента если это возможно
        fireEvent({
            event: 'deleteSelectedItem',
        })
    }
}

/**
 * Изменение видимости выделенного компонента или элемента
 * @param {Object} e — объект события
 * @param {Object} pressedKeys — объект с данными о нажатых клавишах
 */
export function changeSelectedItemVisibility(e: KeyboardEvent, pressedKeys: PressedKeysObj) {
    if (checkPressedKeys(pressedKeys, ['cmd', 'j'])) {
        // Запустить события изменения видимости выделенного компонента или элемента если это возможно
        fireEvent({
            event: 'changeSelectedItemVisibility',
        })
    }
}

/**
 * Клонирование выделенного компонента или элемента
 * @param {Object} e — объект события
 * @param {Object} pressedKeys — объект с данными о нажатых клавишах
 */
export function cloneSelectedItem(e: KeyboardEvent, pressedKeys: PressedKeysObj) {

    // Разрешено ли клонирование
    let allowEvent = false
    // Должны ли быть клонированы атрибуты
    let allowCloneAttrs = false
    // Должны ли быть клонированы дети
    let allowCloneChildren = false

    // Клонирование без детей и атрибутов
    if (checkPressedKeys(pressedKeys, ['cmd', 'd'])) {
        // Предотвратить занесение сайта в Избранное при нажатии на cmd + d.
        // Это нельзя вынести наверх потому что это отключит изменение текста во всех текстовых компонентах
        e.preventDefault()

        allowEvent = true
    }
    // Клонирование с детьми, без атрибутов
    else if (checkPressedKeys(pressedKeys, ['shift', 'cmd', 'd'])) {
        // Предотвратить изменение положения Инструментов разработчика в Хроме при нажатии на shift + cmd + d.
        // Это нельзя вынести наверх потому что это отключит изменение текста во всех текстовых компонентах
        e.preventDefault()
        allowEvent = true
        allowCloneChildren = true
    }
    // Клонирование с детьми и с атрибутами
    else if (checkPressedKeys(pressedKeys, ['shift', 'alt', 'cmd', 'd'])) {
        allowEvent = true
        allowCloneChildren = true
        allowCloneAttrs = true
    }
    // Клонирование без детей, с атрибутами
    else if (checkPressedKeys(pressedKeys, ['alt', 'cmd', 'd'])) {
        allowEvent = true
        allowCloneAttrs = true
    }

    if (allowEvent) {
        // Запустить события удаления выделенного элемента если это возможно
        fireEvent({
            event: 'cloneSelectedItem',
            cloneAttrs: allowCloneAttrs,
            cloneChildren: allowCloneChildren,
        })
    }
}


/**
 * Изменения порядка выделенного компонента или элемента
 * @param {Object} e — объект события
 * @param {Object} pressedKeys — объект с данными о нажатых клавишах
 */
export function upDownSelectedItem(e: KeyboardEvent, pressedKeys: PressedKeysObj) {
    // Разрешено ли перемещение
    let allowMoving = false
    // Направление перемещения
    let direction: 'up' | 'down' = 'up'

    const { history, historyCurrentIdx } = getState().article
    const historyItem = history[historyCurrentIdx]
    if (!historyItem) return

    const { selectedElem } = historyItem

    if (['element', 'rootElement'].includes(selectedElem.tagType)) {
        if (checkPressedKeys(pressedKeys, ['cmd', 'arrowUp'])) {
            allowMoving = true
            direction = 'up'
        }
        else if (checkPressedKeys(pressedKeys, ['cmd', 'arrowDown'])) {
            allowMoving = true
            direction = 'down'
        }
    }

    // Удалить текстовый компонент можно только если нажать 4 клавиши
    else if (selectedElem.tagType === 'textComponent') {
        if (checkPressedKeys(pressedKeys, ['shift', 'alt', 'cmd', 'arrowUp'])) {
            allowMoving = true
            direction = 'up'
        }
        else if (checkPressedKeys(pressedKeys, ['shift', 'alt', 'cmd', 'arrowDown'])) {
            allowMoving = true
            direction = 'down'
        }
    }

    if (allowMoving) {
        // Запустить события удаления выделенного элемента если это возможно
        fireEvent({
            event: 'upDownSelectedItem',
            direction
        })
    }
}


/**
 * Перемещение компонента выделенного для перемещения внутрь выделенного элемента
 * или левее/правее компонента содержащей выделенный элемент
 * @param {Object} e — объект события
 * @param {Object} pressedKeys — объект с данными о нажатых клавишах
 */
export function moveSelectedItem(e: KeyboardEvent, pressedKeys: PressedKeysObj) {
    // Разрешено ли перемещение
    let allowMoving = false
    // Направление перемещения
    let direction: 'inside' | 'left' | 'right' = 'inside'

    // Перемещение внутрь выделенного элемента
    if (checkPressedKeys(pressedKeys, ['shift', 'm'])) {
        allowMoving = true
        direction = 'inside'
    }
    // Перемещение левее компонента содержащего выделенный элемент
    else if (checkPressedKeys(pressedKeys, ['shift', 'alt', 'm'])) {
        allowMoving = true
        direction = 'left'
    }
    // Перемещение правее компонента содержащего выделенный элемент
    else if (checkPressedKeys(pressedKeys, ['shift', 'cmd', 'm'])) {
        allowMoving = true
        direction = 'right'
    }

    if (allowMoving) {
        // Запустить события перемещения компонента выделенного для перемещения если это возможно
        fireEvent({
            event: 'moveSelectedItem',
            direction
        })
    }
}