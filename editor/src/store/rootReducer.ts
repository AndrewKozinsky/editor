// Core
// @ts-ignore
import { combineReducers } from 'redux'

// Reducers
import userReducer from './user/userReducer'
import settingsReducer from './settings/settingsReducer'
import modalReducer from './modal/modalReducer'

// Корневой редьюсер
export const rootReducer = combineReducers({
    user:  userReducer,
    settings:  settingsReducer,
    modal:  modalReducer
})

export type AppState = ReturnType<typeof rootReducer>