import MetaType from 'editor/RightPart-1/ArticleSection/ArtForm/Meta/MetaType'
import ErrorServerResponseType from '../../errorServerResponseType'
import ArticleTypes from 'store/article/codeType/articleCodeType'


type CommonType<T, M> = {
    status: 'success',
    statusCode: number,
    data: {
        articles: ArticleType<T, M>[]
    }
}

export type ArticleType<T, M> = {
    id: number
    siteId: number
    name: null | string
    content: T | null
    siteTemplateId: null | number
    metaTemplateId: null | number
    meta: null | M
    createdAt: Date
}

// Типы ответов от сервера при операциях с папками компонентов
// Неразобранный
export type ArticleRowServerRespType = ErrorServerResponseType | CommonType<string, string>
// Разобранный
export type ArticleServerSuccessRespType = CommonType<ArticleTypes.Article, MetaType.Items>