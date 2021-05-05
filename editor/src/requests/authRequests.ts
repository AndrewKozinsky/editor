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

type ChangeEmailServerResponse = {
    status: string
}

// Функция меняет почту, на которую зарегистрирована учётная запись пользователя
export function useChangeEmail(newEmail: string) {

    // Параметры запроса
    const options = { method: 'PUT', body: JSON.stringify({email: newEmail})}

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: response, doFetch} =
        useFetch<ChangeEmailServerResponse>(getApiUrl('changeEmail'), options)

    return { response, doFetch }
}

type DeleteAccountServerResponse = {
    status: string
}

// Функция удаляет учётная запись пользователя
export function useDeleteAccount() {

    // Параметры запроса
    const options = { method: 'DELETE'}

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: response, doFetch} =
        useFetch<DeleteAccountServerResponse>(getApiUrl('me'), options)

    return { response, doFetch }
}

type GetSitesServerResponse = {
    status: 'success',
    data: {
        sites: {
            name: string
            _id: string
        }[]
    }
}

// Функция получает массив сайтов
export function useGetSites() {

    // Параметры запроса
    const options = { method: 'GET'}

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: response, doFetch} =
        useFetch<GetSitesServerResponse>(getApiUrl('sites'), options)

    return { response, doFetch }
}
