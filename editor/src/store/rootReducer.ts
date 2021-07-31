// Core
//@ts-ignore
import { combineReducers } from 'redux'

// Reducers
import userReducer from './user/userReducer'
import settingsReducer from './settings/settingsReducer'
// import sitesReducer from './site/sitesReducer'
import modalReducer from './modal/modalReducer'
// import articleReducer from './article/articleReducer'

// Корневой редьюсер
export const rootReducer = combineReducers({
    user:  userReducer,
    // sites:  sitesReducer,
    settings:  settingsReducer,
    // article: articleReducer,
    modal:  modalReducer
})

export type AppState = ReturnType<typeof rootReducer>