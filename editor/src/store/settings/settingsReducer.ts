import StoreSettingsTypes from "./settingsTypes"

export type SettingsReducerType = {
    editorLanguage: StoreSettingsTypes.EditorLanguage
    editorTheme: StoreSettingsTypes.EditorTheme
    editorSize: StoreSettingsTypes.EditorSize
}

// Изначальные значения
const initialState: SettingsReducerType = {
    // Язык интерфейса: eng или rus
    editorLanguage: 'eng',
    // Тема интерфейса: light или dark
    editorTheme: 'light',
    // Размер интерфейса: small, middle или big
    editorSize: 'big'
}

// Установка языка интерфейса
function setEditorLanguage(state: SettingsReducerType, action: StoreSettingsTypes.SetEditorLanguageAction): SettingsReducerType {
    // Поставить язык в LocalStorage
    localStorage.setItem('editorLanguage', action.payload)

    return {
        ...state,
        editorLanguage: action.payload
    }
}

// Установка темы интерфейса
function setEditorTheme(state: SettingsReducerType, action: StoreSettingsTypes.SetEditorThemeAction): SettingsReducerType {
    // Поставить тему в LocalStorage
    localStorage.setItem('editorTheme', action.payload)

    return {
        ...state,
        editorTheme: action.payload
    }
}

// Установка размера элементов интерфейса
function setEditorSize(state: SettingsReducerType, action: StoreSettingsTypes.SetEditorSizeAction): SettingsReducerType {
    // Поставить размер элементов интерфейса в LocalStorage
    localStorage.setItem('editorSize', action.payload)

    return {
        ...state,
        editorSize: action.payload
    }
}

// Редьюсер Store.settings
export default function settingsReducer(state = initialState, action: StoreSettingsTypes.SettingsAction): SettingsReducerType {

    switch (action.type) {
        case StoreSettingsTypes.SETTINGS_SET_EDITOR_LANGUAGE:
            return setEditorLanguage(state, action)
        case StoreSettingsTypes.SETTINGS_SET_EDITOR_THEME:
            return setEditorTheme(state, action)
        case StoreSettingsTypes.SETTINGS_SET_EDITOR_SIZE:
            return setEditorSize(state, action)
        default:
            // @ts-ignore
            const x: never = null
            return state
    }
}
