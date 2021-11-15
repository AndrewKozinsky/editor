import JSON5 from 'json5'
import DragFilesTreeType from 'libs/DragFilesTree/types'
import ErrorServerResponseType from '../../errorServerResponseType'
import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import CompFolderServerResponseType from './compFolderServerResponseType'

/**
 * Функция отправляет данные для входа пользователя в редактор
 * @param {Number} compFolderId — id папки с компонентами
 * @param {Array} items — массив папок с компонентами
 */
export default async function putCompFolderRequest(compFolderId: number, items: DragFilesTreeType.Items) {
    const jsonItems = JSON5.stringify(items)

    const options = {
        method: 'PATCH',
        body: JSON.stringify({content: jsonItems})
    }

    const response: PutCompFolderServerResponse = await makeFetch(
        getApiUrl('compFolder', compFolderId), options
    )
    // console.log(response)
    return response
}


// Тип данных с ответом от сервера
type PutCompFolderServerResponse = ErrorServerResponseType | CompFolderServerResponseType