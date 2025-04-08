import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import { SitesServerResponseType } from './sitesServerResponseType'

/**
 * Функция отправляет данные для входа пользователя в редактор
 * @param {String} values — данные для создания сайта
 */
export default async function createSiteRequest(
    values: CreateSiteRequestValuesType
): Promise<SitesServerResponseType> {
    const options = {
        method: 'POST',
        body: JSON.stringify(values)
    }

    return await makeFetch(getApiUrl('sites'), options)
}


// Данные для создания сайта передаваемые в createSiteRequest
export type CreateSiteRequestValuesType = {
    name: string
}
