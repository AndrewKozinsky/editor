// import {makeFetch} from 'requests/reqFn/fetch'
// import getApiUrl from 'requests/reqFn/apiUrls'

/**
 * Функция отправляет данные для регистрации пользователя
 * @param {Object} values — данные для входа
 */
/*export default async function regRequest(values: LoginRequestValuesType) {
    const options = {
        method: 'POST',
        body: JSON.stringify(values)
    }
    const response: RegRequestServerResponse = await makeFetch(getApiUrl('signup'), options)
    return response
}*/

// Данные для входа передаваемые в loginRequest
/*export type LoginRequestValuesType = {
    "email": string
    "password": number | string
}*/

// Тип данных с ответом от пользователя
// type RegRequestServerResponse = FailResponse | SuccessResponse

// Ошибочный ответ
/*type FailResponse = {
    status: "error"
    errors: {
        code: 11000
        isOperational: false
        message: string
        statusCode: number // 409
    }
}*/

// Успешный ответ
/*
type SuccessResponse = {
    status: "success"
    data: {
        user: {
            email: string // "andkozinskiy@yandex.ru"
        }
    }
}*/
