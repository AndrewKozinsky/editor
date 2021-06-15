import {makeFetch} from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'
import store from 'src/store/store';

/**
 * Функция создаёт новый шаблон подключаемых файлов
 * @param {Object} values — данные для входа
 */
export default async function createNewTemplateRequest(values: CreateNewTemplateValuesType) {
    const newTemplateData = {
        siteId: values.siteId,
        name: values.name,
        codeInHead: {
            code: values.headCode
        },
        codeBeforeEndBody: {
            code: values.bodyCode
        },
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(newTemplateData)
    }
    const response: LoginRequestServerResponse = await makeFetch(
        getApiUrl('incFilesTemplates'), options
    )

    return response
}

// Данные для входа передаваемые в loginRequest
export type CreateNewTemplateValuesType = {
    siteId: string,
    name: string,
    headCode: null | string,
    bodyCode: null | string
}

// Тип данных с ответом от пользователя
type LoginRequestServerResponse = FailResponse | SuccessResponse

// Ошибочный ответ
type FailResponse = {
    status: "fail"
    errors: {
        field: null
        isOperational: true
        message: string // "Incorrect email or password"
        statusCode: 400
    }
}

// Успешный ответ
type SuccessResponse = {
    status: "success"
    data: {
        template: {
            _id: string
            name: string
            head: null | string
            body: null | string
        }
    }
}