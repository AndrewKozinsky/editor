// Core
import { combineReducers } from 'redux';

// Reducers
import { userReducer } from './user/userReducer';

// Корневой редьюсер
export const rootReducer = combineReducers({
    user:  userReducer
})

export type AppState = ReturnType<typeof rootReducer>