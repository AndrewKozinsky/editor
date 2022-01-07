import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import { MiscTypes } from '../../../types/miscTypes'
import { ArticleRowServerRespType } from './articleServerResponseType'


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
    content?: ArticleTypes.Article
) {
    const body: MiscTypes.ObjStringKey<any> = {}

    if (name !== undefined) body.name = name
    if (siteTemplateId !== undefined) body.siteTemplateId = siteTemplateId
    if (content !== undefined) body.content = JSON.stringify(content)

    const options = {
        method: 'PATCH',
        body: JSON.stringify(body)
    }

    const response: ArticleRowServerRespType = await makeFetch(
        getApiUrl('article', articleId), options
    )

    return response
}
