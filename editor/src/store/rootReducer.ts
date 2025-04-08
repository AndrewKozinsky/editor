//@ts-ignore
import { applyMiddleware, combineReducers, createStore } from 'redux'
// @ts-ignore
import { composeWithDevTools } from 'redux-devtools-extension'
// @ts-ignore
import ReduxThunk from 'redux-thunk'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
// Reducers
import userReducer from './user/userReducer'
import sitesReducer from './site/sitesReducer'
import settingsReducer from './settings/settingsReducer'
import articleReducer from './article/articleReducer'
import modalReducer from './modal/modalReducer'
import helpReducer from './help/helpReducer'
import localStorageProxyReducer from './localStorageProxy/localStorageProxyReducer'


// Корневой редьюсер
const rootReducer = combineReducers({
    user: userReducer, // Данные пользователя
    sites: sitesReducer,
    settings: settingsReducer, // Настройки приложения
    article: articleReducer,
    modal: modalReducer,
    help: helpReducer,
    localStorageProxy: localStorageProxyReducer,
})

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(ReduxThunk)
    )
)

export type AppStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector