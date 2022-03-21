import { getState } from 'utils/miscUtils'
import SiteTemplateResponseType from './siteTemplateServerResponseType'
import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'

/**
 * Функция создаёт новый шаблон подключаемых файлов
 * @param {Object} values — данные для входа
 */
export default async function createSiteTemplateRequest(values: CreateNewSiteTemplateValuesType) {
    const newTemplateData = {
        siteId: getState().sites.currentSiteId,
        content: values.content
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(newTemplateData)
    }

    const response: SiteTemplateResponseType = await makeFetch(
        getApiUrl('createSiteTemplate'), options
    )

    return response
}

// Данные для входа передаваемые в loginRequest
export type CreateNewSiteTemplateValuesType = {
    content: string
}
