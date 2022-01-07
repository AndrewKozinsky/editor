import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import { UserServerResponse } from './userServerResponseType'

/** Запрос на изменение текущего пароля пользователя */
export default async function changePasswordRequest(currentPassword: string, newPassword: string) {
    const options = {
        method: 'PATCH',
        body: JSON.stringify({
            currentPassword,
            newPassword
        })
    }
    const response: UserServerResponse = await makeFetch(
        getApiUrl('changePassword'), options
    )

    return response
}
