import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import { SitesServerResponseType } from './sitesServerResponseType'

/** Функция получает список сайтов пользователя */
export default async function sitesRequest(): Promise<SitesServerResponseType> {
    const options = { method: 'GET'}

    return await makeFetch(getApiUrl('sites'), options)
}
