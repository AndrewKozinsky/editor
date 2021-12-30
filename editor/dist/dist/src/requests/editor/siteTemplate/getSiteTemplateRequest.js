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
import { makeFetch } from 'requests/reqFn/fetch';
import getApiUrl from 'requests/reqFn/apiUrls';
/**
 * Функция отправляет запрос на получение шаблонов подключаемых файлов определённого сайта
 * @param {String} templateId — included files template id
 */
export default function getSiteTemplateRequest(templateId) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = { method: 'GET' };
        return yield makeFetch(getApiUrl('siteTemplate', templateId), options);
    });
}
//# sourceMappingURL=getSiteTemplateRequest.js.map
//# sourceMappingURL=getSiteTemplateRequest.js.map