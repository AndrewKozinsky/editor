
// Типы редьюсера Store.settings
namespace StoreSettingsTypes {

    // Активная вкладка панели Помощи
    export type HelpPanelTab = 'reg'

    // Установка активной вкладки панели «Настройки»
    export const SET_HELP_PANEL_TAB = 'SET_HELP_PANEL_TAB'
    export type SetHelpPanelTabAction = {
        type: typeof SET_HELP_PANEL_TAB
        payload: HelpPanelTab
    }


    export type SettingsAction =
        | SetHelpPanelTabAction
}

export default StoreSettingsTypes