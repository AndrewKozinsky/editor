import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import StoreSitesTypes from 'store/site/sitesTypes'
import { DeleteComponentRequestServerResponse } from './componentServerResponseType'

/** Функция удаляет шаблон компонента */
export default async function deleteComponentRequest(currentCompItemId: StoreSitesTypes.CurrentCompItemId) {

    const options = { method: 'DELETE' }
    const response: DeleteComponentRequestServerResponse = await makeFetch(
        getApiUrl('component', currentCompItemId), options
    )

    return response
}

