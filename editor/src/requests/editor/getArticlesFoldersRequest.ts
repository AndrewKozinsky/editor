import {makeFetch, useFetch} from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import FilesTreeType from 'libs/FilesTree/types'
import store from 'store/store'
import {useSelector} from 'react-redux';
import {AppState} from 'src/store/rootReducer';


// Функция удаляет сайт
export function useGetArticlesFoldersRequest() {
    // id текущего сайта
    const {currentSiteId} = useSelector((store: AppState) => store.sites)

    // Параметры запроса
    const options = { method: 'GET'}

    // Хук делающий запрос данных с сервера на получение папок с компонентами
    const {data: articlesResponse, doFetch: doArticlesFetch} =
        useFetch<GetArticlesFoldersServerResponse>(getApiUrl('articlesFolders', currentSiteId), options)

    return {
        articlesResponse,
        doArticlesFetch
    }
}


// Тип данных с ответом от пользователя
export type GetArticlesFoldersServerResponse = FailResponse | SuccessResponse

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
        folders: {
            content: string
        }
    }
}