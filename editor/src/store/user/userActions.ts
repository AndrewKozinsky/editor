// Types
import {
    AuthTokenStatusType,
    SetAuthTokenStatusActionType,
    USER_SET_AUTH_TOKEN_STATUS
    // ErrorHttpAction,
    // Starships,
    // STARSHIPS_FETCH_ASYNC,
    // STARSHIPS_START_FETCHING,
    // STARSHIPS_STOP_FETCHING,
    // StarshipsActionTypes,
    // StarshipsFillAction,
    // SetAuthTokenStatusActionType,
} from './userTypes'

/*export function startFetching(): StarshipsActionTypes {
    return {
        type: STARSHIPS_START_FETCHING,
    }
}*/

/*export function setfetchingError(payload: ErrorHttpAction): StarshipsSetFetchingErrorAction {
    return {
        type: STARSHIPS_SET_FETCHING_ERROR,
        error: true,
        payload,
    }
}*/


export function setAuthTokenStatus(payload: AuthTokenStatusType): SetAuthTokenStatusActionType {
    return {
        type: USER_SET_AUTH_TOKEN_STATUS,
        payload,
    }
}