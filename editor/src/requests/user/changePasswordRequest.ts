import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import { UserServerResponse } from './userServerResponseType'

/** Изменение текущего пароля */
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
