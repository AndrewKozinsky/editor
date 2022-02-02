import getApiUrl from 'requests/reqFn/apiUrls'
import { makeFetch } from 'requests/reqFn/fetch'
import StoreSitesTypes from 'store/site/sitesTypes'
import SiteTemplateResponseType from './siteTemplateServerResponseType'

/**
 * Функция удаляет шаблон сайта
 * @param {Object} templateId — id удаляемого шаблона
 */
export default async function deleteSiteTemplateRequest(templateId: StoreSitesTypes.CurrentSiteTemplateId) {
    const options = {
        method: 'DELETE'
    }

    const response: SiteTemplateResponseType = await makeFetch(
        getApiUrl('siteTemplate', templateId), options
    )

    return response
}
