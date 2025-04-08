import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import MetaTemplateResponseType from './metaTemplateServerResponseType'

/**
 * Функция отправляет запрос на получение шаблонов подключаемых файлов определённого сайта
 * @param {String} siteId — id сайта у которого нужно получить шаблоны подключаемых файлов
 */
export default async function getMetaTemplatesRequest(siteId: number) {
    const options = { method: 'GET' }
    const response: MetaTemplateResponseType = await makeFetch(
        getApiUrl('metaTemplates', siteId), options
    )

    return response
}
