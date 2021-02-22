
/*export type Starship = {
    name: string;
}*/

// export type ErrorHttpAction = string;

// export const STARSHIPS_START_FETCHING = 'STARSHIPS_START_FETCHING';
/*type StarshipsStartFetchingAction = {
    type: typeof STARSHIPS_START_FETCHING;
}*/

/*export const STARSHIPS_FILL = 'STARSHIPS_FILL';
export type StarshipsFillAction = {
    type: typeof STARSHIPS_FILL;
    payload: Starships;
}*/

/*export const STARSHIPS_SET_FETCHING_ERROR = 'STARSHIPS_SET_FETCHING_ERROR';
export type StarshipsSetFetchingErrorAction = {
    type: typeof STARSHIPS_SET_FETCHING_ERROR;
    error: true;
    payload: ErrorHttpAction;
}*/

/*
export type StarshipsActionTypes =
    | StarshipsStartFetchingAction
    | StarshipsStopFetchingAction
    | StarshipsFillAction
    | StarshipsFetchAsyncAction;*/


// Типы значений
export type AuthTokenStatus = number

// Типы типа и тип экшена
// Установка статуса токена авторизации
export const USER_SET_AUTH_TOKEN_STATUS = 'USER_SET_AUTH_TOKEN_STATUS'
export type SetAuthTokenStatusActionType = {
    type: typeof USER_SET_AUTH_TOKEN_STATUS;
    payload: AuthTokenStatus;
}

export type UserActionTypes = SetAuthTokenStatusActionType