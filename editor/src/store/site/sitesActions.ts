// Types
import StoreSitesTypes from './sitesTypes'


const sitesActions = {

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
}

export default sitesActions