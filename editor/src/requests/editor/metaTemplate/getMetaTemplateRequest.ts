import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import MetaTemplateResponseType from './metaTemplateServerResponseType'

/**
 * Функция отправляет запрос на получение шаблона метаданных
 * @param {String} templateId — id шаблона метаданных
 */
export default async function getMetaTemplateRequest(templateId: number): Promise<MetaTemplateResponseType> {
    const options = { method: 'GET' }

    return await makeFetch(
        getApiUrl('metaTemplate', templateId), options
    )
}
