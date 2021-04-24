// Core
// @ts-ignore
import { combineReducers } from 'redux'

// Reducers
import userReducer from './user/userReducer'
import settingsReducer from './settings/settingsReducer'

// Корневой редьюсер
export const rootReducer = combineReducers({
    user:  userReducer,
    settings:  settingsReducer
})

export type AppState = ReturnType<typeof rootReducer>