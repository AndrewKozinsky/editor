
// Тип данных отравляемых клиенту при операциях с сайтом
export interface SiteTemplatesResponseInterface {
    status: 'success'
    statusCode: number
    data: {
        siteTemplates: SiteTemplateType[]
    }
}

type SiteTemplateType = {
    id: number
    content: string
    createdAt: Date
}
