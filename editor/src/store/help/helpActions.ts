// Types
import StoreHelpTypes from './helpTypes'

const helpActions = {

    // Активная вкладка панели «Настройки»: user или editor
    setHelpPanelTab(payload: StoreHelpTypes.HelpPanelTab): StoreHelpTypes.SetHelpPanelTabAction {
        let panelTabId = payload
        if (!(['reg'].includes(panelTabId))) panelTabId = 'reg'

        return {
            type: StoreHelpTypes.SET_HELP_PANEL_TAB,
            payload: panelTabId
        }
    },
}

export default helpActions