// import {useFetch} from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import { makeFetch } from '../reqFn/fetch'
import ErrorServerResponseType from 'requests/errorServerResponseType'
import UserServerResponseType from './userServerResponseType'


export default async function deleteAccountRequest() {
    const options = { method: 'DELETE'}

    const response: DeleteAccountServerResponse = await makeFetch(getApiUrl('me'), options)
    return response
}


// Тип данных с ответом от пользователя
type DeleteAccountServerResponse = ErrorServerResponseType | UserServerResponseType
