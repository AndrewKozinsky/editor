import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import { UserServerResponse } from './userServerResponseType'

/** Запрос на смену почты пользователя */
export async function changeEmailRequest(newEmail: string) {
    const options = {
        method: 'PATCH',
        body: JSON.stringify({ email: newEmail })
    }
    const response: UserServerResponse = await makeFetch(getApiUrl('changeEmail'), options)

    return response
}
