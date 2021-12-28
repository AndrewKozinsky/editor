import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import StoreSitesTypes from 'store/site/sitesTypes'
import { ArticleRowServerRespType } from './articleServerResponseType'

/** Функция удаляет статью выделенную в списке всех статей */
export default async function deleteArticleRequest(
    articleId: StoreSitesTypes.CurrentArtItemId
) {
    const options = { method: 'DELETE' }
    const response: ArticleRowServerRespType = await makeFetch(
        getApiUrl('article', articleId), options
    )

    return response
}
