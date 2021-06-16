import {makeFetch} from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import StoreSitesTypes from 'store/site/sitesTypes'

/** Функция удаляет шаблоны компонента выделенный в списке всех компонентов */
export default async function deleteComponentRequest(currentCompItemId: StoreSitesTypes.CurrentCompItemId) {

    const options = { method: 'DELETE' }
    const response: DeleteComponentRequestServerResponse = await makeFetch(
        getApiUrl('component', currentCompItemId), options
    )

    return response
}

// Тип данных с ответом от пользователя
type DeleteComponentRequestServerResponse = FailResponse | SuccessResponse

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
}