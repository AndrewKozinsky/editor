import {makeFetch} from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'

/** Функция получает список сайтов пользователя */
export default async function sitesRequest() {
    const options = { method: 'GET'}
    const response: SitesRequestServerResponse = await makeFetch(getApiUrl('sites'), options)

    return response
}


// Тип данных с ответом от пользователя
type SitesRequestServerResponse = any //FailResponse | SuccessResponse

// Ошибочный ответ
type FailResponse = {
    // status: "fail"
    /*errors: {
        field: null
        isOperational: true
        message: string // "Incorrect email or password"
        statusCode: 400
    }*/
}

// Успешный ответ
type SuccessResponse = {
    // status: "success"
    /*data: {
        user: {
            name: string
            email: string
        }
    }*/
}