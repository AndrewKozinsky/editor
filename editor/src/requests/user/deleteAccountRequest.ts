import getApiUrl from 'requests/reqFn/apiUrls'
import { makeFetch } from 'requests/reqFn/fetch'
import { UserServerResponse } from './userServerResponseType'

/* Запрос на удаление пользователя */
export default async function deleteAccountRequest(): Promise<UserServerResponse> {
    const options = { method: 'DELETE'}

    return await makeFetch(getApiUrl('me'), options)
}
