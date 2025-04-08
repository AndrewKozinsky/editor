import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import { UserServerResponse } from './userServerResponseType'

/**
 * Функция отправляет данные для подтверждения почты
 * @param {String} token — токен подтверждения почты
 */
export default async function confirmEmailRequest(token: string) {
    const options = { method: 'GET' }
    const response: UserServerResponse = await makeFetch(
        getApiUrl('confirmEmail', token), options
    )

    return response
}
