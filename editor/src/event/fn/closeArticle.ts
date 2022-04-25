import articleActions from 'store/article/articleActions'
import { store } from 'store/rootReducer'
import EventDataTypes from '../EventDataTypes'

/**
 * Закрытие статьи
 * @param {Object} stepConfig — конфигурация события
 */
export function closeArticle(stepConfig: EventDataTypes.closeArticle) {
    // Очистить статью
    store.dispatch( articleActions.clearArticle() )

    // Убрать id выбранной статьи в постоянных данных хранимых в LocalStorage
    store.dispatch( articleActions.setArticleIdOuter(null) )
}