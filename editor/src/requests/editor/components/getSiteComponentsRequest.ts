import {makeFetch} from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'
import FilesTreeType from 'src/libs/FilesTree/types'


/** Функция отправляет запрос на получение шаблонов компонентов сайта */
export default async function getSiteComponentsRequest(siteId: string) {

    const options = { method: 'GET' }
    const response: GetComponentRequestServerResponse = await makeFetch(
        getApiUrl('siteComponents', siteId), options
    )

    return response
}

// Тип данных с ответом от пользователя
type GetComponentRequestServerResponse = FailResponse | SuccessResponse

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
    status: "success",
    data: {
        components: ComponentType[]
    }
}

type ComponentType = {
    uuid: string // "3294f0c7-396a-41ac-9441-5014c5af75cc",
    siteId: string // "60ca102ef8cfcc002074b3da",
    name: string // "Image",
    code: null | string // "<Image-code>"
}