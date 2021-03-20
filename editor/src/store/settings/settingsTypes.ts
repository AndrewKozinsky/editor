
// Типы значений
// Язык интерфейса
export type EditorLanguageType = 'eng' | 'rus'
// Тема интерфейса
export type EditorThemeType = 'light' | 'dark'
// Размер интерфейса
export type EditorSizeType = 'tiny' | 'small' | 'middle' | 'big'

// Типы типа и тип экшена
// Установка языка интерфейса
export const SETTINGS_SET_EDITOR_LANGUAGE = 'SETTINGS_SET_EDITOR_LANGUAGE'
export type SetEditorLanguageActionType = {
    type: typeof SETTINGS_SET_EDITOR_LANGUAGE
    payload: EditorLanguageType
}

// Установка темы интерфейса
export const SETTINGS_SET_EDITOR_THEME = 'SETTINGS_SET_EDITOR_THEME'
export type SetEditorThemeActionType = {
    type: typeof SETTINGS_SET_EDITOR_THEME
    payload: EditorThemeType
}

// Установка размера интерфейса
export const SETTINGS_SET_EDITOR_SIZE = 'SETTINGS_SET_EDITOR_SIZE'
export type SetEditorSizeActionType = {
    type: typeof SETTINGS_SET_EDITOR_SIZE
    payload: EditorSizeType
}


export type SettingsActionTypes =
    | SetEditorLanguageActionType
    | SetEditorThemeActionType
    | SetEditorSizeActionType
