import { store } from 'store/rootReducer'
import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import ErrorServerResponseType from 'requests/errorServerResponseType'
import SiteTemplateServerResponseType from './siteTemplateServerResponseType'

/**
 * Функция создаёт новый шаблон подключаемых файлов
 * @param {Object} values — данные для входа
 */
export default async function createSiteTemplateRequest(values: CreateNewSiteTemplateValuesType) {
    const newTemplateData = {
        siteId: store.getState().sites.currentSiteId,
        content: values.content
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(newTemplateData)
    }

    const response: CreateSiteTemplateRequestServerResponse = await makeFetch(
        getApiUrl('createSiteTemplate'), options
    )

    return response
}

// Данные для входа передаваемые в loginRequest
export type CreateNewSiteTemplateValuesType = {
    content: string
}

// Тип данных с ответом от пользователя
type CreateSiteTemplateRequestServerResponse = ErrorServerResponseType | SiteTemplateServerResponseType