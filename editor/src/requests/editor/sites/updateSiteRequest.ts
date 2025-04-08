import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import { SitesServerResponseType } from './sitesServerResponseType'
import StoreSitesTypes from 'store/site/sitesTypes'

// Данные для изменения сайта передаваемые в updateSiteRequest
export type UpdateSiteRequestValuesType = {
    name?: string, // название сайта
    defaultSiteTemplateId?: null | number // id шаблона подключаемых файлов по умолчанию
    defaultMetaTemplateId?: null | number // id шаблона метаданных по умолчанию
}

/**
 * Функция отправляет данные для обновления данных сайта
 * @param {Object} values — новые данные сайта
 * @param {Number} siteId — id изменяемого сайта
 */
export default async function updateSiteRequest(values: UpdateSiteRequestValuesType, siteId: StoreSitesTypes.CurrentSiteId) {
    const options = {
        method: 'PATCH',
        body: JSON.stringify(values)
    }

    return await makeFetch(getApiUrl('site', siteId), options) as SitesServerResponseType
}
