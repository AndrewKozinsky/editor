import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import ErrorServerResponseType from 'requests/errorServerResponseType'
import SiteTemplateServerResponseType from './siteTemplateServerResponseType'

/**
 * Функция отправляет запрос на получение шаблонов подключаемых файлов определённого сайта
 * @param {String} siteId — id сайта у которого нужно получить шаблоны подключаемых файлов
 */
export default async function getSiteTemplatesRequest(siteId: string) {
    const options = { method: 'GET' }
    const response: GetSiteTemplatesRequestServerResponse = await makeFetch(
        getApiUrl('siteTemplates', siteId), options
    )

    return response
}


// Тип данных с ответом от пользователя
type GetSiteTemplatesRequestServerResponse = ErrorServerResponseType | SiteTemplateServerResponseType
