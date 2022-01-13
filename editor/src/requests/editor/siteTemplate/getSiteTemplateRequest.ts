import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import SiteTemplateResponseType from './siteTemplateServerResponseType'

/**
 * Функция отправляет запрос на получение шаблонов подключаемых файлов определённого сайта
 * @param {String} templateId — included files template id
 */
export default async function getSiteTemplateRequest(templateId: number): Promise<SiteTemplateResponseType> {
    const options = { method: 'GET' }

    return await makeFetch(
        getApiUrl('siteTemplate', templateId), options
    )
}
