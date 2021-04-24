import StoreSettingsTypes from './settingsTypes'

export type SettingsReducerType = {
    editorLanguage: StoreSettingsTypes.EditorLanguage
    editorTheme: StoreSettingsTypes.EditorTheme
    editorSize: StoreSettingsTypes.EditorSize
    entryAndEditorViewState: StoreSettingsTypes.EntryAndEditorViewState
    lastAddress: string
}

// Изначальные значения
const initialState: SettingsReducerType = {
    // Язык интерфейса: eng или rus
    editorLanguage: 'eng',
    // Тема интерфейса: light или dark
    editorTheme: 'light',
    // Размер интерфейса: small, middle или big
    editorSize: 'big',
    // Компоненты форм входа и редактор всегда отрисовываются. Эта настройка задаёт какой компонент должен при отрисовке возвращать null.
    // Что должно быть быть показано: формы входа (entry), плавный переход к формам входа (toEntry),
    // плавный пехоход к редактору (toEditor), редактор(editor)
    entryAndEditorViewState: null,
    // Адрес последней страницы на которой был пользователь. Отсчёт ведётся от страницы редактора. Напр.: /enter
    lastAddress: ''
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

// Установка должна быть показана формы входа, редактор или переход между ними
function setEntryAndEditorViewState(state: SettingsReducerType, action: StoreSettingsTypes.SetEntryAndEditorViewStateAction): SettingsReducerType {
    return {
        ...state,
        entryAndEditorViewState: action.payload
    }
}

// Установка адрема последней страницы
function setLastAddress(state: SettingsReducerType, action: StoreSettingsTypes.SetLastAddressAction): SettingsReducerType {
    return {
        ...state,
        lastAddress: action.payload
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
        case StoreSettingsTypes.SETTINGS_SET_ENTRY_AND_EDITOR_VIEW_STATE:
            return setEntryAndEditorViewState(state, action)
        case StoreSettingsTypes.SETTINGS_SET_LAST_ADDRESS:
            return setLastAddress(state, action)
        default:
            // @ts-ignore
            const x: never = null
            return state
    }
}
