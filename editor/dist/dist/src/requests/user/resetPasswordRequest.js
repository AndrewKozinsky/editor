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
 * Функция отправляет данные для сброса пароля
 * @param {String} email — почта у которой нужно сбросить пароль
 */
export default function resetPasswordRequest(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: 'POST',
            body: JSON.stringify({ email: email })
        };
        const response = yield makeFetch(getApiUrl('resetPassword'), options);
        return response;
    });
}
//# sourceMappingURL=resetPasswordRequest.js.map
//# sourceMappingURL=resetPasswordRequest.js.map