

// Типы значений
export type AuthTokenStatusType = number

// Типы типа и тип экшена
// Установка статуса токена авторизации
export const USER_SET_AUTH_TOKEN_STATUS = 'USER_SET_AUTH_TOKEN_STATUS'
export type SetAuthTokenStatusActionType = {
    type: typeof USER_SET_AUTH_TOKEN_STATUS;
    payload: AuthTokenStatusType;
}

export type UserActionTypes = SetAuthTokenStatusActionType