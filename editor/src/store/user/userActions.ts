// Types
import StoreUserTypes from './userTypes'

export function setAuthTokenStatus(payload: StoreUserTypes.AuthTokenStatusType): StoreUserTypes.SetAuthTokenStatusActionType {
    return {
        type: StoreUserTypes.USER_SET_AUTH_TOKEN_STATUS,
        payload,
    }
}
