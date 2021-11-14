import { makeFetch, useFetch } from 'src/requests/reqFn/fetch'
import getApiUrl from 'src/requests/reqFn/apiUrls'
import ErrorServerResponseType from '../../errorServerResponseType'
import SiteTemplateServerResponseType from '../siteTemplate/siteTemplateServerResponseType'
import CompFolderServerResponseType from './compFolderServerResponseType'


// Функция удаляет сайт
// I DON'T WANT TO USE REQUEST FUNCTIONS WITH SIDE EFFECTS
/*export function useGetComponentsFoldersRequest() {
    // id текущего сайта
    const {currentSiteId} = useSelector((store: AppStateType) => store.sites)

    // Параметры запроса
    const options = { method: 'GET'}

    // Хук делающий запрос данных с сервера на получение папок с компонентами
    const {data: componentsResponse, doFetch: doComponentsFetch} =
        useFetch<GetComponentsFoldersServerResponse>(getApiUrl('componentsFolders', currentSiteId), options)

    return {
        componentsResponse,
        doComponentsFetch
    }
}*/

export async function getCompFolderRequest(siteId: number) {
    const options = { method: 'GET'}

    const response: GetCompFolderServerResponse = await makeFetch(
        getApiUrl('compFoldersBySite', siteId), options
    )

    return response
}


// Тип данных с ответом от пользователя
export type GetCompFolderServerResponse = ErrorServerResponseType | CompFolderServerResponseType
