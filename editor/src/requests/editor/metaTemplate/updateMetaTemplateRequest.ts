import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import MetaTemplateResponseType from './metaTemplateServerResponseType'
import StoreSitesTypes from 'store/site/sitesTypes'

/**
 * Функция обновляет существующий шаблон подключаемых файлов
 * @param {Object} values — новые данные шаблона подключаемых файлов
 * @param {String} templateId — id шаблона подключаемых файлов
 */
export default async function updateMetaTemplateRequest(values: UpdateMetaTemplateValuesType, templateId: StoreSitesTypes.CurrentSiteTemplateId) {
    const options = {
        method: 'PATCH',
        body: JSON.stringify(values)
    }
    const response: MetaTemplateResponseType = await makeFetch(
        getApiUrl('metaTemplate', templateId), options
    )

    return response
}

// Данные для входа передаваемые в loginRequest
export type UpdateMetaTemplateValuesType = {
    content: string
}
