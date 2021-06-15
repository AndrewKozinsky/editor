import {makeFetch} from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'

/**
 * Функция отправляет данные для входа пользователя в редактор
 * @param {String} siteId — id сайта
 * @param {String} name — название сайта
 * @param {String} defaultIncFilesTemplateId — id шаблона подключаемых файлов по умолчанию
 */
export default async function updateSiteRequest(
    siteId: string, name: string, defaultIncFilesTemplateId: null | string
) {
    const options = {
        method: 'PATCH',
        body: JSON.stringify({
            name,
            defaultIncFilesTemplateId,
            siteId
        })
    }
    const response: UpdateSiteRequestServerResponse = await makeFetch(getApiUrl('site', siteId), options)
    return response
}


// Тип данных с ответом от пользователя
type UpdateSiteRequestServerResponse = FailResponse | SuccessResponse

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
    data: {
        site: {
            defaultIncFilesTemplateId: null | string
            name: string
            userId: string
        }
    }
}