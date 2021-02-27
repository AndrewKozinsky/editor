// Types
import {
    EditorLanguageType,
    EditorThemeType,
    EditorSizeType,

    SetEditorLanguageActionType,
    SetEditorThemeActionType,
    SetEditorSizeActionType,

    SETTINGS_SET_EDITOR_LANGUAGE,
    SETTINGS_SET_EDITOR_THEME,
    SETTINGS_SET_EDITOR_SIZE,
} from './settingsTypes'

// Установка языка интерфейса
export function setEditorLanguage(payload: EditorLanguageType): SetEditorLanguageActionType {
    return {
        type: SETTINGS_SET_EDITOR_LANGUAGE,
        payload,
    }
}

// Установка темы интерфейса
export function setEditorTheme(payload: EditorThemeType): SetEditorThemeActionType {
    return {
        type: SETTINGS_SET_EDITOR_THEME,
        payload,
    }
}

// Установка размера интерфейса
export function setEditorSize(payload: EditorSizeType): SetEditorSizeActionType {
    return {
        type: SETTINGS_SET_EDITOR_SIZE,
        payload,
    }
}