import { useEffect } from 'react'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import {
    undoRedoArticleHistory
} from 'editor/RightPart-2/ArticleFrame/keydownHandler/hotKeys'
import {
    checkPressedKeys,
    getPressedKeys,
    PressedKeysObj
} from 'utils/getPressedKeys'
import { getState } from 'utils/miscUtils'


/* Хук ставит обработчик горячих клавиш на всё приложение */
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

    if (getState().settings.mainTab === 1) {
        // Making undo or redo history step in article
        undoRedoArticleHistory(e, pressedKeys)
    }
}


// Close modal window if you press Esc
function closeModal(pressedKeys: PressedKeysObj) {
    if ( checkPressedKeys(pressedKeys, ['esc']) && getState().modal.isOpen) {
        store.dispatch( actions.modal.closeModal() )
    }
}