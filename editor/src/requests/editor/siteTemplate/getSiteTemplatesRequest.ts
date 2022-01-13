import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import SiteTemplateResponseType from './siteTemplateServerResponseType'

/**
 * Функция отправляет запрос на получение шаблонов подключаемых файлов определённого сайта
 * @param {String} siteId — id сайта у которого нужно получить шаблоны подключаемых файлов
 */
export default async function getSiteTemplatesRequest(siteId: number) {
    const options = { method: 'GET' }
    const response: SiteTemplateResponseType = await makeFetch(
        getApiUrl('siteTemplates', siteId), options
    )

    return response
}
