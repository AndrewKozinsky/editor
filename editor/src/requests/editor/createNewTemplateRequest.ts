import {makeFetch} from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'

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
            _id: string // "60c9a7fbfe73df002a1c4fbd"
            name: string // "Template name"
            userId: string // "60c626f9fd09180020febc99"
            siteId: string // "60c89dccfe73df002a1c4fa4"
            head: null | string
            body: null | string
            codeBeforeEndBody: {
                code: string // "</body>"
            }
            codeInHead: {
                code: string // "<head>"
            }
        }
    }
}