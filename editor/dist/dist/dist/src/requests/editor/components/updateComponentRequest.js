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
import { makeFetch } from 'requests/reqFn/fetch';
import getApiUrl from 'requests/reqFn/apiUrls';
/**
 * Функция сохраняет шаблон компонента
 * @param {String} compItemId — uuid сохраняемого компонента
 * @param {Number} content — код компонента
 */
export function updateComponentRequest(compItemId, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: 'PATCH',
            body: JSON.stringify({ content })
        };
        const response = yield makeFetch(getApiUrl('component', compItemId), options);
        return response;
    });
}
//# sourceMappingURL=updateComponentRequest.js.map
//# sourceMappingURL=updateComponentRequest.js.map
//# sourceMappingURL=updateComponentRequest.js.map