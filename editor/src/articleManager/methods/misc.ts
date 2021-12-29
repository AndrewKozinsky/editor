// import FilesTreeType from 'types/filesTree'
import { updateArticleRequest } from 'requests/editor/article/updateArticleRequest'
import StoreArticleTypes from 'store/article/articleTypes'
// import actions from 'store/rootAction'
// import { store } from 'store/rootReducer'
import articleManager from 'articleManager/articleManager'
import actions from '../../store/rootAction'
import { store } from '../../store/rootReducer'
// import {getFromLocalStorage, setInLocalStorage} from 'utils/MiscUtils'
import deleteArticleRequest from 'requests/editor/article/deleteArticleRequest'
import config from '../../utils/config'
import { removeFromLocalStorage } from '../../utils/MiscUtils'


/*type MarksObj = {
    // Article site id
    siteId?: string // '60ca102ef8cfcc002074b3da'
    // Article uuid
    articleId?: string // '1dc98c6c-c2fd-45bd-ad9d-25129045c818'
    // id of included files template id
    incFilesId?: string // '60cc62ab5405e00071442016'
    // open component template folder uuids
    openCompFoldersIds?: FilesTreeType.IdArr // ['1', '3']
}*/

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

    // Delete article in a server
    // Возможно это не требуется
    // await deleteArticleRequest(articleId)
}
