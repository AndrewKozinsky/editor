import {makeFetch} from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'

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
    console.log(response)
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
            _id: string // "60c9b2438e886a003b669911"
            userId: string //"60c626f9fd09180020febc99"
            siteId: string // "60c89dccfe73df002a1c4fa4"
            name: string // "Шаблон"
            codeBeforeEndBody: {
                code: null | string // "</body>"
            }
            codeInHead: {
                code: null | string // "<head>"
            }
        }
    }
}