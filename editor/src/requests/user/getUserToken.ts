import getApiUrl from 'requests/reqFn/apiUrls'
import { makeFetch } from 'requests/reqFn/fetch'
import { UserServerResponse } from './userServerResponseType'


/** Отправка запроса на получение токена пользователя */
export default async function getUserToken() {
    const options = { method: 'POST' }
    const response: UserServerResponse = await makeFetch(
        getApiUrl('getUserToken'), options
    )
    return response
}

