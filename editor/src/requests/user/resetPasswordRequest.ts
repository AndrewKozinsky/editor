import {makeFetch} from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'

/**
 * Функция отправляет данные для сброса пароля
 * @param {String} email — почта у которой нужно сбросить пароль
 */
export default async function resetPasswordRequest(email: string) {
    const options = {
        method: 'POST',
        body: JSON.stringify({email: email})
    }
    const response: LoginRequestServerResponse = await makeFetch(getApiUrl('resetPassword'), options)
    return response
}


// Тип данных с ответом от пользователя
type LoginRequestServerResponse = UnknownErrorResponse | FailErrorResponse | SuccessResponse

// Ошибочный ответ
type UnknownErrorResponse = {
    status: 400
    errors: {
        isOperational: false
        message: ""
        statusCode: 400
    }
}
// Ошибочный ответ
type FailErrorResponse = {
    status: "fail"
    errors: {
        field: null
        isOperational: true
        message: string // "There is no user with this email address."
        statusCode: 404
    }
}

// Успешный ответ
type SuccessResponse = {
    status: "success"
    data: {
        email: string // "andkozinskiy@yandex.ru"
        message: string // "Email has been sent!"
    }
}