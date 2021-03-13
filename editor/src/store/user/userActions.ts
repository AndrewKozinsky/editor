// Types
import {
    AuthTokenStatusType,
    SetAuthTokenStatusActionType,
    USER_SET_AUTH_TOKEN_STATUS
} from './userTypes'

export function setAuthTokenStatus(payload: AuthTokenStatusType): SetAuthTokenStatusActionType {
    return {
        type: USER_SET_AUTH_TOKEN_STATUS,
        payload,
    }
}
