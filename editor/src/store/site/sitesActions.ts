import JSON5 from 'json5'
import StoreSitesTypes from './sitesTypes'
import { MiscTypes } from 'types/miscTypes'
import { store } from 'store/rootReducer'
import sitesRequest from 'requests/editor/sites/sitesRequest'
import getSiteTemplatesRequest from 'requests/editor/siteTemplate/getSiteTemplatesRequest'
import { getCompFolderRequest } from 'requests/editor/compFolders/getCompFolderRequest'
import {addOpenPropToFolders, selectItem} from 'libs/DragFilesTree/StoreManage/manageState'
import { CompFolderType } from 'requests/editor/compFolders/compFolderServerResponseType'
import DragFilesTreeType from '../../libs/DragFilesTree/types'
import { getOpenedFoldersId } from '../../libs/DragFilesTree/StoreManage/manageState'
import filesTreePublicMethods from '../../libs/DragFilesTree/publicMethods'
import {getOpenedFoldersIds} from '../../editor/RightPart-1/ComponentsOrArticles/FoldersList/FoldersList-func'
import {getFromLocalStorage} from '../../utils/MiscUtils'
// import getArticleRequest, {ArticleDataType} from 'requests/editor/article/getArticleRequest'
// import getComponentRequest, { ComponentDataType } from 'requests/editor/components/getComponentRequest'
// import FilesTreeType from '../../types/filesTree'


const sitesActions = {
    // Установка id текущей основной вкладки справа
    setRightMainTab(payload: StoreSitesTypes.RightMainTab): StoreSitesTypes.SetRightMainTabAction {
        return {
            type: StoreSitesTypes.SET_RIGHT_MAIN_TAB,
            payload
        }
    },


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


    // ШАБЛОНЫ ПОДКЛЮЧАЕМЫХ ФАЙЛОВ ===========================================================================

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

    // Установка массива шаблонов сайта
    setTemplates(payload: StoreSitesTypes.SiteTemplatesType): StoreSitesTypes.SetSiteTemplatesAction {
        return {
            type: StoreSitesTypes.SET_SITE_TEMPLATES,
            payload
        }
    },

    // Установка id выбранного шаблона сайта
    setCurrentSiteTemplateId(payload: StoreSitesTypes.CurrentSiteTemplateId): StoreSitesTypes.SetCurrentSiteTemplateIdAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_SITE_TEMPLATE_ID,
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

            const compFolderObj: StoreSitesTypes.CompFolderActionPayload = {
                compFolderId: response.data.compFolders[0].id,
                compFolder: null
            }

            let foldersData = response.data.compFolders[0].content

            const openedFoldersIds = getOpenedFoldersIds('components')
            if (openedFoldersIds) {
                foldersData = addOpenPropToFolders(foldersData, openedFoldersIds)
            }

            // id последней выбранной папки или компонента из LocalStorage
            const editorComponentId = getFromLocalStorage('editorComponentId')

            // Выделить элемент, который должен быть выделен
            foldersData = selectItem(foldersData, editorComponentId).newItems

            compFolderObj.compFolder = foldersData


            // Установка папки с компонентами в Хранилище
            dispatch( sitesActions.setCompFolder(compFolderObj) )
        }
    },

    // Установка папки компонентов
    setCompFolder(payload: StoreSitesTypes.CompFolderActionPayload): StoreSitesTypes.SetCompFolderAction {
        return {
            type: StoreSitesTypes.SET_COMP_FOLDER,
            payload: payload
        }
    },


    // ШАБЛОНЫ КОМПОНЕНТОВ ==================================================================================

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

    // Установка id и типа выбранного шаблона компонента
    setCurrentComp(
        id: null | DragFilesTreeType.Id,
        type: null | DragFilesTreeType.ItemType,
        // compData?: ComponentDataType
    ): StoreSitesTypes.SetCurrentCompAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_COMP,
            payload: {
                id,
                type,
                // compData
            }
        }
    },

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


    // ПАПКИ С КОМПОНЕНТАМИ ==================================================================================



    // СТАТЬИ ======================================================================================

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

    // Установка id и типа выбранного шаблона компонента
    /*setCurrentArt(
        id: null | FilesTreeType.Id,
        type: null | FilesTreeType.ItemType,
        article?: ArticleDataType
    ): StoreSitesTypes.SetCurrentArtAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_ART,
            payload: {
                id,
                type,
                article
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





const config = {
    name: 'Стандартные стили',
    head: [
        '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">',
        '<meta http-equiv="x-rim-auto-match" content="none">',
        '<script type="text/javascript" async="" id="mtsadv-counter" src="https://tech.rtb.mts.ru/js/sync.js"></script>'
    ],
    bodyEnd: [
        '<script async="" src="https://connect.facebook.net/en_US/fbevents.js"></script>',
        '<script type="text/javascript" async="" id="mtsadv-counter" src="https://tech.rtb.mts.ru/js/sync.js"></script>'
    ]
}