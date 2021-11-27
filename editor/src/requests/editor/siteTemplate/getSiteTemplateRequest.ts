import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import ErrorServerResponseType from '../../errorServerResponseType'
import SiteTemplateServerResponseType from './siteTemplateServerResponseType'

/**
 * Функция отправляет запрос на получение шаблонов подключаемых файлов определённого сайта
 * @param {String} templateId — included files template id
 */
export default async function getSiteTemplateRequest(templateId: number) {

    const options = { method: 'GET' }
    const response: CreateSiteTemplateRequestServerResponse = await makeFetch(
        getApiUrl('siteTemplate', templateId), options
    )

    return response
}


type CreateSiteTemplateRequestServerResponse = ErrorServerResponseType | SiteTemplateServerResponseType