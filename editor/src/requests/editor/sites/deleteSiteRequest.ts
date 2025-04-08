import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import { SitesServerResponseType } from './sitesServerResponseType'
import StoreSitesTypes from 'store/site/sitesTypes'

/**
 * Запрос на удаление сайта
 * @param {Number} siteId — id удаляемого сайта
 */
export default async function deleteSiteRequest(siteId: StoreSitesTypes.CurrentSiteId) {
    // Параметры запроса
    const options = { method: 'DELETE' }

    const response: SitesServerResponseType = await makeFetch(getApiUrl('site', siteId), options)
    return response
}
