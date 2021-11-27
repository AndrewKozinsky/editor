import ErrorServerResponseType from '../../errorServerResponseType'
import ArticleTypes from 'store/article/codeType/articleCodeType'


type CommonType<T> = {
    status: 'success',
    statusCode: number,
    data: {
        articles: ArticleType<T>[]
    }
}

export type ArticleType<T> = {
    id: number
    siteId: number
    name: null | string
    content: T | null
    siteTemplateId: null | number
    createdAt: Date
}

// Типы ответов от сервера при операциях с папками компонентов
// Неразобранный
export type ArticleRowServerRespType = ErrorServerResponseType | CommonType<string>
// Разобранный
export type ArticleServerSuccessRespType = CommonType<ArticleTypes.Article>