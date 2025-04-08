// Types
import StoreSettingsTypes from './settingsTypes'
import {MiscTypes} from 'types/miscTypes'
import localStorageProxyActions from '../localStorageProxy/localStorageProxyActions'

const settingsActions = {

    // Установка темы интерфейса (обёрточный экшен)
    setEditorLangOuter(editorLang: StoreSettingsTypes.EditorLang) {
        return function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            // Установка языка интерфейса
            dispatch( settingsActions.setEditorLang( editorLang ))
        }
    },

    // Установка темы интерфейса
    setEditorLang(payload: StoreSettingsTypes.EditorLang): StoreSettingsTypes.SetEditorLangAction {
        return {
            type: StoreSettingsTypes.SETTINGS_SET_EDITOR_LANG,
            payload
        }
    },

    // Установка темы интерфейса (обёрточный экшен)
    setEditorThemeOuter(editorTheme: StoreSettingsTypes.EditorTheme) {
        return function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            // Поставить название темы интерфейса в Store.localStorageProxy чтобы это сохранилось в LocalStorage
            dispatch( localStorageProxyActions.setCommon({propName: 'theme', propValue: editorTheme }))
            // Установка темы интерфейса
            dispatch( settingsActions.setEditorTheme( editorTheme ))
        }
    },

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

    // Установка номера главной вкладки (обёрточный экшен)
    setMainTabOuter(mainTabId: StoreSettingsTypes.MainTab) {
        return function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            // Поставить id выбранной главной вкладки в Store.localStorageProxy чтобы это сохранилось в LocalStorage
            dispatch( localStorageProxyActions.setCommon({propName: 'mainTab', propValue: mainTabId }))
            dispatch( settingsActions.setMainTab( mainTabId ))
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

    // Активная вкладка панели «Настройки»: user или editor (обёрточный экшен)
    setSettingsPanelTabOuter(settingsPartTab: StoreSettingsTypes.SettingsPanelTab) {
        return function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            // Поставить id выбранной вкладки в Настройках в Store.localStorageProxy чтобы это сохранилось в LocalStorage
            dispatch( localStorageProxyActions.setCommon({propName: 'settingsTab', propValue: settingsPartTab }))
            dispatch( settingsActions.setSettingsPanelTab( settingsPartTab ))
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