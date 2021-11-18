import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import StoreSitesTypes from 'store/site/sitesTypes'
import { ComponentRequestServerResponse } from './componentServerResponseType'

/** Функция удаляет шаблон компонента */
export default async function deleteComponentRequest(
    articleId: StoreSitesTypes.CurrentCompItemId
) {
    const options = { method: 'DELETE' }
    const response: ComponentRequestServerResponse = await makeFetch(
        getApiUrl('articles', articleId), options
    )

    return response
}

