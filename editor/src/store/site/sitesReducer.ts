import StoreSitesTypes from './sitesTypes'
import {store} from '../rootReducer'

export type SitesReducerType = {
    sites: StoreSitesTypes.SitesType
    currentSiteId: StoreSitesTypes.CurrentSiteId
    rightMainTab: StoreSitesTypes.RightMainTab
    siteTemplatesSection: StoreSitesTypes.SiteTemplatesSection,
    metaTemplatesSection: StoreSitesTypes.MetaTemplatesSection,
    compFolderSection: StoreSitesTypes.CompFolderSection
    artFolderSection: StoreSitesTypes.ArtFolderSection
    componentSection: StoreSitesTypes.ComponentSection
    articleSection: StoreSitesTypes.ArticleSection
}

// Изначальные значения
const initialState: SitesReducerType = {
    // Массив сайтов пользователя
    sites: [],
    // id выбранного сайта
    currentSiteId: null,
    // id открытой вкладки на правой части
    rightMainTab: 0,
    // Данные по вкладке «Шаблоны сайта»
    siteTemplatesSection: {
        // Массив шаблонов сайта
        templates: [],
        // id выбранного шаблона сайта
        currentTemplateId: null,
    },
    // Данные по вкладке «Шаблоны метаданных»
    metaTemplatesSection: {
        // Массив шаблонов сайта
        templates: [],
        // id выбранного шаблона сайта
        currentTemplateId: null,
    },
    // Объект с данными папки с компонентами
    compFolderSection: {
        compFolderId: null, // id данных папок при взаимодействии с сервером
        compFolder: null // Код папки
    },
    // Объект с данными папки со статьями
    artFolderSection: {
        artFolderId: null, // id данных папок при взаимодействии с сервером
        artFolder: null // Код папки
    },
    // Данные по вкладке «Шаблоны компонентов»
    componentSection: {
        // id выбранного элемента: папки или компонента
        currentCompItemId: null,
        // тип выбранного элемента: папка или компонент
        currentCompItemType: null,
        // Имя выбранного компонента
        currentCompName: null,
        // Строка с кодом выбранного шаблона компонента
        currentCompCode: null,
    },
    // Данные по вкладке «Статьи»
    articleSection: {
        // id выбранного элемента: папки или статьи
        currentArtItemId: null,
        // Тип выбранного элемента: папка или компонент
        currentArtItemType: null,
        // Имя выбранной статьи
        currentArtName: null,
        // Строка с кодом выбранной статьи
        currentArtCode: null,
        // id шаблона подключаемых компонентов у выбранной статьи
        siteTemplateId: null,
        // id шаблона метаданных у выбранной статьи
        metaTemplateId: null,
        meta: null
    }
}

// САЙТЫ ==================================================================================

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
        // Удалить из LocalStorage id сайта потому что не выбрана ни одна группа
        // localStorageProxyStore.setCommonSetting('groupId', null)
    }
    else {
        // Поставить id группы в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        // localStorageProxyStore.setCommonSetting('groupId', action.payload)
    }

    return {
        ...state,
        currentSiteId: action.payload
    }
}

// ПРАВЫЕ ВКЛАДКИ ==================================================================================

// Установка id текущей основной вкладки справа
function setRightMainTab(state: SitesReducerType, action: StoreSitesTypes.SetRightMainTabAction): SitesReducerType {
    // Поставить номер правой вкладки в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
    // localStorageProxyStore.setCommonSetting('groupPartTab', action.payload)

    return {
        ...state,
        rightMainTab: action.payload
    }
}

// ШАБЛОНЫ ПОДКЛЮЧАЕМЫХ ФАЙЛОВ ==================================================================================

// Установка массива шаблонов сайта
function setSiteTemplates(state: SitesReducerType, action: StoreSitesTypes.SetSiteTemplatesAction): SitesReducerType {
    return {
        ...state,
        siteTemplatesSection: {
            ...state.siteTemplatesSection,
            templates: action.payload
        }
    }
}

