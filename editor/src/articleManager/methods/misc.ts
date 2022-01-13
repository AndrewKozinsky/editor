import { updateArticleRequest } from 'requests/editor/article/updateArticleRequest'
import StoreArticleTypes from 'store/article/articleTypes'
import articleManager from 'articleManager/articleManager'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import config from 'utils/config'
import { removeFromLocalStorage } from 'utils/miscUtils'


/**
 * The function saves code of an article to a server
 * @param {Array} historyArr — articles history array
 * @param {Number} historyCurrentIdx — current history item index
 * @param {String} articleId — article uuid which I have to save in a server
 */
export async function saveArticle(
    this: typeof articleManager,
    historyArr: StoreArticleTypes.HistoryItems,
    historyCurrentIdx: number,
    articleId: null | number
) {
    if (!articleId) return

    // Set current history step to historyStepWhenWasSave to know what step the article was saved
    store.dispatch( actions.article.setHistoryStepWhenArticleWasSaved() )

    // Get current history item object
    const historyItem = this.getCurrentHistoryItem(historyArr, historyCurrentIdx)

    // Save article code in a server
    await updateArticleRequest(articleId, undefined, undefined, historyItem.article)
}


/** Функция очищающая редактируемую статью */
export function clearArticle(this: typeof articleManager) {
    store.dispatch(actions.article.clearArticle())
}

/**
 * Функция удаляющая редактируемую статью
 * @param {String} articleId — article id which I have to save in a server
 */
export async function deleteArticle( this: typeof articleManager, articleId: null | number ) {
    if (!articleId) return

    // Удалить данные про id открытой статьи из LocalStorage
    removeFromLocalStorage(config.ls.editArticleId)

    // Очистить редактор от этой статьи
    this.clearArticle()
}
