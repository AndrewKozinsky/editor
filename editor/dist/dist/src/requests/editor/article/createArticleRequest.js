var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const JSON5 = require('json5');
import { makeFetch } from 'requests/reqFn/fetch';
import getApiUrl from 'requests/reqFn/apiUrls';
import articleManager from 'articleManager/articleManager';
/**
 * Функция создаёт новую статью
 * @param {Number} siteId — id сайта, к которому принадлежит статья
 * @param {String} name — имя шаблона компонента
 */
export default function createArticleRequest(siteId, name) {
    return __awaiter(this, void 0, void 0, function* () {
        // При создании новой статьи будет вставляться пустое содержимое
        const newArticleContent = articleManager.createArticle();
        const options = {
            method: 'POST',
            body: JSON.stringify({
                siteId,
                name,
                content: JSON5.stringify(newArticleContent)
            })
        };
        const response = yield makeFetch(getApiUrl('articles'), options);
        return response;
    });
}
//# sourceMappingURL=createArticleRequest.js.map
//# sourceMappingURL=createArticleRequest.js.map