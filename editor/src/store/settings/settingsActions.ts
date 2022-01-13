// Types
import StoreSettingsTypes from './settingsTypes'

const settingsActions = {

    // Установка темы интерфейса
    setEditorTheme(payload: StoreSettingsTypes.EditorTheme): StoreSettingsTypes.SetEditorThemeAction {
        return {
            type: StoreSettingsTypes.SETTINGS_SET_EDITOR_THEME,
            payload
        }
    },

    // Установка должна быть показана формы входа, редактор или переход между ними
    setEntryAndEditorViewState(payload: StoreSettingsTypes.EntryAndEditorViewState): StoreSettingsTypes.SetEntryAndEditorViewStateAction {
        return {
            type: StoreSettingsTypes.SETTINGS_SET_ENTRY_AND_EDITOR_VIEW_STATE,
            payload
        }
    },

    // Установка адреса последней страницы
    setLastAddress(payload: string): StoreSettingsTypes.SetLastAddressAction {
        return {
            type: StoreSettingsTypes.SETTINGS_SET_LAST_ADDRESS,
            payload
        }
    },

    // Установка номера главной вкладки
    setMainTab(payload: StoreSettingsTypes.MainTab): StoreSettingsTypes.SetMainTabAction {
        let tabNumber = payload
        if (tabNumber === undefined || tabNumber < 0 || tabNumber > 3) tabNumber = 3

        return {
            type: StoreSettingsTypes.SETTINGS_SET_MAIN_TAB,
            payload: tabNumber
        }
    },

    // Активная вкладка панели «Настройки»: user или editor
    setSettingsPanelTab(payload: StoreSettingsTypes.SettingsPanelTab): StoreSettingsTypes.SetSettingsPanelTabAction {
        let panelTabId = payload
        if (!(['user', 'editor'].includes(panelTabId))) panelTabId = 'user'

        return {
            type: StoreSettingsTypes.SETTINGS_SET_SETTINGS_PANEL_TAB,
            payload: panelTabId
        }
    },
}

export default settingsActions