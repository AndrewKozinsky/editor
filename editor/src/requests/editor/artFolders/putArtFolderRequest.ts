const JSON5 = require('json5')
import DragFilesTreeType from 'libs/DragFilesTree/types'
import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import {
    ArtFolderRowServerRespType,
    ArtFolderServerSuccessRespType
} from './artFolderServerResponseType'

/**
 * Функция отправляет данные для входа пользователя в редактор
 * @param {Number} artFolderId — id папки с компонентами
 * @param {Array} folders — массив папок статей
 */
export default async function putArtFolderRequest(
    artFolderId: number, folders: DragFilesTreeType.Items
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
















// КОД НИЖЕ МОЖНО УДАЛИТЬ
// import {makeFetch} from 'requests/reqFn/fetch'
// import getApiUrl from 'requests/reqFn/apiUrls'
// import { store } from 'store/rootReducer'
// import FilesTreeType from '../../../types/filesTree'

/**
 * Функция обновляет данные по папкам статей
 * @param {Array} items — массив папок со статьями
 */
/*export default async function putArticlesFoldersRequest(items: FilesTreeType.Items) {
    // id выбранного сайта
    const siteId = store.getState().sites.currentSiteId

    const jsonItems = JSON.stringify(items)

    const options = {
        method: 'PUT',
        body: JSON.stringify({content: jsonItems})
    }
    const response: PutComponentsFoldersServerResponse = await makeFetch(
        getApiUrl('articlesFolders', siteId), options
    )

    return response
}*/


// Тип данных с ответом от пользователя
// type PutComponentsFoldersServerResponse = ErrorServerResponseType | SuccessResponse


// Успешный ответ
/*
type SuccessResponse = {
    status: "success"
    data: {
        folders: {
            content: string // "[{\"uuid\":\"a93df62a-c4c9-4813-be54-43fcd7602573\",\"type\":\"file\"}...]"
            siteId: string // "60c89dccfe73df002a1c4fa4"
            userId: string // "60c626f9fd09180020febc99"
        }
    }
}*/