import { store } from 'store/rootReducer'
import articleManager from 'articleManager/articleManager'
import {
    checkPressedKeys,
    PressedKeysObj
} from 'utils/getPressedKeys'
import articleActions from 'store/article/articleActions'
import { getState } from 'utils/miscUtils'
import fireEvent from '../../../../events/fireEvent'


/**
 * If you pressed Cmd + Z or Shift + Cmd + Z, then make undo or redo history step in article
 * @param e
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
