// Types
import StoreSettingsTypes from './settingsTypes';
const settingsActions = {
    // Установка языка интерфейса
    setEditorLanguage(payload) {
        return {
            type: StoreSettingsTypes.SETTINGS_SET_EDITOR_LANGUAGE,
            payload
        };
    },
    // Установка темы интерфейса
    setEditorTheme(payload) {
        return {
            type: StoreSettingsTypes.SETTINGS_SET_EDITOR_THEME,
            payload
        };
    },
    // Установка должна быть показана формы входа, редактор или переход между ними
    setEntryAndEditorViewState(payload) {
        return {
            type: StoreSettingsTypes.SETTINGS_SET_ENTRY_AND_EDITOR_VIEW_STATE,
            payload
        };
    },
    // Установка адреса последней страницы
    setLastAddress(payload) {
        return {
            type: StoreSettingsTypes.SETTINGS_SET_LAST_ADDRESS,
            payload
        };
    },
    // Установка номера главной вкладки
    setMainTab(payload) {
        return {
            type: StoreSettingsTypes.SETTINGS_SET_MAIN_TAB,
            payload
        };
    },
    // Активная вкладка панели «Настройки»: user или editor
    setSettingsPanelTab(payload) {
        return {
            type: StoreSettingsTypes.SETTINGS_SET_SETTINGS_PANEL_TAB,
            payload
        };
    },
};
export default settingsActions;
//# sourceMappingURL=settingsActions.js.map
//# sourceMappingURL=settingsActions.js.map