import {useSelector} from 'react-redux'
import { AppState } from 'store/rootReducer'
import StoreSitesTypes from 'store/site/sitesTypes'


export function useGetSiteName() {
    // Язык интерфейса
    const {currentSiteId, sites} = useSelector((store: AppState) => store.sites)

    // Найти сайт с указанным id
    const site = sites.find((site: StoreSitesTypes.SiteType) => site.id === currentSiteId)

    // Если сайт найден, то вернуть его имя
    if (site) return site.name
    // В противном случае вернуть пустую строку
    else return ''
}