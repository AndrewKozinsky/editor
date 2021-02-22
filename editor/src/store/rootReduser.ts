// Core
import {combineReducers} from 'redux';

// Reducers
import {settingsReducer} from './settings/settings';

export const rootReducer = combineReducers({
    settings:  settingsReducer
})

export type AppState = ReturnType<typeof rootReducer>