import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import articleManager from 'articleManager/articleManager'
import {
    checkPressedKeys,
    getPressedKeys,
    PressedKeysObj
} from 'utils/getPressedKeys'

/* Хук ставит обработчик горячих клавиш на всё приложение */
import { useEffect } from 'react'

export default function useSetShortcutsHandler() {
    useEffect(function () {
        document.addEventListener('keydown', shortcutsHandler)
    }, [])
}


/**
 * Обработчик нажатий клавиш
 * @param {Object} e — объект события
 */
function shortcutsHandler(e: KeyboardEvent) {
    // Object of pressed keys
    const pressedKeys = getPressedKeys(e)

    // Close modal window
    closeModal(pressedKeys)
}


// Close modal window if you press Esc
function closeModal(pressedKeys: PressedKeysObj) {
    if ( checkPressedKeys(pressedKeys, ['esc']) && store.getState().modal.isOpen) {
        store.dispatch( actions.modal.closeModal() )
    }
}