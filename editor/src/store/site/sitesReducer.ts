import { removeFromLocalStorage, setInLocalStorage } from 'utils/MiscUtils'
import StoreSitesTypes from './sitesTypes'

export type SitesReducerType = {
    sites: StoreSitesTypes.SitesType
    currentSiteId: StoreSitesTypes.CurrentSiteId
    rightMainTab: StoreSitesTypes.RightMainTab
    siteTemplatesSection: {
        templates: StoreSitesTypes.SiteTemplatesType
        currentTemplateId: StoreSitesTypes.CurrentSiteTemplateId
    },
    compFolderSection: StoreSitesTypes.CompFolderSection
    artFolderSection: StoreSitesTypes.ArtFolderSection
    componentsSection: StoreSitesTypes.ComponentsSection
    articlesSection: StoreSitesTypes.ArticlesSection
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
    componentsSection: {
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
    articlesSection: {
        // id выбранного элемента: папки или статьи
        currentArtItemId: null,
        // Тип выбранного элемента: папка или компонент
        currentArtItemType: null,
        // Имя выбранной статьи
        currentArtName: '',
        // Строка с кодом выбранной статьи
        currentArtCode: null,
        // id шаблона подключаемых компонентов у выбранной статьи
        siteTemplateId: null
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

// ПРАВЫЕ ВКЛАДКИ ==================================================================================

// Установка id текущей основной вкладки справа
function setRightMainTab(state: SitesReducerType, action: StoreSitesTypes.SetRightMainTabAction): SitesReducerType {
    // Поставить номер правой вкладки в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
    setInLocalStorage('editorSitePartTab', action.payload)

    return {
        ...state,
        rightMainTab: action.payload
    }
}

// ШАБЛОНЫ ПОДКЛЮЧАЕМЫХ ФАЙЛОВ ==================================================================================

// Установка массива шаблонов сайта
function setTemplates(state: SitesReducerType, action: StoreSitesTypes.SetSiteTemplatesAction): SitesReducerType {
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
        removeFromLocalStorage('editorSiteTemplateId')
    }
    else {
        // Поставить id подключаемых шаблонов в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage('editorSiteTemplateId', action.payload)
    }

    return {
        ...state,
        siteTemplatesSection: {
            ...state.siteTemplatesSection,
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
            compFolderId: action.payload.id,
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
            artFolderId: action.payload.id,
            artFolder: action.payload.folders
        }
    }
}

// КОМПОНЕНТЫ ==================================================================================

// Установка id выбранного компонента
function setCurrentComp(state: SitesReducerType, action: StoreSitesTypes.SetCurrentCompAction): SitesReducerType {
    if (action.payload === null) {
        // Удалить из LocalStorage id шаблона компоненента потому что ничего не выбрано.
        removeFromLocalStorage('editorComponentId')
        // Удалить из LocalStorage тип элемента (папка или компонент) потому что ничего не выбрано.
        removeFromLocalStorage('editorComponentType')

        return {
            ...state,
            componentsSection: {
                ...state.componentsSection,
                currentCompItemId: null,
                currentCompItemType: null,
                currentCompName: null,
                currentCompCode: null,
            }
        }
    }
    else {
        // Поставить id шаблона компонента в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage('editorComponentId', action.payload.id)
        // Поставить тип элемента (папка или компонент) в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage('editorComponentType', action.payload.type)

        let newComponentSection: StoreSitesTypes.ComponentsSection

        // Если выделили папку
        if (action.payload.type === 'folder') {
            newComponentSection = {
                ...state.componentsSection,
                currentCompItemId: action.payload.id,
                currentCompItemType: action.payload.type,
                currentCompName: null,
                currentCompCode: null
            }
        }
        // Если если выделили компонент
        else if (action.payload.type === 'file') {
            newComponentSection = {
                ...state.componentsSection,
                currentCompItemId: action.payload.id,
                currentCompItemType: action.payload.type,
                currentCompName: action.payload.name || null,
                currentCompCode: action.payload.code || null
            }
        }

        return {
            ...state,
            componentsSection: newComponentSection
        }
    }
}

// СТАТЬИ ======================================================================================

// Установка id выбранного подключаемых шаблонов
function setCurrentArt(state: SitesReducerType, action: StoreSitesTypes.SetCurrentArtAction): SitesReducerType {
    if (action.payload === null) {
        // Удалить из LocalStorage id шаблона компоненента потому что ничего не выбрано.
        removeFromLocalStorage('editorArticleId')
        // Удалить из LocalStorage тип элемента (папка или компонент) потому что ничего не выбрано.
        removeFromLocalStorage('editorArticleType')

        return {
            ...state,
            articlesSection: {
                ...state.articlesSection,
                currentArtItemId: null,
                currentArtItemType: null,
                currentArtName: '',
                currentArtCode: null,
                siteTemplateId: null
            }
        }
    }
    else {
        // Поставить id шаблона компонента в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage('editorArticleId', action.payload.id)
        // Поставить тип элемента (папка или компонент) в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage('editorArticleType', action.payload.type)

        let newArticleSection: StoreSitesTypes.ArticlesSection

        // Если ставят данные папки
        if (action.payload.type === 'folder') {
            newArticleSection = {
                ...state.articlesSection,
                currentArtItemId: action.payload.id,
                currentArtItemType: action.payload.type,
                currentArtName: action.payload.name,
                currentArtCode: null,
                siteTemplateId: null
            }
        }
        // Если ставят данные статьи
        else if (action.payload.type === 'file') {
            newArticleSection = {
                ...state.articlesSection,
                currentArtItemId: action.payload.id,
                currentArtItemType: action.payload.type,
                currentArtName: action.payload.name,
                currentArtCode: action.payload.code || null,
                siteTemplateId: action.payload.siteTemplateId || null
            }
        }

        return {
            ...state,
            articlesSection: newArticleSection
        }
    }
}
















// Component Template item (folder or file) type setting
/*function setCurrentCompItemType(state: SitesReducerType, action: StoreSitesTypes.SetCurrentCompItemTypeAction): SitesReducerType {
    if (action.payload === null) {
        // Удалить из LocalStorage тип элемента (папка или компонент) потому что ничего не выбрано.
        removeFromLocalStorage('editorComponentType')
    }
    else {
        // Поставить тип элемента (папка или компонент) в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage('editorComponentType', action.payload)
    }

    return {
        ...state,
        componentsSection: {
            ...state.componentsSection,
            currentCompItemType: action.payload
        }
    }
}*/

// Component Template item id setting
/*function setCurrentCompItemId(state: SitesReducerType, action: StoreSitesTypes.SetCurrentCompItemIdAction): SitesReducerType {
    if (action.payload === null) {
        // Удалить из LocalStorage тип элемента (папка или компонент) потому что ничего не выбрано.
        removeFromLocalStorage('editorComponentId')
    }
    else {
        // Поставить тип элемента (папка или компонент) в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage('editorComponentId', action.payload)
    }

    return {
        ...state,
        componentsSection: {
            ...state.componentsSection,
            currentCompItemId: action.payload
        }
    }
}*/

// Установка id выбранного подключаемых шаблонов
/*function setCurrentArtItemType(state: SitesReducerType, action: StoreSitesTypes.SetCurrentArtItemTypeAction): SitesReducerType {
    if (action.payload === null) {
        // Удалить из LocalStorage тип элемента (папка или компонент) потому что ничего не выбрано.
        removeFromLocalStorage('editorArticleType')
    }
    else {
        // Поставить тип элемента (папка или компонент) в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage('editorArticleType', action.payload)
    }

    return {
        ...state,
        articlesSection: {
            ...state.articlesSection,
            currentArtItemType: action.payload
        }
    }
}*/

// Установка id выбранного подключаемых шаблонов
/*function setCurrentArtItemId(state: SitesReducerType, action: StoreSitesTypes.SetCurrentArtItemIdAction): SitesReducerType {
    if (action.payload === null) {
        // Удалить из LocalStorage тип элемента (папка или компонент) потому что ничего не выбрано.
        removeFromLocalStorage('editorArticleId')
    }
    else {
        // Поставить тип элемента (папка или компонент) в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage('editorArticleId', action.payload)
    }

    return {
        ...state,
        articlesSection: {
            ...state.articlesSection,
            currentArtItemId: action.payload
        }
    }
}*/

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
            return setTemplates(state, action)

        case StoreSitesTypes.SET_COMP_FOLDER:
            return setCompFolder(state, action)
        case StoreSitesTypes.SET_ART_FOLDER:
            return setArtFolder(state, action)

        case StoreSitesTypes.SET_CURRENT_COMP:
            return setCurrentComp(state, action)
        case StoreSitesTypes.SET_CURRENT_ART:
            return setCurrentArt(state, action)


        // case StoreSitesTypes.SET_CURRENT_SITE_TEMPLATE_ID:
        //     return setCurrentSiteTemplateId(state, action)

        // case StoreSitesTypes.SET_CURRENT_COMP_ITEM_TYPE:
        //     return setCurrentCompItemType(state, action)

        // case StoreSitesTypes.SET_CURRENT_COMP_ITEM_ID:
        //     return setCurrentCompItemId(state, action)

        // case StoreSitesTypes.SET_CURRENT_ART_ITEM_TYPE:
        //     return setCurrentArtItemType(state, action)

        // case StoreSitesTypes.SET_CURRENT_ART_ITEM_ID:
        //     return setCurrentArtItemId(state, action)
        default:
            // @ts-ignore
            const x: never = null
            return state
    }
}
