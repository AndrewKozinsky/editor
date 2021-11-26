import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
// import ArticleTypes from 'store/article/codeType/articleCodeType'


import {ArticleRequestServerResponse} from './articleServerResponseType'

/**
 * Функция сохраняет имя статьи и id шаблона подключаемых файлов этой статьи
 * @param {String} articleId — id сохраняемой статьи
 * @param {String} name — название статьи
 * @param {String} siteTemplateId — id шаблона подключаемых файлов
 * @param {String} content — код статьи
 */
export async function updateArticleRequest(
    articleId: number,
    name?: string,
    siteTemplateId?: null | number,
    content?: null | string
) {
    const options = {
        method: 'PATCH',
        body: JSON.stringify({
            name,
            siteTemplateId,
            content
        })
    }
    const response: ArticleRequestServerResponse = await makeFetch(
        getApiUrl('article', articleId), options
    )

    return response
}
