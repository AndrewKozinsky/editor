// import {useFetch} from 'requests/reqFn/fetch'
// import getApiUrl from 'requests/reqFn/apiUrls'
import { makeFetch } from '../../reqFn/fetch'
import getApiUrl from '../../reqFn/apiUrls'
import ErrorServerResponseType from 'requests/errorServerResponseType'
import SiteTemplateServerResponseType from './siteTemplateServerResponseType'

// Хук удаляет шаблон подключаемых файлов
/*export function useDeleteIncFilesTemplate() {

    // id выделенного шаблона, который нужно удалить
    const { currentSiteId } = useSelector((store: AppStateType) => store.sites)
    const { currentTemplateId } = useSelector((store: AppStateType) => store.sites.siteTemplatesSection)

    // Параметры запроса
    const options = { method: 'DELETE'}

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: response, doFetch} =
        useFetch<DeleteIncFilesTemplateServerResponse>(
            getApiUrl('siteTemplate', currentSiteId, currentTemplateId), options
        )

    return { response, doFetch }
}*/



/**
 * Функция удаляет шаблон сайта
 * @param {Object} templateId — id удаляемого шаблона
 */
export default async function deleteSiteTemplateRequest(templateId: number) {
    const options = {
        method: 'DELETE'
    }

    const response: DeleteSiteTemplateServerResponse = await makeFetch(
        getApiUrl('siteTemplate', templateId), options
    )

    return response
}

// Тип данных с ответом от пользователя
type DeleteSiteTemplateServerResponse = ErrorServerResponseType | SiteTemplateServerResponseType

