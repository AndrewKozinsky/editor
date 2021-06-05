// Types
import StoreSitesTypes from './sitesTypes'
import {MiscTypes} from 'types/miscTypes'
import {makeFetch} from 'requests/fetch'
import getApiUrl from 'requests/apiUrls'
import store from '../store';
import FilesTreeType from 'libs/FilesTree/types';


const sitesActions = {

    // Загрузка сайтов с сервера и установка в Хранилище
    requestSites() {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {
            // Параметры запроса
            const options = { method: 'GET'}

            // Запрос и ответ от сервера
            const response = await makeFetch(
                getApiUrl('sites'), options, getState().settings.editorLanguage
            )

            if (!response || response.status !== 'success') return

            // Формированое массива сайтов для установки в Хранилище
            const preparedSites = response.data.sites.map((site: any) => {
                return {
                    id: site._id,
                    name: site.name,
                    defaultIncFilesTemplateId: site.defaultIncFilesTemplateId || null
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

    // Установка id текущей основной вкладки справа
    setRightMainTab(payload: StoreSitesTypes.RightMainTab): StoreSitesTypes.SetRightMainTabAction {
        return {
            type: StoreSitesTypes.SET_RIGHT_MAIN_TAB,
            payload
        }
    },


    // Загрузка с сервера шаблонов подлючаемых файлова и установка в Хранилище
    requestIncFilesTemplates() {
        return async function (dispatch: MiscTypes.AppDispatch, getState: MiscTypes.GetState) {

            // id текущего сайта для которого нужно получить шаблоны подключаемых файлов
            const siteId = store.getState().sites.currentSiteId

            // Если не передан id сайта, то обнулить массив шаблонов подключаемых файлов в Хранилище
            // потому что выбрали новый сайт
            if (!siteId) dispatch( sitesActions.setTemplates([]) )

            // Параметры запроса
            const options = { method: 'GET' }

            // Запрос и ответ от сервера
            const response = await makeFetch(
                // id сайта передаётся в параметре siteId
                getApiUrl('incFilesTemplates') + '?' + new URLSearchParams({siteId}),
                options, getState().settings.editorLanguage
            )

            if (!response || response.status !== 'success') return

            // Формированое массива шаблонов для установки в Хранилище
            const preparedTemplates = response.data.templates.map((template: any) => {
                // Формирование возвращаемого объекта с данными шаблона подключаемых файлов
                return  {
                    id: template._id,
                    name: template.name,
                    head: template.codeInHead?.code || '',
                    body: template.codeBeforeEndBody?.code || ''
                }
            })

            // Установка шаблонов подключаемых файлов в Хранилище
            dispatch( sitesActions.setTemplates(preparedTemplates) )
        }
    },

    // Установка массива шаблонов подключаемых файлов
    setTemplates(payload: StoreSitesTypes.IncFilesTemplatesType): StoreSitesTypes.SetIncFilesTemplatesAction {
        return {
            type: StoreSitesTypes.SET_INC_FILES_TEMPLATES,
            payload
        }
    },

    // Установка id выбранного шаблона подключаемых шаблонов
    setCurrentIncFilesTemplateId(payload: StoreSitesTypes.CurrentIncFilesTemplateId): StoreSitesTypes.SetCurrentIncFilesTemplateIdAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_INC_FILES_TEMPLATE_ID,
            payload
        }
    },

    // Установка id и типа выбранного шаблона компонента
    setCurrentComp(id: null | FilesTreeType.UuId, type: null | FilesTreeType.ItemType): StoreSitesTypes.SetCurrentCompAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_COMP,
            payload: {
                id,
                type
            }
        }
    },
}

export default sitesActions