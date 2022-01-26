import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import articleManager from 'articleManager/articleManager'
import {
    checkPressedKeys,
    PressedKeysObj
} from 'utils/getPressedKeys'
import { getCurrentHistoryItem } from '../../../../articleManager/methods/gettingResources'
import StoreArticleTypes from '../../../../store/article/articleTypes'


/**
 * If you pressed Cmd + Z or Shift + Cmd + Z, then make undo or redo history step in article
 * @param {Object} pressedKeys — объект с данными о нажатых клавишах
 */
export function undoRedoArticleHistory(pressedKeys: PressedKeysObj) {
    const { history, historyCurrentIdx } = store.getState().article

    if (checkPressedKeys(pressedKeys, ['cmd', 'z'])) {
        const canMakeStep = articleManager.canMakeHistoryStep('undo', history, historyCurrentIdx)
        if (!canMakeStep) return

        store.dispatch( actions.article.makeHistoryStep('undo') )
    }
    else if (checkPressedKeys(pressedKeys, ['cmd', 'shift', 'z'])) {
        const canMakeStep = articleManager.canMakeHistoryStep('redo', history, historyCurrentIdx)
        if (!canMakeStep) return

        store.dispatch( actions.article.makeHistoryStep('redo') )
    }
}

