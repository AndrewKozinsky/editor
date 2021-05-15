
namespace StoreSitesTypes {

    // Сайт
    export type SiteType = {
        id: string,
        name: string
    }
    // Сайты
    export type SitesType = SiteType[]
    // id выбранного сайта
    export type CurrentSiteId = null | string
    // id открытой вкладки на правой части
    export type RightMainTab = number

    // Шаблон подключаемых файлов
    export type PluginType = {
        id: string,
        name: string,
        head?: string
        body?: string
    }
    // Массив шаблонов подключаемых файлов
    export type PluginsType = PluginType[]
    // id выбранного шаблона подключаемых файлов
    export type CurrentPluginsId = null | string

    // Типы типа и тип экшена
    // Установка массива сайтов
    export const SET_SITES = 'SET_SITES'
    export type SetSitesAction = {
        type: typeof SET_SITES
        payload: SitesType
    }

    // Установка id выбранного сайта
    export const SET_CURRENT_SITE_ID = 'SET_CURRENT_SITE_ID'
    export type SetCurrentSiteIdAction = {
        type: typeof SET_CURRENT_SITE_ID
        payload: CurrentSiteId
    }

    // Установка id текущей основной вкладки справа
    export const SET_RIGHT_MAIN_TAB = 'SET_RIGHT_MAIN_TAB'
    export type SetRightMainTabAction = {
        type: typeof SET_RIGHT_MAIN_TAB
        payload: RightMainTab
    }


    // Установка массива шаблонов подключаемых файлов
    export const SET_PLUGINS = 'SET_PLUGINS'
    export type SetPluginsAction = {
        type: typeof SET_PLUGINS
        payload: PluginsType
    }

    // Установка id выбранного шаблона подключаемых файлов
    export const SET_CURRENT_PLUGINS_ID = 'SET_CURRENT_PLUGINS_ID'
    export type SetCurrentPluginsIdAction = {
        type: typeof SET_CURRENT_PLUGINS_ID
        payload: CurrentPluginsId
    }


    export type SitesAction =
        | SetSitesAction
        | SetCurrentSiteIdAction
        | SetRightMainTabAction
        | SetPluginsAction
        | SetCurrentPluginsIdAction
}

export default StoreSitesTypes
