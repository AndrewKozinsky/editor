const JSON5 = require('json5')
import MetaType from 'editor/RightPart-1/ArticleSection/ArtForm/Meta/MetaType'
import getMetaTemplateRequest from '../../requests/editor/metaTemplate/getMetaTemplateRequest'
import FilesTreeType from '../../types/FilesTreeType'
import StoreSitesTypes  from './sitesTypes'
import { MiscTypes } from 'types/miscTypes'
import sitesRequest from 'requests/editor/sites/sitesRequest'
import getSiteTemplatesRequest from 'requests/editor/siteTemplate/getSiteTemplatesRequest'
import { getCompFolderRequest } from 'requests/editor/compFolders/getCompFolderRequest'
import { getArtFolderRequest } from 'requests/editor/artFolders/getArtFolderRequest'
import getComponentRequest from 'requests/editor/components/getComponentRequest'
import { getOpenedFoldersIds } from 'editor/RightPart-1/FoldersList/FoldersList-func'
import TempCompTypes from '../article/codeType/tempCompCodeType'
import getArticleRequest from 'requests/editor/article/getArticleRequest'
import ArticleTypes from '../article/codeType/articleCodeType'
import getMetaTemplatesRequest from 'requests/editor/metaTemplate/getMetaTemplatesRequest'
import localStorageProxyActions from '../localStorageProxy/localStorageProxyActions'
import { getState } from 'utils/miscUtils'
import { addOpenPropToFolders, selectItem } from 'libs/DragFilesTree/StoreManage/manageState'


