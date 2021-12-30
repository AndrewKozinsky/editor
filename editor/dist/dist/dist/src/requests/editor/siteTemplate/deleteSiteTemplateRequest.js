var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            }
        }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getApiUrl from 'requests/reqFn/apiUrls';
import { makeFetch } from 'requests/reqFn/fetch';
/**
 * Функция удаляет шаблон сайта
 * @param {Object} templateId — id удаляемого шаблона
 */
export default function deleteSiteTemplateRequest(templateId) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: 'DELETE'
        };
        const response = yield makeFetch(getApiUrl('siteTemplate', templateId), options);
        return response;
    });
}
//# sourceMappingURL=deleteSiteTemplateRequest.js.map
//# sourceMappingURL=deleteSiteTemplateRequest.js.map
//# sourceMappingURL=deleteSiteTemplateRequest.js.map