import {makeFetch} from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import store from 'store/store'

/**
 * Функция создаёт новый шаблон компонента
 * @param {String} uuid — uuid шаблона компонента
 * @param {String} name — имя шаблона компонента
 * @param {String} code — код шаблона компонента
 */
export default async function createNewComponentRequest(uuid: string, name: string, code: null | string) {
    const siteId = store.getState().sites.currentSiteId

    const options = {
        method: 'POST',
        body: JSON.stringify({
            uuid,
            siteId,
            name,
            code
        })
    }
    const response: CreateNewComponentServerResponse = await makeFetch(
        getApiUrl('component'), options
    )
    return response
}

// Тип данных с ответом от пользователя
type CreateNewComponentServerResponse = FailResponse | SuccessResponse

// Ошибочный ответ
type FailResponse = {
    status: "fail"
    errors: {
        field: null
        isOperational: true
        message: string // "Incorrect email or password"
        statusCode: 400
    }
}

// Успешный ответ
type SuccessResponse = {
    status: "success"
    data: {
        component: {
            code: null | string
            id: string // "60c969dafe73df002a1c4fba"
            name: string // "New component"
            siteId: string // "60c8c3d9fe73df002a1c4fab"
            uuid: string // "0471e6e2-b917-439c-bb29-e49bfa5343c9"
        }
    }
}