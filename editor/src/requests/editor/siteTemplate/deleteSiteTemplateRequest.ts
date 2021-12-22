// import {useFetch} from 'requests/reqFn/fetch'
// import getApiUrl from 'requests/reqFn/apiUrls'
import { makeFetch } from '../../reqFn/fetch'
import getApiUrl from '../../reqFn/apiUrls'
import ErrorServerResponseType from 'requests/errorServerResponseType'
import SiteTemplateServerResponseType from './siteTemplateServerResponseType'


/**
 * Функция удаляет шаблон сайта
 * @param {Object} templateId — id удаляемого шаблона
 */
export default async function deleteSiteTemplateRequest(templateId: number) {
    const options = {
        method: 'DELETE'
    }

    const response: DeleteSiteTemplateServerResponse = await makeFetch(
        getApiUrl('siteTemplate', templateId), options
    )

    return response
}

// Тип данных с ответом от пользователя
type DeleteSiteTemplateServerResponse = ErrorServerResponseType | SiteTemplateServerResponseType

