import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import {ArticleRequestServerResponse} from './articleServerResponseType'

/**
 * Функция создаёт новую статью
 * @param {Number} siteId — id сайта, к которому принадлежит статья
 * @param {String} name — имя шаблона компонента
 */
export default async function createArticleRequest(
    siteId: number, name: string
) {
    const options = {
        method: 'POST',
        body: JSON.stringify({ siteId, name })
    }

    const response: ArticleRequestServerResponse = await makeFetch(
        getApiUrl('articles'), options
    )

    return response
}
