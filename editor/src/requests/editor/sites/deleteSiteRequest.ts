import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import SiteServerResponseType from './siteServerResponseType'
import ErrorServerResponseType from '../../errorServerResponseType'

/**
 * Запрос на удаление сайта
 * @param {Number} siteId — id удаляемого сайта
 */
export default async function deleteSiteRequest(siteId: number) {
    // Параметры запроса
    const options = { method: 'DELETE' }

    const response: DeleteSiteRequestServerResponse = await makeFetch(getApiUrl('site', siteId), options)
    return response
}


// Тип данных с ответом от сервера
type DeleteSiteRequestServerResponse = ErrorServerResponseType | SiteServerResponseType

