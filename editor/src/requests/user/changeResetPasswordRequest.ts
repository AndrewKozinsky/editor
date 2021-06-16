import {makeFetch} from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'

/**
 * Отправка нового пароля после сброса забытого
 * @param {String} password — пароль
 * @param {String} passwordConfirm — подтверждение пароля
 * @param {String} token — токен сброса пароля
 */
export default async function changeResetPasswordRequest(password: string, passwordConfirm: string, token: string) {
    const options = {
        method: 'PATCH',
        body: JSON.stringify({
            password,
            passwordConfirm
        })
    }
    const response: ChangeResetPasswordRequestServerResponse = await makeFetch(
        getApiUrl('changeResetPassword', token), options
    )
    return response
}

// Тип данных с ответом от пользователя
type ChangeResetPasswordRequestServerResponse = FailResponse | SuccessResponse

// Ошибочный ответ
type FailResponse = {
    status: "fail"
    errors: {
        field: null
        isOperational: true
        message: string // "Token is invalid or has expired"
        statusCode: 400
    }
}

// Успешный ответ
type SuccessResponse = {
    status: "success"
    data: {
        user: {
            email: string // "andkozinskiy@yandex.ru"
        }
    }
}