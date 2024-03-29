import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import { UserServerResponse } from './userServerResponseType'

/**
 * Функция отправляет данные для входа пользователя в редактор
 * @param {Object} values — данные для входа
 */
export default async function loginRequest(values: LoginRequestValuesType) {
    const options = {
        method: 'POST',
        body: JSON.stringify(values)
    }
    const response: UserServerResponse = await makeFetch(getApiUrl('login'), options)

    return response
}

// Данные для входа передаваемые в loginRequest
export type LoginRequestValuesType = {
    email: string
    password: string
}
