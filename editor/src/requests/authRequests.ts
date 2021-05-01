import {useFetch} from './fetch'
import getApiUrl from './apiUrls'

type GetTokenDataServerResponse = {
    status: string
}

// Функция возвращает токен пользователя
export function useGetUserToken() {

    // Параметры запроса
    const options = { method: 'POST' }

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: userToken, doFetch} =
        useFetch<GetTokenDataServerResponse>(getApiUrl('getUserToken'), options)

    return { userToken, doFetch }
}

// Функция меняет почту, на которую зарегистрирована учётная запись пользователя
export function useChangeEmail(newEmail: string) {

    // Параметры запроса
    const options = { method: 'PUT', body: JSON.stringify({email: newEmail})}

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: response, doFetch} =
        useFetch<GetTokenDataServerResponse>(getApiUrl('changeEmail'), options)

    return { response, doFetch }
}
