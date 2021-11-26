import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import {ArticleRequestServerResponse} from './articleServerResponseType'


/** Функция получает данные статьи */
export default async function getArticleRequest(articleId: number) {

    const options = { method: 'GET' }
    const response: ArticleRequestServerResponse = await makeFetch(
        getApiUrl('article', articleId), options
    )

    return response
}