import { getState } from 'utils/miscUtils'
import MetaTemplateResponseType from './metaTemplateServerResponseType'
import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'

/**
 * Функция создаёт новый шаблон подключаемых файлов
 * @param {Object} values — данные для входа
 */
export default async function createMetaTemplateRequest(values: CreateNewMetaTemplateValuesType) {
    const newTemplateData = {
        siteId: getState().sites.currentSiteId,
        content: values.content
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(newTemplateData)
    }

    const response: MetaTemplateResponseType = await makeFetch(
        getApiUrl('createMetaTemplate'), options
    )

    return response
}

// Данные для входа передаваемые в loginRequest
export type CreateNewMetaTemplateValuesType = {
    content: string
}
