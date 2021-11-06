import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import ErrorServerResponseType from 'requests/errorServerResponseType'
import SiteServerResponseType from './siteServerResponseType'

/**
 * Функция отправляет данные для обновления данных сайта
 * @param {Object} values — новые данные сайта
 * @param {Number} siteId — id изменяемого сайта
 */
export default async function updateSiteRequest(values: UpdateSiteRequestValuesType, siteId: number) {
    const options = {
        method: 'PATCH',
        body: JSON.stringify(values)
    }

    const response: UpdateSiteRequestServerResponse = await makeFetch(getApiUrl('site', siteId), options)

    return response
}

// Данные для изменения сайта передаваемые в updateSiteRequest
export type UpdateSiteRequestValuesType = {
    name: string, // название сайта
    defaultSiteTemplateId: null | number // id шаблона подключаемых файлов по умолчанию
}


//

// Тип данных с ответом от сервера
type UpdateSiteRequestServerResponse = ErrorServerResponseType | SiteServerResponseType