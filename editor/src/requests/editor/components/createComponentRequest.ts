import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import ComponentServerResponseType from './componentServerResponseType'
import ErrorServerResponseType from '../../errorServerResponseType'

/**
 * Функция создаёт новый шаблон компонента
 * @param {Number} siteId — id сайта компонента
 * @param {String} content — код шаблона компонента
 */
export default async function createComponentRequest(siteId: number, content: null | string) {

    const options = {
        method: 'POST',
        body: JSON.stringify({
            siteId,
            content
        })
    }
    const response: CreateNewComponentServerResponse = await makeFetch(
        getApiUrl('components'), options
    )
    return response
}

// Тип данных с ответом от сервера
type CreateNewComponentServerResponse = ErrorServerResponseType | ComponentServerResponseType