import articleActions from 'store/article/articleActions'
import { store } from 'store/rootReducer'
import articleManager from '../../articleManager/articleManager'
import { getFlashedElemCoords } from '../../articleManager/methods/gettingResources'
import { setArticleRenderIfTextCompSelected } from '../../editor/RightPart-2/ArticleFrame/textCompsTracking/useUpdateArticleDataForText'
import { getState } from '../../utils/miscUtils'
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
        // Разрешить отрисовку статьи если выделен текстовый компонент
        // При выделении текстового компонента отрисовка запрещается
        setArticleRenderIfTextCompSelected(true)

        store.dispatch(
            articleActions.makeHistoryStep(stepConfig.direction)
        )

        // Снова запретить отрисовку статьи если выбран текстовый компонент
        setArticleRenderIfTextCompSelected(false)
    }
}