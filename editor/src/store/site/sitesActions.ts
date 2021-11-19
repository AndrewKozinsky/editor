import JSON5 from 'json5'
import StoreSitesTypes from './sitesTypes'
import { MiscTypes } from 'types/miscTypes'
import { store } from 'store/rootReducer'
import sitesRequest from 'requests/editor/sites/sitesRequest'
import getSiteTemplatesRequest from 'requests/editor/siteTemplate/getSiteTemplatesRequest'
import { getCompFolderRequest } from 'requests/editor/compFolders/getCompFolderRequest'
import { getArtFolderRequest } from 'requests/editor/artFolders/getArtFolderRequest'
import DragFilesTreeType from 'libs/DragFilesTree/types'
import { addOpenPropToFolders, selectItem } from 'libs/DragFilesTree/StoreManage/manageState'
import { getOpenedFoldersIds } from 'editor/RightPart-1/ComponentsOrArticles/FoldersList/FoldersList-func'
import config from 'utils/config'
import { getFromLocalStorage } from 'utils/MiscUtils'


const sitesActions = {

    // САЙТЫ =====================================================================================

    // Загрузка сайтов с сервера и установка в Хранилище
    requestSites() {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            // Запрос на получение списка сайтов
            const response = await sitesRequest()

            if (!response || response.status !== 'success') return

            // Формированое массива сайтов для установки в Хранилище
            const preparedSites = response.data.sites.map((site: any) => {
                return {
                    id: site.id,
                    name: site.name,
                    defaultSiteTemplateId: site.defaultSiteTemplateId || null
                }
            })

            // Установка сайтов в Хранилище
            dispatch( sitesActions.setSites(preparedSites) )
        }
    },

    // Установка массива сайтов
    setSites(payload: StoreSitesTypes.SitesType): StoreSitesTypes.SetSitesAction {
        return {
            type: StoreSitesTypes.SET_SITES,
            payload
        }
    },

    // Установка id выбранного сайта
    setCurrentSiteId(payload: StoreSitesTypes.CurrentSiteId): StoreSitesTypes.SetCurrentSiteIdAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_SITE_ID,
            payload
        }
    },

    // ПРАВЫЕ ВКЛАДКИ ==================================================================================

    // Установка id текущей основной вкладки справа
    setRightMainTab(payload: StoreSitesTypes.RightMainTab): StoreSitesTypes.SetRightMainTabAction {
        return {
            type: StoreSitesTypes.SET_RIGHT_MAIN_TAB,
            payload
        }
    },

    // ШАБЛОНЫ ПОДКЛЮЧАЕМЫХ ФАЙЛОВ ==================================================================================

    // Загрузка с сервера шаблонов сайта и установка в Хранилище
    requestSiteTemplates() {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {

            // id текущего сайта для которого нужно получить шаблоны
            const siteId = store.getState().sites.currentSiteId

            // Если не передан id сайта, то обнулить массив шаблонов сайта
            // потому что выбрали новый сайт
            if (!siteId) dispatch( sitesActions.setTemplates([]) )

            // Запрос и ответ от сервера
            const response = await getSiteTemplatesRequest(siteId)

            if (response.status !== 'success') return

            // Формированое массива шаблонов для установки в Хранилище
            const preparedTemplates = response.data.siteTemplates.map(template => {
                let templateName = JSON5.parse(template.content).name

                // Формирование возвращаемого объекта с данными шаблона подключаемых файлов
                return  {
                    id: template.id,
                    name: templateName,
                    content: template.content
                }
            })

            // Установка шаблонов подключаемых файлов в Хранилище
            dispatch( sitesActions.setTemplates(preparedTemplates) )
        }
    },

    // Установка id выбранного шаблона сайта
    setCurrentSiteTemplateId(payload: StoreSitesTypes.CurrentSiteTemplateId): StoreSitesTypes.SetCurrentSiteTemplateIdAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_SITE_TEMPLATE_ID,
            payload
        }
    },

    // Установка массива шаблонов сайта
    setTemplates(payload: StoreSitesTypes.SiteTemplatesType): StoreSitesTypes.SetSiteTemplatesAction {
        return {
            type: StoreSitesTypes.SET_SITE_TEMPLATES,
            payload
        }
    },

    // ПАПКИ С КОМПОНЕНТАМИ ==================================================================================

    requestCompFolder() {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            const { currentSiteId } = getState().sites

            // Запрос к серверу на получение кода папки с компонентами
            const response = await getCompFolderRequest(currentSiteId)
            if (response.status !== 'success') return

            let foldersData = response.data.compFolders[0]

            if (foldersData) {
                const openedFoldersIds = getOpenedFoldersIds('components')
                if (openedFoldersIds) {
                    foldersData.content = addOpenPropToFolders(foldersData.content, openedFoldersIds)
                }

                // id последней выбранной папки или компонента из LocalStorage
                const editorComponentId = getFromLocalStorage(config.ls.editorComponentId)
                // Выделить элемент, который должен быть выделен
                foldersData.content = selectItem(foldersData.content, editorComponentId).newItems
            }

            // Установка папки с компонентами в Хранилище
            dispatch( sitesActions.setCompFolder({
                id: foldersData.id,
                folders: foldersData.content
            }) )
        }
    },

    // Установка папки компонентов
    setCompFolder(payload: StoreSitesTypes.SetCompFolderActionPayload): StoreSitesTypes.SetCompFolderAction {
        return {
            type: StoreSitesTypes.SET_COMP_FOLDER,
            payload
        }
    },

    // ПАПКИ СО СТАТЬЯМИ ==================================================================================

    requestArtFolder() {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            const { currentSiteId } = getState().sites

            // Запрос к серверу на получение кода папки со статьями
            const response = await getArtFolderRequest(currentSiteId)
            if (response.status !== 'success') return

            let foldersData = response.data.artFolders[0]

            if (foldersData) {
                const openedFoldersIds = getOpenedFoldersIds('articles')
                if (openedFoldersIds) {
                    foldersData.content = addOpenPropToFolders(foldersData.content, openedFoldersIds)
                }

                // id последней выбранной папки или компонента из LocalStorage
                const editorArticleId = getFromLocalStorage(config.ls.editorArticleId)
                // Выделить элемент, который должен быть выделен
                foldersData.content = selectItem(foldersData.content, editorArticleId).newItems
            }

            // Установка папки с компонентами в Хранилище
            dispatch( sitesActions.setArtFolder({
                id: foldersData.id,
                folders: foldersData.content
            }) )
        }
    },

    // Установка папки статей
    setArtFolder(payload: StoreSitesTypes.SetArtFolderActionPayload): StoreSitesTypes.SetArtFolderAction {
        return {
            type: StoreSitesTypes.SET_ART_FOLDER,
            payload: payload
        }
    },

    // КОМПОНЕНТЫ ==================================================================================

    // Установка id и типа выбранного шаблона компонента
    setCurrentComp(
        id: null | DragFilesTreeType.Id,
        type: null | DragFilesTreeType.ItemType,
        name?: string,
        code?: string
    ): StoreSitesTypes.SetCurrentCompAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_COMP,
            payload: {
                id,
                type,
                name,
                code
            }
        }
    },

    // СТАТЬИ ======================================================================================

    // Установка id и типа выбранного шаблона компонента
    setCurrentArt(
        id: null | DragFilesTreeType.Id,
        type: null | DragFilesTreeType.ItemType,
        name?: string,
        code?: string,
        siteTemplateId?: null | number
    ): StoreSitesTypes.SetCurrentArtAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_ART,
            payload: {
                id,
                type,
                name,
                code,
                siteTemplateId
            }
        }
    },









    // Загрузка с сервера шаблона компонента и установка в Хранилище
    /*requestComponentTemplate() {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {

            // uuid выбранного шаблона компонента, данные которого нужно скачать
            const {currentCompItemId} = store.getState().sites.componentsSection

            // Если uuid компонента не передан, то обнулить данные компонета в Хранилище
            if (!currentCompItemId) dispatch( sitesActions.setCurrentComp(null, null) )

            // Запрос и ответ от сервера
            const response = await getComponentRequest(currentCompItemId)

            if (response.status !== 'success') return
            const compData = response.data.component

            if (compData) {
                // Установка данных шаблона компонента в Хранилище
                dispatch( sitesActions.setCurrentComp(compData.uuid, 'file', compData) )
            }
        }
    },*/

    // Component Template item (folder or file) type setting
    /*setCurrentCompItemType(payload: StoreSitesTypes.CurrentCompItemType): StoreSitesTypes.SetCurrentCompItemTypeAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_COMP_ITEM_TYPE,
            payload
        }
    },*/

    // Component Template item id setting
    /*setCurrentCompItemId(payload: StoreSitesTypes.CurrentCompItemId): StoreSitesTypes.SetCurrentCompItemIdAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_COMP_ITEM_ID,
            payload
        }
    },*/



    // Загрузка с сервера шаблона компонента и установка в Хранилище
    /*requestArticle() {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {

            // uuid выбранной статьи, данные которой нужно скачать
            const {currentArtItemId} = getState().sites.articlesSection

            // Если uuid статьи не передан, то обнулить данные статьи в Хранилище
            if (!currentArtItemId) dispatch( sitesActions.setCurrentArt(null, null) )

            // Запрос и ответ от сервера
            const response = await getArticleRequest(currentArtItemId)

            if (response.status !== 'success') return
            const articleData = response.data.article

            if (articleData) {
                dispatch( sitesActions.setCurrentArt(articleData.uuid, 'file', articleData) )
            }
        }
    },*/

    // Article item (folder or file) type setting
    /*setCurrentArtItemType(payload: StoreSitesTypes.CurrentArtItemType): StoreSitesTypes.SetCurrentArtItemTypeAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_ART_ITEM_TYPE,
            payload
        }
    },*/

    // Article item (folder or file) type setting
    /*setCurrentArtItemId(payload: StoreSitesTypes.CurrentArtItemId): StoreSitesTypes.SetCurrentArtItemIdAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_ART_ITEM_ID,
            payload
        }
    },*/
}

export default sitesActions
