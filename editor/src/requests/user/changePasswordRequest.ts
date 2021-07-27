// import {makeFetch} from 'requests/reqFn/fetch'
// import getApiUrl from 'requests/reqFn/apiUrls'

/**
 * Изменение текущего пароля
 * @param {String} passwordCurrent — текущий пароль
 * @param {String} newPassword — новый пароль
 * @param {String} newPasswordAgain — новый пароль еще раз
 */
/*export default async function changePasswordRequest(passwordCurrent: string, newPassword: string, newPasswordAgain: string) {
    const options = {
        method: 'PATCH',
        body: JSON.stringify({
            passwordCurrent,
            newPassword,
            newPasswordAgain
        })
    }
    const response: ChangePasswordRequestServerResponse = await makeFetch(
        getApiUrl('changePassword'), options
    )

    return response
}*/

// Тип данных с ответом от пользователя
// type ChangePasswordRequestServerResponse = ErrorServerResponseType | UserServerResponseType

// Ошибочный ответ
/*type FailResponse = {
    status: "fail"
    errors: {
        field: 'passwordCurrent'
        isOperational: true
        message: string
        statusCode: 400
    }
}*/

