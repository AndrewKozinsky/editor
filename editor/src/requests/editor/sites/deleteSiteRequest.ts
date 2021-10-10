import { useFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import SiteServerResponseType from './siteServerResponseType'
import ErrorServerResponseType from '../../errorServerResponseType'


// Функция удаляет сайт
export function useDeleteSite() {

    // id выделенного сайта, который нужно удалить
    const { currentSiteId } = useGetSitesSelectors()

    // Параметры запроса
    const options = { method: 'DELETE' }

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: response, doFetch} =
        useFetch<DeleteSiteServerResponse>(getApiUrl('site', currentSiteId), options)

    return { response, doFetch }
}


// Тип данных с ответом от пользователя
type DeleteSiteServerResponse = null | ErrorServerResponseType | SiteServerResponseType

