import {makeFetch} from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import store from 'store/store'

/**
 * Функция создаёт новую статью
 * @param {String} uuid — uuid шаблона компонента
 * @param {String} name — имя шаблона компонента
 * @param {String} code — код шаблона компонента
 */
export default async function createNewArticleRequest(uuid: string, name: string, code: null | string) {
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
    const response: CreateNewArticleServerResponse = await makeFetch(
        getApiUrl('article'), options
    )

    return response
}

// Тип данных с ответом от пользователя
type CreateNewArticleServerResponse = FailResponse | SuccessResponse

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
        user: {
            name: string
            email: string
        }
    }
}