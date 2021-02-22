import {useFetch} from './useFetch'
import url from './url'

type GetTokenInfoServerResponse = {
    status: string
}

// Функция возвращает токен пользователя
export function useGetUserToken() {

    // Параметры запроса
    const options = { method: 'POST' }

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: userToken, doFetch} =
        useFetch<GetTokenInfoServerResponse>(url.getUserToken, options)

    return { userToken, doFetch }
}