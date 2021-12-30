var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            }
        }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const JSON5 = require('json5');
import StoreSitesTypes from './sitesTypes';
import { store } from 'store/rootReducer';
import config from 'utils/config';
import { getFromLocalStorage } from 'utils/MiscUtils';
import sitesRequest from 'requests/editor/sites/sitesRequest';
import getSiteTemplatesRequest from 'requests/editor/siteTemplate/getSiteTemplatesRequest';
import { getCompFolderRequest } from 'requests/editor/compFolders/getCompFolderRequest';
import { getArtFolderRequest } from 'requests/editor/artFolders/getArtFolderRequest';
import getComponentRequest from 'requests/editor/components/getComponentRequest';
import { addOpenPropToFolders, selectItem } from 'libs/DragFilesTree/StoreManage/manageState';
import { getOpenedFoldersIds } from 'editor/RightPart-1/ComponentsOrArticles/FoldersList/FoldersList-func';
import getArticleRequest from 'requests/editor/article/getArticleRequest';
const sitesActions = {
    // САЙТЫ =====================================================================================
    // Загрузка сайтов с сервера и установка в Хранилище
    requestSites() {
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function* () {
                // Запрос на получение списка сайтов
                const response = yield sitesRequest();
                if (!response || response.status !== 'success')
                    return;
                // Формирование массива сайтов для установки в Хранилище
                const preparedSites = response.data.sites.map((site) => {
                    return {
                        id: site.id,
                        name: site.name,
                        defaultSiteTemplateId: site.defaultSiteTemplateId || null
                    };
                });
                // Установка сайтов в Хранилище
                dispatch(sitesActions.setSites(preparedSites));
            });
        };
    },
    // Установка массива сайтов
    setSites(payload) {
        return {
            type: StoreSitesTypes.SET_SITES,
            payload
        };
    },
    // Установка id выбранного сайта
    setCurrentSiteId(payload) {
        return {
            type: StoreSitesTypes.SET_CURRENT_SITE_ID,
            payload
        };
    },
    // ПРАВЫЕ ВКЛАДКИ ==================================================================================
    // Установка id текущей основной вкладки справа
    setRightMainTab(payload) {
        return {
            type: StoreSitesTypes.SET_RIGHT_MAIN_TAB,
            payload
        };
    },
    // ШАБЛОНЫ ПОДКЛЮЧАЕМЫХ ФАЙЛОВ ==================================================================================
    // Загрузка с сервера шаблонов сайта и установка в Хранилище
    requestSiteTemplates() {
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function* () {
                // id текущего сайта для которого нужно получить шаблоны
                const siteId = store.getState().sites.currentSiteId;
                // Если не передан id сайта, то обнулить массив шаблонов сайта
                // потому что выбрали новый сайт
                if (!siteId)
                    dispatch(sitesActions.setTemplates([]));
                // Запрос и ответ от сервера
                const response = yield getSiteTemplatesRequest(siteId);
                if (response.status !== 'success')
                    return;
                // Формированое массива шаблонов для установки в Хранилище
                const preparedTemplates = response.data.siteTemplates.map(template => {
                    let templateName = JSON5.parse(template.content).name;
                    // Формирование возвращаемого объекта с данными шаблона подключаемых файлов
                    return {
                        id: template.id,
                        name: templateName,
                        content: template.content
                    };
                });
                // Установка шаблонов подключаемых файлов в Хранилище
                dispatch(sitesActions.setTemplates(preparedTemplates));
            });
        };
    },
    // Установка id выбранного шаблона сайта
    setCurrentSiteTemplateId(payload) {
        return {
            type: StoreSitesTypes.SET_CURRENT_SITE_TEMPLATE_ID,
            payload
        };
    },
    // Установка массива шаблонов сайта
    setTemplates(payload) {
        return {
            type: StoreSitesTypes.SET_SITE_TEMPLATES,
            payload
        };
    },
    // ПАПКИ С КОМПОНЕНТАМИ ==================================================================================
    requestCompFolder() {
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function* () {
                const { currentSiteId } = getState().sites;
                // Запрос к серверу на получение кода папки с компонентами
                const response = yield getCompFolderRequest(currentSiteId);
                if (response.status !== 'success')
                    return;
                let foldersData = response.data.compFolders[0];
                if (foldersData && foldersData.content) {
                    const openedFoldersIds = getOpenedFoldersIds('components');
                    if (openedFoldersIds) {
                        foldersData.content = addOpenPropToFolders(foldersData.content, openedFoldersIds);
                    }
                    // id последней выбранной папки или компонента из LocalStorage
                    const editorComponentId = getFromLocalStorage(config.ls.editorComponentId);
                    // Выделить элемент, который должен быть выделен
                    foldersData.content = selectItem(foldersData.content, editorComponentId).newItems;
                }
                // Установка папки с компонентами в Хранилище
                dispatch(sitesActions.setCompFolder({
                    id: foldersData.id,
                    folders: foldersData.content
                }));
            });
        };
    },
    // Установка папки компонентов
    setCompFolder(payload) {
        return {
            type: StoreSitesTypes.SET_COMP_FOLDER,
            payload
        };
    },
    // ПАПКИ СО СТАТЬЯМИ ==================================================================================
    requestArtFolder() {
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function* () {
                const { currentSiteId } = getState().sites;
                // Запрос к серверу на получение кода папки со статьями
                const response = yield getArtFolderRequest(currentSiteId);
                if (response.status !== 'success')
                    return;
                let foldersData = response.data.artFolders[0];
                if (foldersData && foldersData.content) {
                    const openedFoldersIds = getOpenedFoldersIds('articles');
                    if (openedFoldersIds) {
                        foldersData.content = addOpenPropToFolders(foldersData.content, openedFoldersIds);
                    }
                    // id последней выбранной папки или компонента из LocalStorage
                    const editorArticleId = getFromLocalStorage(config.ls.editorArticleId);
                    // Выделить элемент, который должен быть выделен
                    foldersData.content = selectItem(foldersData.content, editorArticleId).newItems;
                }
                // Установка папки с компонентами в Хранилище
                dispatch(sitesActions.setArtFolder({
                    id: foldersData.id,
                    folders: foldersData.content
                }));
            });
        };
    },
    // Установка папки со статьями
    setArtFolder(payload) {
        return {
            type: StoreSitesTypes.SET_ART_FOLDER,
            payload: payload
        };
    },
    // КОМПОНЕНТЫ ==================================================================================
    // Загрузка с сервера шаблона компонента и установка в Хранилище
    requestComponentTemplate() {
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function* () {
                // id выбранного шаблона компонента, данные которого нужно скачать
                const { currentCompItemId } = store.getState().sites.componentSection;
                // Если id компонента не передан, то обнулить данные компонета в Хранилище
                if (!currentCompItemId)
                    dispatch(sitesActions.setCurrentComp(null, null));
                // Запрос и ответ от сервера
                const response = yield getComponentRequest(currentCompItemId);
                if (response.status !== 'success')
                    return;
                const responseData = response.data.components[0];
                if (!responseData) {
                    dispatch(sitesActions.setCurrentComp(responseData.id, 'file'));
                }
                const compData = responseData.content;
                const compDataParsed = JSON5.parse(responseData.content);
                // Установка данных шаблона компонента в Хранилище
                dispatch(sitesActions.setCurrentComp(responseData.id, 'file', compDataParsed.name, compData));
            });
        };
    },
    // Установка id и типа выбранного шаблона компонента
    setCurrentComp(id, type, name, code) {
        return {
            type: StoreSitesTypes.SET_CURRENT_COMP,
            payload: {
                id,
                type,
                name,
                code
            }
        };
    },
    // СТАТЬИ ======================================================================================
    // Загрузка с сервера статьи и установка в Хранилище
    requestArticle() {
        return function (dispatch, getState) {
            return __awaiter(this, void 0, void 0, function* () {
                // id выбранной статьи, данные которой нужно скачать
                const { currentArtItemId } = getState().sites.articleSection;
                // Если id статьи не передан, то обнулить данные статьи в Хранилище
                if (!currentArtItemId)
                    dispatch(sitesActions.setCurrentArt(null, null));
                // Запрос и ответ от сервера
                const response = yield getArticleRequest(currentArtItemId);
                if (response.status !== 'success')
                    return;
                const articleData = response.data.articles[0];
                if (articleData) {
                    dispatch(sitesActions.setCurrentArt(articleData.id, 'file', articleData.name, articleData.content, articleData.siteTemplateId));
                }
            });
        };
    },
    // Установка id и типа выбранной статьи
    setCurrentArt(id, type, name, code, siteTemplateId) {
        return {
            type: StoreSitesTypes.SET_CURRENT_ART,
            payload: {
                id,
                type,
                name,
                code,
                siteTemplateId
            }
        };
    },
};
export default sitesActions;
//# sourceMappingURL=sitesActions.js.map
//# sourceMappingURL=sitesActions.js.map
//# sourceMappingURL=sitesActions.js.map