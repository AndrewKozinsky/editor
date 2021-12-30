import { setInLocalStorage } from 'utils/MiscUtils';
import StoreSettingsTypes from './settingsTypes';
import config from 'utils/config';
// Изначальные значения
const initialState = {
    // Язык интерфейса: eng или rus
    editorLanguage: 'eng',
    // Тема интерфейса: light или dark
    editorTheme: 'light',
    // Компоненты форм входа и редактор всегда отрисовываются.
    // Эта настройка задаёт какой компонент должен при отрисовке возвращать null.
    // Что должно быть быть показано: формы входа (entry), плавный переход к формам входа (toEntry),
    // плавный пехоход к редактору (toEditor), редактор(editor)
    entryAndEditorViewState: null,
    // Адрес последней страницы на которой был пользователь. Отсчёт ведётся от страницы редактора. Напр.: /enter
    // Это нужно для анимированного появления страницы редактора и страниц входа.
    lastAddress: '',
    // Номер открытой вкладки
    mainTab: 0,
    // Активная вкладка панели «Настройки»: user или editor
    settingsPanelTab: 'user'
};
// Установка языка интерфейса
function setEditorLanguage(state, action) {
    // Поставить язык в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
    setInLocalStorage(config.ls.editorLanguage, action.payload);
    return Object.assign(Object.assign({}, state), { editorLanguage: action.payload });
}
// Установка темы интерфейса
function setEditorTheme(state, action) {
    // Поставить тему в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
    setInLocalStorage(config.ls.editorTheme, action.payload);
    return Object.assign(Object.assign({}, state), { editorTheme: action.payload });
}
// Установка должна быть показана формы входа, редактор или переход между ними
function setEntryAndEditorViewState(state, action) {
    return Object.assign(Object.assign({}, state), { entryAndEditorViewState: action.payload });
}
// Установка адреса последней страницы
function setLastAddress(state, action) {
    return Object.assign(Object.assign({}, state), { lastAddress: action.payload });
}
// Установка номера главной вкладки
function setMainTab(state, action) {
    // Поставить язык в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
    setInLocalStorage(config.ls.editorTab, action.payload);
    return Object.assign(Object.assign({}, state), { mainTab: action.payload });
}
// Установка id вкладки в Настройках
function setSettingsPanelTab(state, action) {
    // Поставить id вкладки в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
    setInLocalStorage(config.ls.editorSettingsTabId, action.payload);
    return Object.assign(Object.assign({}, state), { settingsPanelTab: action.payload });
}
// Редьюсер Store.settings
export default function settingsReducer(state = initialState, action) {
    switch (action.type) {
        case StoreSettingsTypes.SETTINGS_SET_EDITOR_LANGUAGE:
            return setEditorLanguage(state, action);
        case StoreSettingsTypes.SETTINGS_SET_EDITOR_THEME:
            return setEditorTheme(state, action);
        case StoreSettingsTypes.SETTINGS_SET_ENTRY_AND_EDITOR_VIEW_STATE:
            return setEntryAndEditorViewState(state, action);
        case StoreSettingsTypes.SETTINGS_SET_LAST_ADDRESS:
            return setLastAddress(state, action);
        case StoreSettingsTypes.SETTINGS_SET_MAIN_TAB:
            return setMainTab(state, action);
        case StoreSettingsTypes.SETTINGS_SET_SETTINGS_PANEL_TAB:
            return setSettingsPanelTab(state, action);
        default:
            // @ts-ignore
            const x = null;
            return state;
    }
}
//# sourceMappingURL=settingsReducer.js.map
//# sourceMappingURL=settingsReducer.js.map