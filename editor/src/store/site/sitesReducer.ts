import StoreSitesTypes from './sitesTypes'

export type SitesReducerType = {
    sites: StoreSitesTypes.SitesType
    currentSiteId: StoreSitesTypes.CurrentSiteId
    rightMainTab: StoreSitesTypes.RightMainTab
}



// Изначальные значения
const initialState: SitesReducerType = {
    // Массив сайтов пользователя
    sites: [],
    // id выбранного сайта
    currentSiteId: '',
    // id открытой вкладки на правой части
    rightMainTab: 0,
}

// Установка массива сайтов
function setSites(state: SitesReducerType, action: StoreSitesTypes.SetSitesAction): SitesReducerType {
    return {
        ...state,
        sites: action.payload
    }
}

// Установка id выбранного сайта
function setCurrentSiteId(state: SitesReducerType, action: StoreSitesTypes.SetCurrentSiteIdAction): SitesReducerType {
    // Поставить id сайта в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
    localStorage.setItem('editorSiteId', action.payload)

    return {
        ...state,
        currentSiteId: action.payload
    }
}

// Установка id текущей основной вкладки справа
function setRightMainTab(state: SitesReducerType, action: StoreSitesTypes.SetRightMainTabAction): SitesReducerType {
    // Поставить номер правой вкладки в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
    localStorage.setItem('editorSitePartTab', action.payload.toString())

    return {
        ...state,
        rightMainTab: action.payload
    }
}



// Редьюсер Store.settings
export default function sitesReducer(state = initialState, action: StoreSitesTypes.SitesAction): SitesReducerType {

    switch (action.type) {
        case StoreSitesTypes.SET_SITES:
            return setSites(state, action)
        case StoreSitesTypes.SET_CURRENT_SITE_ID:
            return setCurrentSiteId(state, action)
        case StoreSitesTypes.SET_RIGHT_MAIN_TAB:
            return setRightMainTab(state, action)
        default:
            // @ts-ignore
            const x: never = null
            return state
    }
}
