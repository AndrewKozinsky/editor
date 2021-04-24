import StoreUserTypes from "./userTypes"

export type UserReducerType = {
    authTokenStatus: StoreUserTypes.AuthTokenStatusType
}

// Изначальные значения
const initialState: UserReducerType = {
    // Статус токена авторизации:
    // 0 — неизвестно есть ли токен и правилен ли он
    // 1 — токена нет
    // 2 — токен есть и он правильный
    authTokenStatus: 0
}

// Установка статуса токена авторизации
function setAuthTokenStatus(state: UserReducerType, action: StoreUserTypes.SetAuthTokenStatusActionType): UserReducerType {
    return {
        ...state,
        authTokenStatus: action.payload
    }
}

// Редьюсер Store.user
export default function userReducer( state = initialState, action: StoreUserTypes.UserActionTypes ): UserReducerType {
    switch (action.type) {
        case StoreUserTypes.USER_SET_AUTH_TOKEN_STATUS:
            return setAuthTokenStatus(state, action)
        default:
            // @ts-ignore
            const x: never = null
            return state
    }
}
