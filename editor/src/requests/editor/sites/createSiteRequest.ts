import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import ErrorServerResponseType from 'requests/errorServerResponseType'
import SiteServerResponseType from './siteServerResponseType'

/**
 * Функция отправляет данные для входа пользователя в редактор
 * @param {String} values — данные для создания сайта
 */
export default async function createSiteRequest(values: CreateSiteRequestValuesType) {
    const options = {
        method: 'POST',
        body: JSON.stringify(values)
    }
    const response: CreateSiteRequestServerResponse = await makeFetch(getApiUrl('sites'), options)
    return response
}


// Данные для создания сайта передаваемые в createSiteRequest
export type CreateSiteRequestValuesType = {
    name: string
}

// Тип данных с ответом от сервера
type CreateSiteRequestServerResponse = ErrorServerResponseType | SiteServerResponseType
