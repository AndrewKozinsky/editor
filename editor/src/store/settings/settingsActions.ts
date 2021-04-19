// Types
import StoreSettingsTypes from './settingsTypes'

// Установка языка интерфейса
export function setEditorLanguage(payload: StoreSettingsTypes.EditorLanguage): StoreSettingsTypes.SetEditorLanguageAction {
    return {
        type: StoreSettingsTypes.SETTINGS_SET_EDITOR_LANGUAGE,
        payload,
    }
}

// Установка темы интерфейса
export function setEditorTheme(payload: StoreSettingsTypes.EditorTheme): StoreSettingsTypes.SetEditorThemeAction {
    return {
        type: StoreSettingsTypes.SETTINGS_SET_EDITOR_THEME,
        payload,
    }
}

// Установка размера элементов интерфейса
export function setEditorSize(payload: StoreSettingsTypes.EditorSize): StoreSettingsTypes.SetEditorSizeAction {
    return {
        type: StoreSettingsTypes.SETTINGS_SET_EDITOR_SIZE,
        payload,
    }
}
