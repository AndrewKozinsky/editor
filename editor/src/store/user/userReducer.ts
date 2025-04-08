import StoreUserTypes from './userTypes'
import {store} from '../rootReducer'

export type UserReducerType = {
    authTokenStatus: StoreUserTypes.AuthTokenStatusType
    email: StoreUserTypes.EmailType
}

// Изначальные значения
const initialState: UserReducerType = {
    // Статус токена авторизации:
    // unknown — неизвестно есть ли токен и правилен ли он
    // fail — токена нет или он неправильный
    // success — токен есть и он правильный
    authTokenStatus: 'unknown',
    // Почта пользователя
    email: ''
}

// Установка статуса токена авторизации
function setUserData(state: UserReducerType, action: StoreUserTypes.SetUserDataActionType): UserReducerType {
    return {
        ...state,
        authTokenStatus: action.payload.tokenStatus,
        email: action.payload.email
    }
}


// Редьюсер Store.user
export default function userReducer( state = initialState, action: StoreUserTypes.UserActionTypes ): UserReducerType {
    switch (action.type) {
        case StoreUserTypes.SET_USER_DATA:
            return setUserData(state, action)
        default:
            const _: never = action.type
            // throw new Error('Errow in the userReducer')
            return state
    }
}
