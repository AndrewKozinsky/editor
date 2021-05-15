// Types
import StoreSitesTypes from './sitesTypes'
import {AppDispatchType, GetStateType, ObjStringKeyStringValType} from 'types/miscTypes'
import {makeFetch} from 'requests/fetch'
import getApiUrl from 'requests/apiUrls'


const sitesActions = {

    // Загрузка сайтов с сервера и установка в Хранилище
    requestSites() {
        return async function (dispatch: AppDispatchType, getState: GetStateType) {
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
                    name: site.name
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
    requestPlugins() {
        return async function (dispatch: AppDispatchType, getState: GetStateType) {
            // Параметры запроса
            const options = { method: 'GET' }

            // Запрос и ответ от сервера
            const response = await makeFetch(
                getApiUrl('plugins'), options, getState().settings.editorLanguage
            )

            if (!response || response.status !== 'success') return

            // Формированое массива шаблонов для установки в Хранилище
            const preparedPlugins = response.data.templates.map((plugin: any) => {
                // Формирование возвращаемого объекта с данными шаблона подключаемых файлов
                return  {
                    id: plugin._id,
                    name: plugin.name,
                    head: plugin.codeInHead?.code || '',
                    body: plugin.codeBeforeEndBody?.code || ''
                }
            })

            // Установка шаблонов подключаемых файлов в Хранилище
            dispatch( sitesActions.setPlugins(preparedPlugins) )
        }
    },

    // Установка массива шаблонов подключаемых файлов
    setPlugins(payload: StoreSitesTypes.PluginsType): StoreSitesTypes.SetPluginsAction {
        return {
            type: StoreSitesTypes.SET_PLUGINS,
            payload
        }
    },

    // Установка id выбранного шаблона подключаемых шаблонов
    setCurrentPluginsId(payload: StoreSitesTypes.CurrentPluginsId): StoreSitesTypes.SetCurrentPluginsIdAction {
        return {
            type: StoreSitesTypes.SET_CURRENT_PLUGINS_ID,
            payload
        }
    },
}

export default sitesActions