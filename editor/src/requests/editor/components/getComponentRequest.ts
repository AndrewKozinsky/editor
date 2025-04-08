import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import { ComponentRequestServerResponse } from './componentServerResponseType'
import FilesTreeType from 'types/FilesTreeType'

/** Функция получает данные компонента */
export default async function getComponentRequest(componentId: FilesTreeType.FileItemId) {

    const options = { method: 'GET' }
    const response: ComponentRequestServerResponse = await makeFetch(
        getApiUrl('component', componentId), options
    )

    return response
}
