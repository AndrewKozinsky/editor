var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import FilesTreeType from 'types/filesTree'
import { updateArticleRequest } from 'requests/editor/article/updateArticleRequest';
import actions from '../../store/rootAction';
import { store } from '../../store/rootReducer';
import config from '../../utils/config';
import { removeFromLocalStorage } from '../../utils/MiscUtils';
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
export function saveArticle(historyArr, historyCurrentIdx, articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!articleId)
            return;
        // Set current history step to historyStepWhenWasSave to know what step the article was saved
        store.dispatch(actions.article.setHistoryStepWhenArticleWasSaved());
        // Get current history item object
        const historyItem = this.getCurrentHistoryItem(historyArr, historyCurrentIdx);
        // Save article code in a server
        yield updateArticleRequest(articleId, undefined, undefined, historyItem.article);
    });
}
/** Функция очищающая редактируемую статью */
export function clearArticle() {
    store.dispatch(actions.article.clearArticle());
}
/**
 * Функция удаляющая редактируемую статью
 * @param {String} articleId — article id which I have to save in a server
 */
export function deleteArticle(articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!articleId)
            return;
        // Удалить данные про id открытой статьи из LocalStorage
        removeFromLocalStorage(config.ls.editArticleId);
        // Очистить редактор от этой статьи
        this.clearArticle();
        // Delete article in a server
        // Возможно это не требуется
        // await deleteArticleRequest(articleId)
    });
}
//# sourceMappingURL=misc.js.map