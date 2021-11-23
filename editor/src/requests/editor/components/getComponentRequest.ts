import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import {ComponentRequestServerResponse} from './componentServerResponseType'
import DragFilesTreeType from 'libs/DragFilesTree/types'

/** Функция получает данные компонента */
export default async function getComponentRequest(componentId: DragFilesTreeType.Id) {

    const options = { method: 'GET' }
    const response: ComponentRequestServerResponse = await makeFetch(
        getApiUrl('component', componentId), options
    )

    return response
}
