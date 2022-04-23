import StoreHelpTypes from './helpTypes'

export type HelpReducerType = {
    helpPanelTab: StoreHelpTypes.HelpPanelTab
}

// Изначальные значения
const initialState: HelpReducerType = {
    // Активная вкладка панели «Помощь»
    helpPanelTab: 'reg'
}

// Установка id вкладки в Настройках
function setHelpPanelTab(state: HelpReducerType, action: StoreHelpTypes.SetHelpPanelTabAction): HelpReducerType {
    return {
        ...state,
        helpPanelTab: action.payload
    }
}

// Редьюсер Store.help
export default function helpReducer(state = initialState, action: StoreHelpTypes.SettingsAction): HelpReducerType {

    switch (action.type) {
        case StoreHelpTypes.SET_HELP_PANEL_TAB:
            return setHelpPanelTab(state, action)
        default:
            // @ts-ignore
            const x: never = null
            return state
    }
}
