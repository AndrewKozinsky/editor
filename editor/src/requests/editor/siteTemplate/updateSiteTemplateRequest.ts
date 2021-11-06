import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import ErrorServerResponseType from '../../errorServerResponseType'
import SiteTemplateServerResponseType from './siteTemplateServerResponseType'

/**
 * Функция обновляет существующий шаблон подключаемых файлов
 * @param {Object} values — новые данные шаблона подключаемых файлов
 * @param {String} templateId — id шаблона подключаемых файлов
 */
export default async function updateSiteTemplateRequest(values: UpdateSiteTemplateValuesType, templateId: string) {
    const options = {
        method: 'PATCH',
        body: JSON.stringify(values)
    }
    const response: UpdateTemplateRequestServerResponse = await makeFetch(
        getApiUrl('siteTemplate', templateId), options
    )

    return response
}

// Данные для входа передаваемые в loginRequest
export type UpdateSiteTemplateValuesType = {
    content: string
}

// Тип данных с ответом от пользователя
type UpdateTemplateRequestServerResponse = ErrorServerResponseType | SiteTemplateServerResponseType
