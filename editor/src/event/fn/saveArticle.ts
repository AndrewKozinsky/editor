import articleManager from '../../articleManager/articleManager'
import EventDataTypes from '../EventDataTypes'
import {getState} from '../../utils/miscUtils'

/**
 * Закрытие статьи
 * @param {Object} stepConfig — конфигурация события
 */
export async function saveArticle(stepConfig: EventDataTypes.saveArticle) {
    const { articleId, historyCurrentIdx, history } = getState().article

    await articleManager.saveArticle(history, historyCurrentIdx, articleId)
}