import getApiUrl from 'requests/reqFn/apiUrls'
import { makeFetch } from 'requests/reqFn/fetch'
import StoreSitesTypes from 'store/site/sitesTypes'
import MetaTemplateResponseType from './metaTemplateServerResponseType'

/**
 * Функция удаляет шаблон сайта
 * @param {Object} templateId — id удаляемого шаблона
 */
export default async function deleteMetaTemplateRequest(templateId: StoreSitesTypes.CurrentMetaTemplateId) {
    const options = {
        method: 'DELETE'
    }

    const response: MetaTemplateResponseType = await makeFetch(
        getApiUrl('metaTemplate', templateId), options
    )

    return response
}
