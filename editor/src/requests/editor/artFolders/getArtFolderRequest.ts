const JSON5 = require('json5')
import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import ErrorServerResponseType from 'requests/errorServerResponseType'
import {
    ArtFolderRowServerRespType,
    ArtFolderServerSuccessRespType
} from './artFolderServerResponseType'


export async function getArtFolderRequest(siteId: number) {
    const options = { method: 'GET' }

    const rowResponse: ArtFolderRowServerRespType | ErrorServerResponseType = await makeFetch(
        getApiUrl('artFoldersBySite', siteId), options
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