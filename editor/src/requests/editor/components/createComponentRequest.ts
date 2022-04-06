import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import { ComponentRequestServerResponse } from './componentServerResponseType'
import StoreSitesTypes from 'store/site/sitesTypes'


/**
 * Функция создаёт новый шаблон компонента
 * @param {Number} siteId — id сайта компонента
 * @param {String} content — код шаблона компонента
 */
export default async function createComponentRequest(siteId: StoreSitesTypes.CurrentSiteId, content: null | string) {

    const options = {
        method: 'POST',
        body: JSON.stringify({
            siteId,
            content
        })
    }
    const response: ComponentRequestServerResponse = await makeFetch(
        getApiUrl('components'), options
    )
    return response
}
