const JSON5 = require('json5')
import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import { ArticleRowServerRespType } from './articleServerResponseType'
import ArticleTypes from 'store/article/codeType/articleCodeType'

/**
 * Функция создаёт новую статью
 * @param {Number} siteId — id сайта, к которому принадлежит статья
 * @param {String} name — имя шаблона компонента
 */
export default async function createArticleRequest(
    siteId: number, name: string
) {
    // При создании новой статьи будет вставляться пустое содержимое
    const newArticleContent: ArticleTypes.Article = {
        dMeta: { dMaxCompId: 0 },
        dComps: []
    }
    // ТУТ ЛУЧШЕ ВОСПОЛЬЗОВАТЬСЯ МЕТОДОМ createArticle ИЗ ArticleManager

    const options = {
        method: 'POST',
        body: JSON.stringify({
            siteId,
            name,
            content: JSON5.stringify(newArticleContent)
        })
    }

    const response: ArticleRowServerRespType = await makeFetch(
        getApiUrl('articles'), options
    )

    return response
}
