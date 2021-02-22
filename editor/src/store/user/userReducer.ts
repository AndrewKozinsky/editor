import {
    // Типы значений
    AuthTokenStatus,
    // Типы типов
    USER_SET_AUTH_TOKEN_STATUS,
    // Типы экшенов
    SetAuthTokenStatusActionType,
    UserActionTypes
} from "./userTypes"

export type UserReducerType = {
    authTokenStatus: AuthTokenStatus
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
function setAuthTokenStatus(state: UserReducerType, action: SetAuthTokenStatusActionType): UserReducerType {
    return {
        ...state,
        authTokenStatus: action.payload
    }
}

// Редьюсер Store.user
export function userReducer( state = initialState, action: UserActionTypes ): UserReducerType {
    switch (action.type) {
        case USER_SET_AUTH_TOKEN_STATUS:
            return setAuthTokenStatus(state, action)
        default:
            // @ts-ignore
            const x: never = null
            return state
    }
}