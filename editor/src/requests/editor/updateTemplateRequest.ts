import {makeFetch} from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'

/**
 * Функция создаёт новый шаблон подключаемых файлов
 * @param {Object} values — новые данные шаблона подключаемых файлов
 * @param {Object} templateId — id шаблона подключаемых файлов
 */
export default async function updateTemplateRequest(values: UpdateTemplateValuesType, templateId: string) {
    const templateData = {
        name: values.name,
        codeInHead: {
            code: values.headCode
        },
        codeBeforeEndBody: {
            code: values.bodyCode
        },
    }

    const options = {
        method: 'PATCH',
        body: JSON.stringify(templateData)
    }
    const response: UpdateTemplateRequestServerResponse = await makeFetch(
        getApiUrl('incFilesTemplate', templateId), options
    )

    return response
}

// Данные для входа передаваемые в loginRequest
export type UpdateTemplateValuesType = {
    name: string,
    headCode: null | string,
    bodyCode: null | string
}

// Тип данных с ответом от пользователя
type UpdateTemplateRequestServerResponse = FailResponse | SuccessResponse

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