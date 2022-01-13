import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import { ComponentRequestServerResponse } from './componentServerResponseType'

/**
 * Функция сохраняет шаблон компонента
 * @param {String} compItemId — uuid сохраняемого компонента
 * @param {Number} content — код компонента
 */
export async function updateComponentRequest(
    compItemId: number, content: string
) {
    const options = {
        method: 'PATCH',
        body: JSON.stringify({ content })
    }
    const response: ComponentRequestServerResponse = await makeFetch(
        getApiUrl('component', compItemId), options
    )

    return response
}
