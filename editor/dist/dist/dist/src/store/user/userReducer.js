import StoreUserTypes from './userTypes';
// Изначальные значения
const initialState = {
    // Статус токена авторизации:
    // unknown — неизвестно есть ли токен и правилен ли он
    // fail — токена нет или он неправильный
    // success — токен есть и он правильный
    authTokenStatus: 'unknown',
    // Почта пользователя
    email: ''
};
// Установка статуса токена авторизации
function setUserData(state, action) {
    return Object.assign(Object.assign({}, state), { authTokenStatus: action.payload.tokenStatus, email: action.payload.email });
}
// Редьюсер Store.user
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case StoreUserTypes.SET_USER_DATA:
            return setUserData(state, action);
        default:
            // @ts-ignore
            const x = null;
            return state;
    }
}
//# sourceMappingURL=userReducer.js.map
//# sourceMappingURL=userReducer.js.map
//# sourceMappingURL=userReducer.js.map