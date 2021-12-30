import { removeFromLocalStorage, setInLocalStorage } from 'utils/MiscUtils';
import config from 'utils/config';
import StoreSitesTypes from './sitesTypes';
// Изначальные значения
const initialState = {
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
        compFolderId: null,
        compFolder: null // Код папки
    },
    // Объект с данными папки со статьями
    artFolderSection: {
        artFolderId: null,
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
        siteTemplateId: null
    }
};
// САЙТЫ ==================================================================================
// Установка массива сайтов
function setSites(state, action) {
    return Object.assign(Object.assign({}, state), { sites: action.payload });
}
// Установка id выбранного сайта
function setCurrentSiteId(state, action) {
    if (action.payload === null) {
        // Удалить из LocalStorage id сайта потому что не выбран ни один сайт.
        removeFromLocalStorage(config.ls.editorSiteId);
    }
    else {
        // Поставить id сайта в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage(config.ls.editorSiteId, action.payload);
    }
    return Object.assign(Object.assign({}, state), { currentSiteId: action.payload });
}
// ПРАВЫЕ ВКЛАДКИ ==================================================================================
// Установка id текущей основной вкладки справа
function setRightMainTab(state, action) {
    // Поставить номер правой вкладки в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
    setInLocalStorage(config.ls.editorSitePartTab, action.payload);
    return Object.assign(Object.assign({}, state), { rightMainTab: action.payload });
}
// ШАБЛОНЫ ПОДКЛЮЧАЕМЫХ ФАЙЛОВ ==================================================================================
// Установка массива шаблонов сайта
function setTemplates(state, action) {
    return Object.assign(Object.assign({}, state), { siteTemplatesSection: Object.assign(Object.assign({}, state.siteTemplatesSection), { templates: action.payload }) });
}
// Установка id выбранного шаблона текущего сайта
function setCurrentSiteTemplateId(state, action) {
    if (action.payload === null) {
        // Удалить из LocalStorage id подключаемых шаблонов потому что не выбран ни один подключаемый шаблон.
        removeFromLocalStorage(config.ls.editorSiteTemplateId);
    }
    else {
        // Поставить id подключаемых шаблонов в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage(config.ls.editorSiteTemplateId, action.payload);
    }
    return Object.assign(Object.assign({}, state), { siteTemplatesSection: Object.assign(Object.assign({}, state.siteTemplatesSection), { currentTemplateId: action.payload }) });
}
// ПАПКИ С КОМПОНЕНТАМИ ==================================================================================
function setCompFolder(state, action) {
    return Object.assign(Object.assign({}, state), { compFolderSection: Object.assign(Object.assign({}, state.compFolderSection), { compFolderId: action.payload.id || state.compFolderSection.compFolderId, compFolder: action.payload.folders }) });
}
// ПАПКИ СО СТАТЬЯМИ ==================================================================================
function setArtFolder(state, action) {
    return Object.assign(Object.assign({}, state), { artFolderSection: Object.assign(Object.assign({}, state.artFolderSection), { artFolderId: action.payload.id || state.artFolderSection.artFolderId, artFolder: action.payload.folders }) });
}
// КОМПОНЕНТЫ ==================================================================================
// Установка id выбранного компонента
function setCurrentComp(state, action) {
    if (action.payload.id) {
        // Поставить id шаблона компонента в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage(config.ls.editorComponentId, action.payload.id);
        // Поставить тип элемента (папка или компонент) в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage(config.ls.editorComponentType, action.payload.type);
        let newComponentSection;
        // Если выделили папку
        if (action.payload.type === 'folder') {
            newComponentSection = Object.assign(Object.assign({}, state.componentSection), { currentCompItemId: action.payload.id, currentCompItemType: action.payload.type, currentCompName: null, currentCompCode: null });
        }
        // Если если выделили компонент
        else if (action.payload.type === 'file') {
            newComponentSection = Object.assign(Object.assign({}, state.componentSection), { currentCompItemId: action.payload.id, currentCompItemType: action.payload.type, currentCompName: action.payload.name || '', currentCompCode: action.payload.code || '' });
        }
        return Object.assign(Object.assign({}, state), { componentSection: newComponentSection });
    }
    else {
        // Удалить из LocalStorage id шаблона компоненента потому что ничего не выбрано.
        removeFromLocalStorage(config.ls.editorComponentId);
        // Удалить из LocalStorage тип элемента (папка или компонент) потому что ничего не выбрано.
        removeFromLocalStorage(config.ls.editorComponentType);
        return Object.assign(Object.assign({}, state), { componentSection: Object.assign(Object.assign({}, state.componentSection), { currentCompItemId: null, currentCompItemType: null, currentCompName: null, currentCompCode: null }) });
    }
}
// СТАТЬИ ======================================================================================
// Установка id выбранного подключаемых шаблонов
function setCurrentArt(state, action) {
    if (action.payload.id) {
        // Поставить id шаблона компонента в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage(config.ls.editorArticleId, action.payload.id);
        // Поставить тип элемента (папка или компонент) в LocalStorage чтобы при загрузке страницы ставить его в Хранилище
        setInLocalStorage(config.ls.editorArticleType, action.payload.type);
        let newArticleSection;
        // Если ставят данные папки
        if (action.payload.type === 'folder') {
            newArticleSection = Object.assign(Object.assign({}, state.articleSection), { currentArtItemId: action.payload.id, currentArtItemType: action.payload.type, currentArtName: '', currentArtCode: null, siteTemplateId: null });
        }
        // Если ставят данные статьи
        else if (action.payload.type === 'file') {
            newArticleSection = Object.assign(Object.assign({}, state.articleSection), { currentArtItemId: action.payload.id, currentArtItemType: action.payload.type, currentArtName: action.payload.name || '', currentArtCode: action.payload.code || null, siteTemplateId: action.payload.siteTemplateId || null });
        }
        return Object.assign(Object.assign({}, state), { articleSection: newArticleSection });
    }
    else {
        // Удалить из LocalStorage id шаблона компоненента потому что ничего не выбрано.
        removeFromLocalStorage(config.ls.editorArticleId);
        // Удалить из LocalStorage тип элемента (папка или компонент) потому что ничего не выбрано.
        removeFromLocalStorage(config.ls.editorArticleType);
        return Object.assign(Object.assign({}, state), { articleSection: Object.assign(Object.assign({}, state.articleSection), { currentArtItemId: null, currentArtItemType: null, currentArtName: '', currentArtCode: null, siteTemplateId: null }) });
    }
}
// Редьюсер Store.sites
export default function sitesReducer(state = initialState, action) {
    switch (action.type) {
        case StoreSitesTypes.SET_SITES:
            return setSites(state, action);
        case StoreSitesTypes.SET_CURRENT_SITE_ID:
            return setCurrentSiteId(state, action);
        case StoreSitesTypes.SET_RIGHT_MAIN_TAB:
            return setRightMainTab(state, action);
        case StoreSitesTypes.SET_SITE_TEMPLATES:
            return setTemplates(state, action);
        case StoreSitesTypes.SET_CURRENT_SITE_TEMPLATE_ID:
            return setCurrentSiteTemplateId(state, action);
        case StoreSitesTypes.SET_COMP_FOLDER:
            return setCompFolder(state, action);
        case StoreSitesTypes.SET_ART_FOLDER:
            return setArtFolder(state, action);
        case StoreSitesTypes.SET_CURRENT_COMP:
            return setCurrentComp(state, action);
        case StoreSitesTypes.SET_CURRENT_ART:
            return setCurrentArt(state, action);
        default:
            // @ts-ignore
            const x = null;
            return state;
    }
}
//# sourceMappingURL=sitesReducer.js.map
//# sourceMappingURL=sitesReducer.js.map