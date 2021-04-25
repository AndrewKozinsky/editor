
namespace StoreSettingsTypes {

    // Типы значений
    // Язык интерфейса
    export type EditorLanguage = 'eng' | 'rus'
    // Тема интерфейса
    export type EditorTheme = 'light' | 'dark'
    // Размер интерфейса
    export type EditorSize = 'tiny' | 'small' | 'middle' | 'big'
    // Размер элемента относительно размера элементов интрерфейса
    export type EditorSizeMultiply = -3 | -2 | -1 | 1 | 2 | 3
    // Что должно быть быть показано: формы входа (entry), плавный переход к формам входа (toEntry),
    // плавный пехоход к редактору (toEditor), редактор(editor)
    // null сообщает, что еще не известно что должно быть показано и определится позже на основе открытой странице
    export type EntryAndEditorViewState = null | 'entry' | 'toEntry' | 'toEditor' | 'editor'
    // Номер открытой вкладки
    export type MainTab = number // 0 | 1 | 2

    // Типы типа и тип экшена
    // Установка языка интерфейса
    export const SETTINGS_SET_EDITOR_LANGUAGE = 'SETTINGS_SET_EDITOR_LANGUAGE'
    export type SetEditorLanguageAction = {
        type: typeof SETTINGS_SET_EDITOR_LANGUAGE
        payload: EditorLanguage
    }

    // Установка темы интерфейса
    export const SETTINGS_SET_EDITOR_THEME = 'SETTINGS_SET_EDITOR_THEME'
    export type SetEditorThemeAction = {
        type: typeof SETTINGS_SET_EDITOR_THEME
        payload: EditorTheme
    }

    // Установка размера интерфейса
    export const SETTINGS_SET_EDITOR_SIZE = 'SETTINGS_SET_EDITOR_SIZE'
    export type SetEditorSizeAction = {
        type: typeof SETTINGS_SET_EDITOR_SIZE
        payload: EditorSize
    }

    // Установка должны быть показаны формы входа, редактор или переход между ними
    export const SETTINGS_SET_ENTRY_AND_EDITOR_VIEW_STATE = 'SETTINGS_SET_ENTRY_AND_EDITOR_VIEW_STATE'
    export type SetEntryAndEditorViewStateAction = {
        type: typeof SETTINGS_SET_ENTRY_AND_EDITOR_VIEW_STATE
        payload: EntryAndEditorViewState
    }

    // Установка последней страницы
    export const SETTINGS_SET_LAST_ADDRESS = 'SETTINGS_SET_LAST_ADDRESS'
    export type SetLastAddressAction = {
        type: typeof SETTINGS_SET_LAST_ADDRESS
        payload: string
    }

    // Установка номера последней вкладки
    export const SETTINGS_SET_MAIN_TAB = 'SETTINGS_SET_MAIN_TAB'
    export type SetMainTabAction = {
        type: typeof SETTINGS_SET_MAIN_TAB
        payload: MainTab
    }

    export type SettingsAction =
        | SetEditorLanguageAction
        | SetEditorThemeAction
        | SetEditorSizeAction
        | SetEntryAndEditorViewStateAction
        | SetLastAddressAction
        | SetMainTabAction
}

export default StoreSettingsTypes
