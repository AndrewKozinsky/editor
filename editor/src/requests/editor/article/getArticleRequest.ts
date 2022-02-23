const JSON5 = require('json5')
import { makeFetch } from 'requests/reqFn/fetch'
import getApiUrl from 'requests/reqFn/apiUrls'
import {
    ArticleRowServerRespType,
    ArticleServerSuccessRespType
} from './articleServerResponseType'


/** Функция получает данные статьи */
export default async function getArticleRequest(articleId: number) {
    const options = { method: 'GET' }

    const rowResponse: ArticleRowServerRespType = await makeFetch(
        getApiUrl('article', articleId), options
    )

    // При успешном ответе нужно превратить данные статьи из строк в массив данных.
    // За это отвечает код ниже.
    if (rowResponse.status === 'success') {
        try {
            // Составление массива объектов из массива строк
            const parsedArticles = rowResponse.data.articles.map(article => {
                if (!article) return null

                return {
                    ...article,
                    content: JSON5.parse(article.content),
                    meta: JSON5.parse(article.meta),
                }
            })

            // Собрать новый объект ответа сервера с объектами полученными из строк
            let response: ArticleServerSuccessRespType = {
                ...rowResponse,
                data: {
                    articles: parsedArticles
                }
            }

            return response
        }
        catch (err) {}
    }
    else if (rowResponse.status === 'fail') {
        return rowResponse
    }
}
