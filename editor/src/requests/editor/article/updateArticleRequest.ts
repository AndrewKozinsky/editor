import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import StoreSitesTypes from 'store/site/sitesTypes'
import { MiscTypes } from 'types/miscTypes'
import MetaType from 'editor/RightPart-1/ArticleSection/ArtForm/Meta/MetaType'
import { ArticleRowServerRespType } from './articleServerResponseType'


/**
 * Функция сохраняет имя статьи и id шаблона подключаемых файлов этой статьи
 * @param {String} articleId — id сохраняемой статьи
 * @param {Object} details — данные статьи
 */
export async function updateArticleRequest(
    articleId: StoreSitesTypes.CurrentArtItemId,
    details: {
        name?: string, // название статьи
        siteTemplateId?: null | number, // id шаблона подключаемых файлов
        metaTemplateId?: number | '', //
        meta?: MetaType.Items
        content?: ArticleTypes.Article // код статьи
    }
) {
    const body: MiscTypes.ObjStringKey<any> = {}

    if (details.name !== undefined) body.name = details.name
    if (details.siteTemplateId !== undefined) body.siteTemplateId = details.siteTemplateId
    if (details.metaTemplateId !== undefined) body.metaTemplateId = details.metaTemplateId
    if (details.meta !== undefined) body.meta = JSON.stringify(details.meta)
    if (details.content !== undefined) body.content = JSON.stringify(details.content)

    const options = {
        method: 'PATCH',
        body: JSON.stringify(body)
    }

    const response: ArticleRowServerRespType = await makeFetch(
        getApiUrl('article', articleId), options
    )

    return response
}
