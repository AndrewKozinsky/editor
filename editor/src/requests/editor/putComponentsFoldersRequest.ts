import store from 'store/store'
import {makeFetch} from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import FilesTreeType from 'libs/FilesTree/types'

/**
 * Функция отправляет данные для входа пользователя в редактор
 * @param {Array} items — массив папок с компонентами
 */
export default async function putComponentsFoldersRequest(items: FilesTreeType.Items) {
    // id выбранного сайта
    const siteId = store.getState().sites.currentSiteId

    const jsonItems = JSON.stringify(items)

    const options = {
        method: 'PUT',
        body: JSON.stringify({content: jsonItems})
    }
    const response: PutComponentsFoldersServerResponse = await makeFetch(
        getApiUrl('componentsFolders', siteId), options
    )

    return response
}


// Тип данных с ответом от пользователя
type PutComponentsFoldersServerResponse = FailResponse | SuccessResponse

// Ошибочный ответ
type FailResponse = {
    status: "fail"
    errors: {
        field: null
        isOperational: true
        message: string
        statusCode: 400
    }
}

// Успешный ответ
type SuccessResponse = {
    status: "success"
    data: {
        folders: {
            content: string // "[{\"uuid\":\"3\",\"type\":\"folder\",\"name\":\"New folder\"}...]"
            siteId: string // "60c89dccfe73df002a1c4fa4"
            userId: string // "60c626f9fd09180020febc99"
        }
    }
}