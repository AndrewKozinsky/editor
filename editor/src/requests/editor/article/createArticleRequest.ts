const JSON5 = require('json5')
import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import { ArticleRowServerRespType } from './articleServerResponseType'
import articleManager from 'articleManager/articleManager'
import StoreSitesTypes from 'store/site/sitesTypes'

/**
 * Функция создаёт новую статью
 * @param {Number} siteId — id сайта, к которому принадлежит статья
 * @param {String} name — имя шаблона компонента
 * @param {Number} siteTemplateId — id шаблона сайта по умолчанию
 * @param {Number} metaTemplateId — id шаблона метаданных по умолчанию
 */
export default async function createArticleRequest(
    siteId: StoreSitesTypes.CurrentSiteId,
    name: string,
    siteTemplateId: StoreSitesTypes.CurrentSiteTemplateId,
    metaTemplateId: StoreSitesTypes.CurrentMetaTemplateId
) {
    // При создании новой статьи будет вставляться пустое содержимое
    const newArticleContent = articleManager.createArticle()

    const options = {
        method: 'POST',
        body: JSON.stringify({
            siteId,
            name,
            content: JSON5.stringify(newArticleContent),
            siteTemplateId,
            metaTemplateId
        })
    }

    const response: ArticleRowServerRespType = await makeFetch(
        getApiUrl('articles'), options
    )

    return response
}