// Установка id выбранного шаблона текущего сайта
function setCurrentSiteTemplateId(
    state: SitesReducerType, action: StoreSitesTypes.SetCurrentSiteTemplateIdAction
): SitesReducerType {
    if (action.payload === null) {
        // Удалить из LocalStorage id подключаемых шаблонов потому что не выбран ни один подключаемый шаблон.
        // localStorageProxyStore.setCommonSetting('groupId', null)
    }
    else {
        // Поставить id подключаемых шаблонов в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        // localStorageProxyStore.setCommonSetting('groupId', action.payload)
    }

    return {
        ...state,
        siteTemplatesSection: {
            ...state.siteTemplatesSection,
            currentTemplateId: action.payload
        }
    }
}


// ШАБЛОНЫ ПОДКЛЮЧАЕМЫХ ФАЙЛОВ ==================================================================================

// Установка массива шаблонов сайта
function setMetaTemplates(state: SitesReducerType, action: StoreSitesTypes.SetMetaTemplatesAction): SitesReducerType {
    return {
        ...state,
        metaTemplatesSection: {
            ...state.metaTemplatesSection,
            templates: action.payload
        }
    }
}

// Установка id выбранного шаблона текущего сайта
function setCurrentMetaTemplateId(
    state: SitesReducerType, action: StoreSitesTypes.SetCurrentMetaTemplateIdAction
): SitesReducerType {
    if (action.payload === null) {
        // Удалить из LocalStorage id подключаемых шаблонов потому что не выбран ни один подключаемый шаблон.
        // removeFromLocalStorage(config.ls.editorMetaTemplateId)
    }
    else {
        // Поставить id подключаемых шаблонов в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        // setInLocalStorage(config.ls.editorMetaTemplateId, action.payload)
    }

    return {
        ...state,
        metaTemplatesSection: {
            ...state.metaTemplatesSection,
            currentTemplateId: action.payload
        }
    }
}

// ПАПКИ С КОМПОНЕНТАМИ ==================================================================================

function setCompFolder(state: SitesReducerType, action: StoreSitesTypes.SetCompFolderAction): SitesReducerType {
    return {
        ...state,
        compFolderSection: {
            ...state.compFolderSection,
            compFolderId: action.payload.id || state.compFolderSection.compFolderId,
            compFolder: action.payload.folders
        }
    }
}

// ПАПКИ СО СТАТЬЯМИ ==================================================================================

function setArtFolder(state: SitesReducerType, action: StoreSitesTypes.SetArtFolderAction): SitesReducerType {
    return {
        ...state,
        artFolderSection: {
            ...state.artFolderSection,
            artFolderId: action.payload.id || state.artFolderSection.artFolderId,
            artFolder: action.payload.folders
        }
    }
}

// КОМПОНЕНТЫ ==================================================================================

// Установка id выбранного компонента
function setCurrentComp(state: SitesReducerType, action: StoreSitesTypes.SetCurrentCompAction): SitesReducerType {
    if (action.payload.id) {
        let newComponentSection: StoreSitesTypes.ComponentSection

        // Если выделили папку
        if (action.payload.type === 'folder') {
            newComponentSection = {
                ...state.componentSection,
                currentCompItemId: action.payload.id,
                currentCompItemType: action.payload.type,
                currentCompName: null,
                currentCompCode: null
            }
        }
        // Если выделили компонент
        else if (action.payload.type === 'file') {
            newComponentSection = {
                ...state.componentSection,
                currentCompItemId: action.payload.id,
                currentCompItemType: action.payload.type,
                currentCompName: action.payload.name || '',
                currentCompCode: action.payload.code || ''
            }
        }

        return {
            ...state,
            componentSection: newComponentSection
        }
    }
    else {
        return {
            ...state,
            componentSection: {
                ...state.componentSection,
                currentCompItemId: null,
                currentCompItemType: null,
                currentCompName: null,
                currentCompCode: null,
            }
        }
    }
}

