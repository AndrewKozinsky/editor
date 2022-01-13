import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import {ComponentRequestServerResponse} from './componentServerResponseType'

/** Функция отправляет запрос на получение шаблонов компонентов сайта */
export default async function getSiteComponentsRequest(siteId: number) {
    const options = { method: 'GET' }

    const response: ComponentRequestServerResponse = await makeFetch(
        getApiUrl('componentsBySite', siteId), options
    )

    return response
}
