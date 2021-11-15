import JSON5 from 'json5'
import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import ErrorServerResponseType from 'requests/errorServerResponseType'
import {
    GetCompFolderRowServerRespType,
    GetCompFolderServerSuccessRespType
} from './compFolderServerResponseType'


export async function getCompFolderRequest(siteId: number) {
    const options = { method: 'GET' }

    const rowResponse: GetCompFolderRowServerRespType | ErrorServerResponseType = await makeFetch(
        getApiUrl('compFoldersBySite', siteId), options
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
            let response: GetCompFolderServerSuccessRespType = {
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

