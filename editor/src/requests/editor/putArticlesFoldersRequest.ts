import {makeFetch} from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import FilesTreeType from 'libs/FilesTree/types'
import store from 'store/store'

/**
 * Функция отправляет данные для входа пользователя в редактор
 * @param {Array} items — массив папок с компонентами
 */
export default async function putArticlesFoldersRequest(items: FilesTreeType.Items) {
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
        site: {
            defaultIncFilesTemplateId: null | string
            name: string
            userId: string
        }
    }
}