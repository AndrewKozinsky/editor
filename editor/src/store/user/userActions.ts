// Types
import StoreUserTypes from './userTypes'

const userActions = {
    // Установка статуса токена авторизации пользователя
    setAuthTokenStatus(payload: StoreUserTypes.AuthTokenStatusType): StoreUserTypes.SetAuthTokenStatusActionType {
        return {
            type: StoreUserTypes.USER_SET_AUTH_TOKEN_STATUS,
            payload,
        }
    }
}

export default userActions