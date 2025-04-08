
// Тип данных отравляемых клиенту при операциях с сайтом
export interface ArticleResponseInterface {
    status: 'success'
    statusCode: number
    data: {
        articles: ArticleType[]
    }
}

type ArticleType = {
    id: number
    name: string
    content: string
    siteTemplateId: number
    metaTemplateId: number
    meta: string
    createdAt: Date
    updatedAt: Date
}
