// import FilesTreeType from 'types/filesTree'
import { updateArticleRequest } from 'requests/editor/article/updateArticleRequest'
import StoreArticleTypes from 'store/article/articleTypes'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import articleManager from '../articleManager'
// import {getFromLocalStorage, setInLocalStorage} from 'utils/MiscUtils'
import deleteArticleRequest from 'requests/editor/article/deleteArticleRequest'


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

/**
 * The function saves code of an article to a server
 * @param {String} articleId — article uuid which I have to save in a server
 */
export async function deleteArticle( this: typeof articleManager, articleId: null | number ) {
    if (!articleId) return

    // Delete article in a server
    await deleteArticleRequest(articleId)
}
