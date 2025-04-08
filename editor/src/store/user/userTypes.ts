
namespace StoreUserTypes {
    // Типы значений
    export type AuthTokenStatusType = 'unknown' | 'fail' | 'success'
    export type EmailType = null | string

    // Типы типа и тип экшена
    // Установка статуса токена авторизации
    export const SET_USER_DATA = 'SET_USER_DATA'
    export type SetUserDataActionType = {
        type: typeof SET_USER_DATA
        payload: {
            tokenStatus: StoreUserTypes.AuthTokenStatusType
            email: EmailType
        }
    }

    export type UserActionTypes =
        | SetUserDataActionType
}

export default StoreUserTypes