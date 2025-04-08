const JSON5 = require('json5')
import DragFilesTreeType from 'libs/DragFilesTree/types'
import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import {
    CompFolderRowServerRespType,
    CompFolderServerSuccessRespType
} from './compFolderServerResponseType'

/**
 * Функция отправляет данные для входа пользователя в редактор
 * @param {Number} compFolderId — id папки с компонентами
 * @param {Array} folders — массив папок компонентов
 */
export default async function putCompFolderRequest(
    compFolderId: number, folders: DragFilesTreeType.Items
) {
    const jsonItems = JSON5.stringify(folders)

    const options = {
        method: 'PATCH',
        body: JSON.stringify({content: jsonItems})
    }

    const rowResponse: CompFolderRowServerRespType = await makeFetch(
        getApiUrl('compFolder', compFolderId), options
    )

    // При успешном ответе нужно превратить данные папок с компонентами из строк в массив объектов.
    // За это отвечает код ниже.
    if (rowResponse.status === 'success') {
        try {
            // Составление массива объектов из массива строк
            const parsedFolders = rowResponse.data.compFolders.map(folderData => {
                return {
                    ...folderData,
                    content: JSON5.parse(folderData.content)
                }
            })

            // Собрать новый объект ответа сервера с объектами полученными из строк
            let response: CompFolderServerSuccessRespType = {
                ...rowResponse,
                data: {
                    compFolders: parsedFolders
                }
            }

            return response
        }
        catch (err) {}
    }
    else if (rowResponse.status === 'fail') {
        return rowResponse
    }
}
