import ErrorServerResponseType from '../../errorServerResponseType'

// Успешный ответ от сервера при операциях с компонентами
type ArticleServerResponseType = {
    status: 'success',
    statusCode: number,
    data: {
        articles: ArticleType[]
    }
}

type ArticleType = {
    id: number
    siteId: number
    name: null | string
    content: null | string
    siteTemplateId: null | number
    createdAt: Date
}

// Тип данных с ответом от сервера
export type ArticleRequestServerResponse =
    ErrorServerResponseType | ArticleServerResponseType