const sitesActions = {

    // САЙТЫ =====================================================================================

    // Загрузка сайтов с сервера и установка в Хранилище
    requestSites() {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            // Запрос на получение списка сайтов
            const response = await sitesRequest()

            if (!response || response.status !== 'success') {
                dispatch( sitesActions.setCurrentSiteIdOuter(null) )
                return
            }

            // Формирование массива сайтов для установки в Хранилище
            const preparedSites = response.data.sites.map((site: any) => {
                return {
                    id: site.id,
                    name: site.name,
                    defaultSiteTemplateId: site.defaultSiteTemplateId || null,
                    defaultMetaTemplateId: site.defaultMetaTemplateId || null
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

    // Установка id выбранного сайта (обёрточный экшен)
    setCurrentSiteIdOuter(groupId: StoreSitesTypes.CurrentSiteId) {
        return function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            // Поставить id выбранной группы в Store.localStorageProxy чтобы это сохранилось в LocalStorage
            dispatch( localStorageProxyActions.setCommon({propName: 'groupId', propValue: groupId }))
            // Установка темы интерфейса
            dispatch( sitesActions.setCurrentSiteId( groupId ))
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

    // Установка id текущей вкладки справа в Группе (обёрточный экшен)
    setRightMainTabOuter(tabId: StoreSitesTypes.RightMainTab) {
        return function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            // Поставить id выбранной правой вкладки в группе в Store.localStorageProxy чтобы это сохранилось в LocalStorage
            dispatch( localStorageProxyActions.setCommon({propName: 'groupPartTab', propValue: tabId }))
            // Установка темы интерфейса
            dispatch( sitesActions.setRightMainTab( tabId ))
        }
    },

    // Установка id текущей вкладки справа в Группе
    setRightMainTab(payload: StoreSitesTypes.RightMainTab): StoreSitesTypes.SetRightMainTabAction {
        let rightMainTabNum = payload
        if (rightMainTabNum < 0 || rightMainTabNum > 4) rightMainTabNum = 0

        return {
            type: StoreSitesTypes.SET_RIGHT_MAIN_TAB,
            payload: rightMainTabNum
        }
    },

    // ШАБЛОНЫ ПОДКЛЮЧАЕМЫХ ФАЙЛОВ ==================================================================================

    // Загрузка с сервера шаблонов сайта и установка в Хранилище
    requestSiteTemplates() {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            // id текущего сайта для которого нужно получить шаблоны
            const siteId: StoreSitesTypes.CurrentSiteId = getState().sites.currentSiteId

            // Если не передан id сайта, то обнулить массив шаблонов сайта
            // потому что выбрали новый сайт
            if (!siteId) {
                dispatch( sitesActions.setSiteTemplates([]) )
                return
            }

            // Запрос и ответ от сервера
            const response = await getSiteTemplatesRequest(siteId)

            if (response.status !== 'success') return

            // Формирование массива шаблонов для установки в Хранилище
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
            dispatch( sitesActions.setSiteTemplates(preparedTemplates) )
        }
    },

    // Установка id выбранного шаблона сайта (обёрточный экшен)
    setCurrentSiteTemplateIdOuter(groupId: StoreSitesTypes.CurrentSiteId, groupTemplateId: StoreSitesTypes.CurrentSiteTemplateId) {
        return function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {

            // Поставить id выбранной правой вкладки в группе в Store.localStorageProxy чтобы это сохранилось в LocalStorage
            dispatch( localStorageProxyActions.setGroup({groupId: groupId, propName: 'groupTemplateId', propValue: groupTemplateId }))
            // Установка темы интерфейса
            dispatch( sitesActions.setCurrentSiteTemplateId( groupTemplateId ))
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
    setSiteTemplates(payload: StoreSitesTypes.SiteTemplatesType): StoreSitesTypes.SetSiteTemplatesAction {
        return {
            type: StoreSitesTypes.SET_SITE_TEMPLATES,
            payload
        }
    },


    // ШАБЛОНЫ МЕТАДАННЫХ ==================================================================================

    // Загрузка с сервера шаблонов метаданных и установка в Хранилище
    requestMetaTemplates() {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            // id текущего сайта для которого нужно получить шаблоны метаданных
            const siteId: StoreSitesTypes.CurrentSiteId = getState().sites.currentSiteId

            // Если не передан id сайта, то обнулить массив шаблонов метаданных
            // потому что выбрали новый сайт
            if (!siteId) {
                dispatch( sitesActions.setMetaTemplates([]) )
                return
            }

            // Запрос и ответ от сервера
            const response = await getMetaTemplatesRequest(siteId)

            if (response.status !== 'success') return

            // Формирование массива шаблонов для установки в Хранилище
            const preparedTemplates = response.data.metaTemplates.map(template => {
                let templateName = JSON5.parse(template.content).name

                // Формирование возвращаемого объекта с данными шаблона подключаемых файлов
                return  {
                    id: template.id,
                    name: templateName,
                    content: template.content
                }
            })

            // Установка шаблонов метаданных в Хранилище
            dispatch( sitesActions.setMetaTemplates(preparedTemplates) )
        }
    },

    // Установка массива шаблонов метаданных
    setMetaTemplates(payload: StoreSitesTypes.MetaTemplatesType): StoreSitesTypes.SetMetaTemplatesAction {
        return {
            type: StoreSitesTypes.SET_META_TEMPLATES,
            payload
        }
    },

    // Установка id выбранного шаблона сайта (обёрточный экшен)
    setCurrentMetaTemplateIdOuter(groupId: StoreSitesTypes.CurrentSiteId, groupMetaId: StoreSitesTypes.CurrentMetaTemplateId) {
        return function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {

            // Поставить id выбранной правой вкладки в группе в Store.localStorageProxy чтобы это сохранилось в LocalStorage
            dispatch( localStorageProxyActions.setGroup({groupId: groupId, propName: 'metaTemplateId', propValue: groupMetaId }))
            // Установка темы интерфейса
            dispatch( sitesActions.setCurrentMetaTemplateId( groupMetaId ))
        }
    },

    // Установка id выбранного шаблона сайта
    setCurrentMetaTemplateId(payload: StoreSitesTypes.CurrentMetaTemplateId): StoreSitesTypes.SetCurrentMetaTemplateIdAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_META_TEMPLATE_ID,
            payload
        }
    },


    // ПАПКИ С КОМПОНЕНТАМИ ==================================================================================

    requestCompFolder() {
        return async function (dispatch: MiscTypes.AppDispatch, getStateThis: MiscTypes.GetState) {
            const { currentSiteId } = getState().sites

            if (typeof currentSiteId !== 'number') return

            // Запрос к серверу на получение кода папки с компонентами
            const response = await getCompFolderRequest(currentSiteId)
            if (response.status !== 'success') return

            // Данные по папкам
            let foldersData = response.data.compFolders[0]

            // Если есть папки
            if (foldersData && foldersData.content) {
                // Получить id открытых папок
                const openedFoldersIds = getOpenedFoldersIds('components')
                if (openedFoldersIds) {
                    // Открыть папки id которых перечислены в openedFoldersIds
                    //@ts-ignore
                    foldersData.content = addOpenPropToFolders(foldersData.content, openedFoldersIds)
                }

                // id последней выбранной папки или компонента из LocalStorage
                const editorComponentId = getState().sites.componentSection.currentCompItemId
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

    // Установка массива папок с компонентами
    setCompFolder(payload: StoreSitesTypes.SetCompFolderActionPayload): StoreSitesTypes.SetCompFolderAction {
        return {
            type: StoreSitesTypes.SET_COMP_FOLDER,
            payload
        }
    },

    // ПАПКИ СО СТАТЬЯМИ ==================================================================================

    requestArtFolder() {
        return async function (dispatch: MiscTypes.AppDispatch, getStateThis: MiscTypes.GetState) {
            const { currentSiteId } = getState().sites

            if (typeof currentSiteId !== 'number') return

            // Запрос к серверу на получение кода папки со статьями
            const response = await getArtFolderRequest(currentSiteId)
            if (response.status !== 'success') return

            let foldersData = response.data.artFolders[0]

            if (foldersData && foldersData.content) {
                const openedFoldersIds = getOpenedFoldersIds('articles')
                if (openedFoldersIds) {
                    //@ts-ignore
                    foldersData.content = addOpenPropToFolders(foldersData.content, openedFoldersIds)
                }

                // id последней выбранной папки или компонента из LocalStorage
                const editorArticleId = getState().sites.articleSection.currentArtItemId
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

    // Установка папки со статьями
    setArtFolder(payload: StoreSitesTypes.SetArtFolderActionPayload): StoreSitesTypes.SetArtFolderAction {
        return {
            type: StoreSitesTypes.SET_ART_FOLDER,
            payload: payload
        }
    },

    // КОМПОНЕНТЫ ==================================================================================

    // Загрузка с сервера шаблона компонента и установка в Хранилище
    requestComponentTemplate() {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {

            const { currentSiteId } = getState().sites

            // id выбранного шаблона компонента, данные которого нужно скачать
            const { currentCompItemId } = getState().sites.componentSection

            // Если id компонента не передан, то обнулить данные компонента в Хранилище
            if (!currentCompItemId) {
                dispatch( sitesActions.setCurrentCompOuter(currentSiteId, null, null) )
                return
            }

            // Запрос и ответ от сервера
            const response = await getComponentRequest(currentCompItemId)

            if (response.status !== 'success') {
                dispatch( sitesActions.setCurrentCompOuter(currentSiteId, null, null) )
                return
            }

            const responseData = response.data.components[0]

            if (!responseData) {
                // Зачем в Хранилище ставится id шаблона компонента и тип file?
                dispatch( sitesActions.setCurrentCompOuter(currentSiteId, responseData.id, 'file') )
                return
            }

            const compData = responseData.content
            const compDataParsed: TempCompTypes.Content = JSON5.parse(responseData.content)

            // Имя компонента равняется имени корневого тега компонента
            const compName = compDataParsed.elems[0].elemName

            // Установка данных шаблона компонента в Хранилище
            dispatch( sitesActions.setCurrentCompOuter(
                currentSiteId, responseData.id, 'file', compName, compData
            ))
        }
    },

    // Установка id и типа выбранного шаблона компонента (шаблон или папка) (обёрточный экшен)
    setCurrentCompOuter(
        groupId: StoreSitesTypes.CurrentSiteId,
        componentId: StoreSitesTypes.CurrentCompItemId,
        componentType: StoreSitesTypes.CurrentCompItemType,
        name?: string,
        code?: string
    ) {
        return function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {

            // Поставить id выбранного компонента в группе в Store.localStorageProxy чтобы это сохранилось в LocalStorage
            dispatch( localStorageProxyActions.setGroup({groupId: groupId, propName: 'componentId', propValue: componentId }))
            // Поставить тип выбранного компонента (файл или папка) в группе в Store.localStorageProxy чтобы это сохранилось в LocalStorage
            dispatch( localStorageProxyActions.setGroup({groupId: groupId, propName: 'componentType', propValue: componentType }))

            // Установка текущего компонента
            dispatch( sitesActions.setCurrentComp( componentId, componentType, name, code ))
        }
    },

    // Установка id и типа выбранного шаблона компонента (шаблон или папка)
    setCurrentComp(
        id: null | FilesTreeType.ItemId,
        type: null | FilesTreeType.ItemType,
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

    // Загрузка с сервера статьи и установка в Хранилище
    requestArticle() {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            const { currentSiteId } = getState().sites

            // id выбранной статьи, данные которой нужно скачать
            const { currentArtItemId } = getState().sites.articleSection

            // Если id статьи не передан, то обнулить данные статьи в Хранилище
            if (!currentArtItemId) dispatch( sitesActions.setCurrentArtOuter(currentSiteId, null, null) )

            // Запрос и ответ от сервера
            const response = await getArticleRequest(currentArtItemId)

            if (response.status !== 'success') return
            const articleData = response.data.articles[0]

            if (articleData) {
                dispatch( sitesActions.setCurrentArtOuter(
                    currentSiteId,
                    articleData.id,
                    'file',
                    articleData.name,
                    articleData.content,
                    articleData.siteTemplateId,
                    articleData.metaTemplateId,
                    articleData.meta
                ))
            }
        }
    },

    // Установка id и типа выбранной статьи (статья или папка) (обёрточный экшен)
    setCurrentArtOuter(
        groupId: StoreSitesTypes.CurrentSiteId,
        artId: null | FilesTreeType.ItemId,
        artType: null | FilesTreeType.ItemType,
        artName?: string,
        artCode?: ArticleTypes.Article,
        siteTemplateId?: StoreSitesTypes.CurrentSiteTemplateId,
        metaTemplateId?: StoreSitesTypes.CurrentMetaTemplateId,
        meta?: null | MetaType.Items
    ) {
        return function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {

            // Поставить id выбранного компонента в группе в Store.localStorageProxy чтобы это сохранилось в LocalStorage
            dispatch( localStorageProxyActions.setGroup({groupId: groupId, propName: 'articleId', propValue: artId }))
            // Поставить тип выбранного компонента (файл или папка) в группе в Store.localStorageProxy чтобы это сохранилось в LocalStorage
            dispatch( localStorageProxyActions.setGroup({groupId: groupId, propName: 'articleType', propValue: artType }))

            // Установка текущего компонента
            dispatch( sitesActions.setCurrentArt( artId, artType, artName, artCode, siteTemplateId, metaTemplateId, meta ))
        }
    },

    // Установка id и типа выбранной статьи (статья или папка)
    setCurrentArt(
        artId: null | FilesTreeType.ItemId,
        artType: null | FilesTreeType.ItemType,
        artName?: string,
        artCode?: ArticleTypes.Article,
        siteTemplateId?: StoreSitesTypes.CurrentSiteTemplateId,
        metaTemplateId?: StoreSitesTypes.CurrentMetaTemplateId,
        meta?: null | MetaType.Items
    ): StoreSitesTypes.SetCurrentArtAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_ART,
            payload: {
                id: artId,
                type: artType,
                name: artName,
                code: artCode,
                siteTemplateId,
                metaTemplateId,
                meta,
            }
        }
    },

    setArticleMetaTemplateId(
        id: StoreSitesTypes.CurrentMetaTemplateId
    ): StoreSitesTypes.SetArticleMetaTemplateIdAction {
        return {
            type: StoreSitesTypes.SET_ARTICLE_META_TEMPLATE_ID,
            payload: id
        }
    },

    // Загрузка с сервера шаблона метаданных и установка в store.sites.articleSection.meta
    requestArticleMetaTemplate(metaTempId: StoreSitesTypes.CurrentMetaTemplateId) {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            // Если id шаблона метаданных null, то обнулить данные в store.sites.articleSection.meta
            if (!metaTempId) {
                dispatch( sitesActions.setArticleMeta(null) )
                return
            }

            // Запрос и ответ от сервера
            const response = await getMetaTemplateRequest(metaTempId)
            if (response.status !== 'success' || !response.data.metaTemplates[0]) {
                dispatch( sitesActions.setArticleMeta(null) )
                return
            }

            // Установка шаблона метаданных в Хранилище
            const preparedTemplate: MetaType.MetaTemplate = JSON5.parse(response.data.metaTemplates[0].content)
            dispatch( sitesActions.setArticleMeta(preparedTemplate.items) )
        }
    },

    // Установка разобранных данных в store.sites.articleSection.meta
    setArticleMeta(
        meta: null | MetaType.Items
    ): StoreSitesTypes.SetArticleMetaAction {
        return {
            type: StoreSitesTypes.SET_ARTICLE_META,
            payload: meta
        }
    }
}

export default sitesActions
