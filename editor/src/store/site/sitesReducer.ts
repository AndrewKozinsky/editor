import {removeFromLocalStorage, setInLocalStorage} from 'utils/MiscUtils'
import StoreSitesTypes from './sitesTypes'

export type SitesReducerType = {
    sites: StoreSitesTypes.SitesType
    currentSiteId: StoreSitesTypes.CurrentSiteId
    rightMainTab: StoreSitesTypes.RightMainTab
    incFilesTemplatesSection: {
        templates: StoreSitesTypes.IncFilesTemplatesType
        currentTemplateId: StoreSitesTypes.CurrentIncFilesTemplateId
    }
    componentsSection: {
        currentCompItemId: StoreSitesTypes.CurrentCompItemId
        currentCompItemType: StoreSitesTypes.CurrentCompItemType
        currentCompCode: StoreSitesTypes.ComponentCode
    }
    articlesSection: {
        currentArtItemId: StoreSitesTypes.CurrentArtItemId
        currentArtItemType: StoreSitesTypes.CurrentArtItemType
        currentArtName: StoreSitesTypes.ArticleName
        currentArtIncFilesTemplateId: StoreSitesTypes.CurrentIncFilesTemplateId
        currentArtCode: StoreSitesTypes.ArticleCode
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
        // uuid выбранного элемента: папки или компонента
        currentCompItemId: null,
        // тип выбранного элемента: папка или компонент
        currentCompItemType: null,
        // Строка с кодом выбранного шаблона компонента
        currentCompCode: null,
    },
    // Данные по вкладке «Статьи»
    articlesSection: {
        // uuid выбранного элемента: папки или статьи
        currentArtItemId: null,
        // Тип выбранного элемента: папка или компонент
        currentArtItemType: null,
        // Имя выбранной статьи
        currentArtName: '',
        // id шаблона подключаемых компонентов у выбранной статьи
        currentArtIncFilesTemplateId: null,
        // Строка с кодом выбранной статьи
        currentArtCode: null,
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
        removeFromLocalStorage('editorSiteId')
    }
    else {
        // Поставить id сайта в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage('editorSiteId', action.payload)
    }

    return {
        ...state,
        currentSiteId: action.payload
    }
}

// Установка id текущей основной вкладки справа
function setRightMainTab(state: SitesReducerType, action: StoreSitesTypes.SetRightMainTabAction): SitesReducerType {
    // Поставить номер правой вкладки в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
    setInLocalStorage('editorSitePartTab', action.payload)

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
        removeFromLocalStorage('editorPluginsId')
    }
    else {
        // Поставить id подключаемых шаблонов в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage('editorPluginsId', action.payload)
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
    if (action.payload.id === null) {
        // Удалить из LocalStorage id шаблона компоненента потому что ничего не выбрано.
        removeFromLocalStorage('editorComponentId')
        // Удалить из LocalStorage тип элемента (папка или компонент) потому что ничего не выбрано.
        removeFromLocalStorage('editorComponentType')
    }
    else {
        // Поставить id шаблона компонента в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage('editorComponentId', action.payload.id)
        // Поставить тип элемента (папка или компонент) в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage('editorComponentType', action.payload.type)
    }

    return {
        ...state,
        componentsSection: {
            ...state.componentsSection,
            currentCompItemId: action.payload.id,
            currentCompItemType: action.payload.type,
            currentCompCode: action.payload.code || null,
        }
    }
}

// Установка id выбранного подключаемых шаблонов
function setCurrentArt(state: SitesReducerType, action: StoreSitesTypes.SetCurrentArtAction): SitesReducerType {
    if (action.payload.id === null) {
        // Удалить из LocalStorage id шаблона компоненента потому что ничего не выбрано.
        removeFromLocalStorage('editorArticleId')
        // Удалить из LocalStorage тип элемента (папка или компонент) потому что ничего не выбрано.
        removeFromLocalStorage('editorArticleType')
    }
    else {
        // Поставить id шаблона компонента в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage('editorArticleId', action.payload.id)
        // Поставить тип элемента (папка или компонент) в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage('editorArticleType', action.payload.type)
    }

    return {
        ...state,
        articlesSection: {
            ...state.articlesSection,
            currentArtItemId: action.payload.id,
            currentArtItemType: action.payload.type,
            currentArtCode: action.payload.code || null,
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

        case StoreSitesTypes.SET_CURRENT_ART:
            return setCurrentArt(state, action)
        default:
            // @ts-ignore
            const x: never = null
            return state
    }
}
