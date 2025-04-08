const JSON5 = require('json5')
import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import {
    ArtFolderRowServerRespType,
    ArtFolderServerSuccessRespType
} from './artFolderServerResponseType'
import FilesTreeType from '../../../types/FilesTreeType'

/**
 * Функция отправляет запрос на сохранение массива папок статей
 * @param {Number} artFolderId — id папки с компонентами
 * @param {Array} folders — массив папок статей
 */
export default async function putArtFolderRequest(
    artFolderId: number, folders: FilesTreeType.Items
) {
    const jsonItems = JSON5.stringify(folders)

    const options = {
        method: 'PATCH',
        body: JSON.stringify({content: jsonItems})
    }

    const rowResponse: ArtFolderRowServerRespType = await makeFetch(
        getApiUrl('artFolder', artFolderId), options
    )

    // При успешном ответе нужно превратить данные папок с компонентами из строк в массив объектов.
    // За это отвечает код ниже.
    if (rowResponse.status === 'success') {
        try {
            // Составление массива объектов из массива строк
            const parsedFolders = rowResponse.data.artFolders.map(folderData => {
                return {
                    ...folderData,
                    content: JSON5.parse(folderData.content)
                }
            })

            // Собрать новый объект ответа сервера с объектами полученными из строк
            let response: ArtFolderServerSuccessRespType = {
                ...rowResponse,
                data: {
                    artFolders: parsedFolders
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
