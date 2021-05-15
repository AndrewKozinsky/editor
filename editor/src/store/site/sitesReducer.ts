import StoreSitesTypes from './sitesTypes'

export type SitesReducerType = {
    sites: StoreSitesTypes.SitesType
    currentSiteId: StoreSitesTypes.CurrentSiteId
    rightMainTab: StoreSitesTypes.RightMainTab
    pluginsSection: {
        plugins: StoreSitesTypes.PluginsType,
        currentPluginId: StoreSitesTypes.CurrentPluginsId,
    }
}



// Изначальные значения
const initialState: SitesReducerType = {
    // Массив сайтов пользователя
    sites: [],
    // id выбранного сайта
    currentSiteId: null,
    // id открытой вкладки на правой части
    rightMainTab: 0,
    // Данные по вкладке «Шаблоны подключаемых файлов»
    pluginsSection: {
        // Массив шаблонов подключаемых файлов
        plugins: [],
        // id выбранного шаблона подключаемых файлов
        currentPluginId: null,
    }
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
    if (action.payload === null) {
        // Удалить из LocalStorage id сайта потому что не выбран ни один сайт.
        localStorage.removeItem('editorSiteId')
    }
    else {
        // Поставить id сайта в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        localStorage.setItem('editorSiteId', action.payload)
    }

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


// Установка массива сайтов
function setPlugins(state: SitesReducerType, action: StoreSitesTypes.SetPluginsAction): SitesReducerType {
    return {
        ...state,
        pluginsSection: {
            ...state.pluginsSection,
            plugins: action.payload
        }
    }
}

// Установка id выбранного подключаемых шаблонов
function setCurrentPluginsId(state: SitesReducerType, action: StoreSitesTypes.SetCurrentPluginsIdAction): SitesReducerType {
    if (action.payload === null) {
        // Удалить из LocalStorage id подключаемых шаблонов потому что не выбран ни один подключаемый шаблон.
        localStorage.removeItem('editorPluginsId')
    }
    else {
        // Поставить id подключаемых шаблонов в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        localStorage.setItem('editorPluginsId', action.payload)
    }

    return {
        ...state,
        pluginsSection: {
            ...state.pluginsSection,
            currentPluginId: action.payload
        }
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

        case StoreSitesTypes.SET_PLUGINS:
            return setPlugins(state, action)
        case StoreSitesTypes.SET_CURRENT_PLUGINS_ID:
            return setCurrentPluginsId(state, action)
        default:
            // @ts-ignore
            const x: never = null
            return state
    }
}
