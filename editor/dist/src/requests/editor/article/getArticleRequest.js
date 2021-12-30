var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const JSON5 = require('json5');
import { makeFetch } from 'requests/reqFn/fetch';
import getApiUrl from 'requests/reqFn/apiUrls';
/** Функция получает данные статьи */
export default function getArticleRequest(articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = { method: 'GET' };
        const rowResponse = yield makeFetch(getApiUrl('article', articleId), options);
        // При успешном ответе нужно превратить данные статьи из строк в массив данных.
        // За это отвечает код ниже.
        if (rowResponse.status === 'success') {
            try {
                // Составление массива объектов из массива строк
                const parsedArticles = rowResponse.data.articles.map(article => {
                    if (!article)
                        return null;
                    return Object.assign(Object.assign({}, article), { content: JSON5.parse(article.content) });
                });
                // Собрать новый объект ответа сервера с объектами полученными из строк
                let response = Object.assign(Object.assign({}, rowResponse), { data: {
                        articles: parsedArticles
                    } });
                return response;
            }
            catch (err) { }
        }
        else if (rowResponse.status === 'fail') {
            return rowResponse;
        }
    });
}
//# sourceMappingURL=getArticleRequest.js.map