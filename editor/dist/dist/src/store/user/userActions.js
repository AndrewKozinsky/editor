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
import getUserToken from 'requests/user/getUserToken';
import StoreUserTypes from './userTypes';
const userActions = {
    // Запрос данных пользователя и установка в Хранилище
    requestUserData() {
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function* () {
                // Запрос на получение статуса токена
                const response = yield getUserToken();
                if (!response || response.status !== 'success') {
                    dispatch(userActions.setUserData('fail', null));
                    return;
                }
                const { token, email } = response.data.user;
                const tokenStatus = token ? 'success' : 'fail';
                // Установка сайтов в Хранилище
                dispatch(userActions.setUserData(tokenStatus, email));
            });
        };
    },
    // Установка данных пользователя в Хранилище
    setUserData(tokenStatus, email) {
        return {
            type: StoreUserTypes.SET_USER_DATA,
            payload: {
                tokenStatus,
                email
            }
        };
    },
};
export default userActions;
//# sourceMappingURL=userActions.js.map
//# sourceMappingURL=userActions.js.map