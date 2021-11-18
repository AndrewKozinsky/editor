import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import ErrorServerResponseType from 'requests/errorServerResponseType'
import SiteServerResponseType from './siteServerResponseType'

/** Функция получает список сайтов пользователя */
export default async function sitesRequest() {
    const options = { method: 'GET'}
    const response: SitesRequestServerResponse = await makeFetch(getApiUrl('sites'), options)

    return response
}


// Тип данных с ответом от пользователя
type SitesRequestServerResponse = ErrorServerResponseType | SiteServerResponseType
