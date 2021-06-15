import {useFetch} from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'

// Хук удаляет учётная запись пользователя
export function useDeleteAccount() {

    // Параметры запроса
    const options = { method: 'DELETE'}

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: response, doFetch} =
        useFetch<DeleteAccountServerResponse>(getApiUrl('me'), options)

    return { response, doFetch }
}


// Тип данных с ответом от пользователя
type DeleteAccountServerResponse = FailResponse | SuccessResponse

// Ошибочный ответ
type FailResponse = {
    status: "fail"
    errors: {
        field: null
        isOperational: true
        message: string
        statusCode: 400
    }
}

// Успешный ответ
type SuccessResponse = {
    status: "success"
}