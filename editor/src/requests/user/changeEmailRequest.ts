import { makeFetch, useFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import ErrorServerResponseType from 'requests/errorServerResponseType'
import UserServerResponseType from './userServerResponseType'
// import { LoginRequestValuesType } from './loginRequest'


export async function changeEmailRequest(newEmail: string) {
    const options = {
        method: 'PATCH',
        body: JSON.stringify({ email: newEmail })
    }
    const response: ChangeEmailServerResponse = await makeFetch(getApiUrl('changeEmail'), options)

    return response
}


// Тип данных с ответом от пользователя
type ChangeEmailServerResponse = ErrorServerResponseType | UserServerResponseType