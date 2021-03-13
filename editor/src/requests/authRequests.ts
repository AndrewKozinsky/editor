import {useFetch} from './useFetch'
import apiUrls from './apiUrls'

type GetTokenDataServerResponse = {
    status: string
}

// Функция возвращает токен пользователя
export function useGetUserToken() {

    // Параметры запроса
    const options = { method: 'POST' }

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: userToken, doFetch} =
        useFetch<GetTokenDataServerResponse>(apiUrls.getUserToken, options)

    return { userToken, doFetch }
}
