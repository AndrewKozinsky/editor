const JSON5 = require('json5')
import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import {
    CompFolderRowServerRespType,
    CompFolderServerSuccessRespType
} from './compFolderServerResponseType'

/**
 * Функция делает запрос на получение папок компонентов по определённому сайту.
 * Строка с кодом папок разбирается.
 * @param {Number} siteId — id сайта к которому нужно получить список папок с компонентами
 */
export async function getCompFolderRequest(siteId: number) {
    const options = { method: 'GET' }

    const rowResponse: CompFolderRowServerRespType = await makeFetch(
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
    else {
        return rowResponse
    }
}
