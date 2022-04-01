import articleActions from 'store/article/articleActions'
import { store } from 'store/rootReducer'
import articleManager from '../../articleManager/articleManager'
import { updateDataInTextComp } from 'editor/RightPart-2/ArticleFrame/textTracking/manageUpdatingDTextComp'
import { getState } from 'utils/miscUtils'
import EventDataTypes from '../EventDataTypes'

/**
 * Функция делает шаг вперёд или назад по истории если это возможно
 * @param {Object} stepConfig — конфигурация шага
 */
export function makeHistoryStep(stepConfig: EventDataTypes.makeHistoryStep) {
    const { history, historyCurrentIdx } = getState().article

    // Можно ли сделать шаг по истории в переданном направлении?
    const canMakeStep = articleManager.canMakeHistoryStep(stepConfig.direction, history, historyCurrentIdx)

    if (canMakeStep) {
        // Обновить данные в текстовом компоненте если это требуется
        updateDataInTextComp('history')

        // Подождать пока применится новый текст если его редактировали
        setTimeout(() => {
            store.dispatch(
                articleActions.makeHistoryStep(stepConfig.direction)
            )
        }, 10)
    }
}