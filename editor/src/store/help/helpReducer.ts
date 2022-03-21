import { setInLocalStorage } from 'utils/miscUtils'
import StoreHelpTypes from './helpTypes'
import config from 'utils/config'

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
    // Поставить id вкладки в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
    setInLocalStorage(config.ls.editorHelpTabId, action.payload)

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
