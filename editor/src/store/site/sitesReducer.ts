import FilesTreeType from 'libs/FilesTree/types'
import StoreSitesTypes from './sitesTypes'

export type SitesReducerType = {
    sites: StoreSitesTypes.SitesType
    currentSiteId: StoreSitesTypes.CurrentSiteId
    rightMainTab: StoreSitesTypes.RightMainTab
    incFilesTemplatesSection: {
        templates: StoreSitesTypes.IncFilesTemplatesType
        currentTemplateId: StoreSitesTypes.CurrentIncFilesTemplateId
    },
    componentsSection: {
        currentCompItemId: StoreSitesTypes.CurrentCompItemId
        currentCompItemType: StoreSitesTypes.CurrentCompItemType
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
    incFilesTemplatesSection: {
        // Массив шаблонов подключаемых файлов
        templates: [],
        // id выбранного шаблона подключаемых файлов
        currentTemplateId: null,
    },
    // Данные по вкладке «Шаблоны компонентов»
    componentsSection: {
        // id выбранного шаблона компонента
        currentCompItemId: null,
        currentCompItemType: null
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


// Установка массива шаблонов подключаемых файлов
function setTemplates(state: SitesReducerType, action: StoreSitesTypes.SetIncFilesTemplatesAction): SitesReducerType {
    return {
        ...state,
        incFilesTemplatesSection: {
            ...state.incFilesTemplatesSection,
            templates: action.payload
        }
    }
}

// Установка id выбранного подключаемых шаблонов
function setCurrentIncFilesTemplateId(state: SitesReducerType, action: StoreSitesTypes.SetCurrentIncFilesTemplateIdAction): SitesReducerType {
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
        incFilesTemplatesSection: {
            ...state.incFilesTemplatesSection,
            currentTemplateId: action.payload
        }
    }
}

// Установка id выбранного подключаемых шаблонов
function setCurrentComp(state: SitesReducerType, action: StoreSitesTypes.SetCurrentCompAction): SitesReducerType {
    if (action.payload === null) {
        // Удалить из LocalStorage id шаблона компоненента потому что ничего не выбрано.
        localStorage.removeItem('editorComponentId')
        // Удалить из LocalStorage тип элемента (папка или компонент) потому что ничего не выбрано.
        localStorage.removeItem('editorComponentType')
    }
    else {
        // Поставить id шаблона компонента в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        localStorage.setItem('editorComponentId', action.payload.id)
        // Поставить тип элемента (папка или компонент) в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        localStorage.setItem('editorComponentType', action.payload.type)
    }

    return {
        ...state,
        componentsSection: {
            ...state.componentsSection,
            currentCompItemId: action.payload.id,
            currentCompItemType: action.payload.type,
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

        case StoreSitesTypes.SET_INC_FILES_TEMPLATES:
            return setTemplates(state, action)
        case StoreSitesTypes.SET_CURRENT_INC_FILES_TEMPLATE_ID:
            return setCurrentIncFilesTemplateId(state, action)
        case StoreSitesTypes.SET_CURRENT_COMP:
            return setCurrentComp(state, action)
        default:
            // @ts-ignore
            const x: never = null
            return state
    }
}
