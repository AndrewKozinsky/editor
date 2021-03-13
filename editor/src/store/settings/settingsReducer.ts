import {
    // Типы значений
    EditorLanguageType,
    EditorThemeType,
    EditorSizeType,

    // Типы типов
    SETTINGS_SET_EDITOR_LANGUAGE,
    SETTINGS_SET_EDITOR_THEME,
    SETTINGS_SET_EDITOR_SIZE,

    // Типы экшенов
    SettingsActionTypes,
    SetEditorLanguageActionType,
    SetEditorThemeActionType,
    SetEditorSizeActionType
} from "./settingsTypes"

export type SettingsReducerType = {
    editorLanguage: EditorLanguageType
    editorTheme: EditorThemeType
    editorSize: EditorSizeType
}

// Изначальные значения
const initialState: SettingsReducerType = {
    // Язык интерфейса: eng или rus
    editorLanguage: 'eng',
    // Тема интерфейса: light или dark
    editorTheme: 'light',
    // Размер интерфейса: standard или big
    editorSize: 'standard'
}

// Установка языка интерфейса
function setEditorLanguage(state: SettingsReducerType, action: SetEditorLanguageActionType): SettingsReducerType {
    // Поставить язык в LocalStorage
    localStorage.setItem('editorLanguage', action.payload)

    return {
        ...state,
        editorLanguage: action.payload
    }
}

// Установка темы интерфейса
function setEditorTheme(state: SettingsReducerType, action: SetEditorThemeActionType): SettingsReducerType {
    // Поставить тему в LocalStorage
    localStorage.setItem('editorTheme', action.payload)

    return {
        ...state,
        editorTheme: action.payload
    }
}

// Установка размера элементов интерфейса
function setEditorSize(state: SettingsReducerType, action: SetEditorSizeActionType): SettingsReducerType {
    // Поставить размер элементов интерфейса в LocalStorage
    localStorage.setItem('editorSize', action.payload)

    return {
        ...state,
        editorSize: action.payload
    }
}

// Редьюсер Store.settings
export default function settingsReducer(state = initialState, action: SettingsActionTypes ): SettingsReducerType {

    switch (action.type) {
        case SETTINGS_SET_EDITOR_LANGUAGE:
            return setEditorLanguage(state, action)
        case SETTINGS_SET_EDITOR_THEME:
            return setEditorTheme(state, action)
        case SETTINGS_SET_EDITOR_SIZE:
            return setEditorSize(state, action)
        default:
            // @ts-ignore
            const x: never = null
            return state
    }
}
