import getApiUrl from 'requests/reqFn/apiUrls'
// import { useFetch } from 'requests/reqFn/fetch'
// import UserServerResponseType from './userServerResponseType'
// import ErrorServerResponseType from 'requests/errorServerResponseType'
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

