import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import { UserServerResponse } from './userServerResponseType'

/**
 * Отправка нового пароля после сброса забытого
 * @param {String} password — пароль
 * @param {String} passwordConfirm — подтверждение пароля
 * @param {String} token — токен сброса пароля
 */
export default async function changeResetPasswordRequest(password: string, passwordConfirm: string, token: string) {
    const options = {
        method: 'PATCH',
        body: JSON.stringify({password})
    }
    const response: UserServerResponse = await makeFetch(
        getApiUrl('changeResetPassword', token), options
    )
    return response
}