// СТАТЬИ ======================================================================================

// Установка id выбранного подключаемых шаблонов
function setCurrentArt(state: SitesReducerType, action: StoreSitesTypes.SetCurrentArtAction): SitesReducerType {
    if (action.payload.id) {
        let newArticleSection: StoreSitesTypes.ArticleSection

        // Если ставят данные папки
        if (action.payload.type === 'folder') {
            newArticleSection = {
                ...state.articleSection,
                currentArtItemId: action.payload.id,
                currentArtItemType: action.payload.type,
                currentArtName: '',
                currentArtCode: null,
                siteTemplateId: null,
                metaTemplateId: null,
                meta: null
            }
        }
        // Если ставят данные статьи
        else if (action.payload.type === 'file') {
            newArticleSection = {
                ...state.articleSection,
                currentArtItemId: action.payload.id,
                currentArtItemType: action.payload.type,
                currentArtName: action.payload.name || '',
                currentArtCode: action.payload.code || null,
                siteTemplateId: action.payload.siteTemplateId || null,
                metaTemplateId: action.payload.metaTemplateId || null,
                meta: action.payload.meta || null
            }
        }

        return {
            ...state,
            articleSection: newArticleSection
        }
    }
    else {
        return {
            ...state,
            articleSection: {
                ...state.articleSection,
                currentArtItemId: null,
                currentArtItemType: null,
                currentArtName: '',
                currentArtCode: null,
                siteTemplateId: null,
                metaTemplateId: null,
                meta: null,
            }
        }
    }
}

// Установка id выбранного подключаемых шаблонов
function setArticleMetaTemplateId(state: SitesReducerType, action: StoreSitesTypes.SetArticleMetaTemplateIdAction): SitesReducerType {
    return {
        ...state,
        articleSection: {
            ...state.articleSection,
            metaTemplateId: action.payload
        }
    }
}

// Установка метаданных статьи
function setArticleMeta(state: SitesReducerType, action: StoreSitesTypes.SetArticleMetaAction): SitesReducerType {
    return {
        ...state,
        articleSection: {
            ...state.articleSection,
            meta: action.payload
        }
    }
}


// Редьюсер Store.sites
export default function sitesReducer(
    state = initialState, action: StoreSitesTypes.SitesAction
): SitesReducerType {

    switch (action.type) {
        case StoreSitesTypes.SET_SITES:
            return setSites(state, action)
        case StoreSitesTypes.SET_CURRENT_SITE_ID:
            return setCurrentSiteId(state, action)

        case StoreSitesTypes.SET_RIGHT_MAIN_TAB:
            return setRightMainTab(state, action)

        case StoreSitesTypes.SET_SITE_TEMPLATES:
            return setSiteTemplates(state, action)
        case StoreSitesTypes.SET_CURRENT_SITE_TEMPLATE_ID:
            return setCurrentSiteTemplateId(state, action)

        case StoreSitesTypes.SET_META_TEMPLATES:
            return setMetaTemplates(state, action)
        case StoreSitesTypes.SET_CURRENT_META_TEMPLATE_ID:
            return setCurrentMetaTemplateId(state, action)

        case StoreSitesTypes.SET_COMP_FOLDER:
            return setCompFolder(state, action)
        case StoreSitesTypes.SET_ART_FOLDER:
            return setArtFolder(state, action)

        case StoreSitesTypes.SET_CURRENT_COMP:
            return setCurrentComp(state, action)
        case StoreSitesTypes.SET_CURRENT_ART:
            return setCurrentArt(state, action)

        case StoreSitesTypes.SET_ARTICLE_META_TEMPLATE_ID:
            return setArticleMetaTemplateId(state, action)
        case StoreSitesTypes.SET_ARTICLE_META:
            return setArticleMeta(state, action)

        default:
            // @ts-ignore
            const _: never = action.type
            // throw new Error('Errow in the sitesReducer')
            return state
    }
}
