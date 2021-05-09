
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


    export type SitesAction =
        | SetSitesAction
        | SetCurrentSiteIdAction
        | SetRightMainTabAction
}

export default StoreSitesTypes
