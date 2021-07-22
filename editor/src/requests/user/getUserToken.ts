import getApiUrl from 'requests/reqFn/apiUrls'
import { useFetch } from 'requests/reqFn/fetch'



// Функция возвращает токен пользователя
export function useGetUserToken() {

    // Параметры запроса
    const options = { method: 'POST' }

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: userToken, doFetch} =
        useFetch<GetTokenDataServerResponse>(getApiUrl('getUserToken'), options)

    return { userToken, doFetch }
}



// Тип данных с ответом от пользователя
type GetTokenDataServerResponse = FailResponse | SuccessResponse

// Ошибочный ответ
type FailResponse = {
    status: 'fail'
}

// Успешный ответ
type SuccessResponse = {
    status: "success"
    data: {
        name: string // "Andrew"
        email: string // "andkozinskiy@yandex.ru"
    }
}
