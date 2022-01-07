import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import { UserServerResponse } from './userServerResponseType'

/**
 * Функция отправляет данные для регистрации пользователя
 * @param {Object} values — данные для входа
 */
export default async function regRequest(values: RegRequestValuesType) {
    const options = {
        method: 'POST',
        body: JSON.stringify(values)
    }
    const response: UserServerResponse = await makeFetch(getApiUrl('signup'), options)
    return response
}

// Данные для входа передаваемые в loginRequest
export type RegRequestValuesType = {
    'email': string
    'password': number | string
}
