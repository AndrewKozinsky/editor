import {useFetch} from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import { useSelector } from 'react-redux'
import { AppState } from 'store/rootReducer'


// Функция удаляет сайт
export function useDeleteSite() {

    // id выделенного сайта, который нужно удалить
    const {currentSiteId} = useSelector((store: AppState) => store.sites)

    // Параметры запроса
    const options = { method: 'DELETE'}

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: response, doFetch} =
        useFetch<DeleteSiteServerResponse>(getApiUrl('site', currentSiteId), options)

    return { response, doFetch }
}


// Тип данных с ответом от пользователя
type DeleteSiteServerResponse = null | FailResponse | SuccessResponse

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