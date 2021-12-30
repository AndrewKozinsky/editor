var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { makeFetch } from 'requests/reqFn/fetch';
import getApiUrl from 'requests/reqFn/apiUrls';
/**
 * Функция сохраняет имя статьи и id шаблона подключаемых файлов этой статьи
 * @param {String} articleId — id сохраняемой статьи
 * @param {String} name — название статьи
 * @param {String} siteTemplateId — id шаблона подключаемых файлов
 * @param {String} content — код статьи
 */
export function updateArticleRequest(articleId, name, siteTemplateId, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = {};
        if (name !== undefined)
            body.name = name;
        if (siteTemplateId !== undefined)
            body.siteTemplateId = siteTemplateId;
        if (content !== undefined)
            body.content = JSON.stringify(content);
        const options = {
            method: 'PATCH',
            body: JSON.stringify(body)
        };
        // options.body = "{\"content\": \"HELLO\"}"
        const response = yield makeFetch(getApiUrl('article', articleId), options);
        return response;
    });
}
//# sourceMappingURL=updateArticleRequest.js.map