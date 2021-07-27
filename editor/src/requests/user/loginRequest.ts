// import {makeFetch} from 'requests/reqFn/fetch'
// import getApiUrl from 'requests/reqFn/apiUrls'

/**
 * Функция отправляет данные для входа пользователя в редактор
 * @param {Object} values — данные для входа
 */
/*export default async function loginRequest(values: LoginRequestValuesType) {
    const options = {
        method: 'POST',
        body: JSON.stringify(values)
    }
    const response: LoginRequestServerResponse = await makeFetch(getApiUrl('login'), options)

    return response
}*/

// Данные для входа передаваемые в loginRequest
/*export type LoginRequestValuesType = {
    "email": string
    "password": number | string
}*/

// Тип данных с ответом от пользователя
// type LoginRequestServerResponse = ErrorServerResponseType | UserServerResponseType

// Ошибочный ответ
/*type FailResponse = {
    status: "fail"
    errors: {
        field: null
        isOperational: true
        message: string // "Incorrect email or password"
        statusCode: 400
    }
}*/
