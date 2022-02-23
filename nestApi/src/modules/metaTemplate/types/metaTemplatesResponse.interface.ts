
// Тип данных отравляемых клиенту при операциях с сайтом
export interface MetaTemplatesResponseInterface {
    status: 'success'
    statusCode: number
    data: {
        metaTemplates: MetaTemplateType[]
    }
}

type MetaTemplateType = {
    id: number
    content: string
    createdAt: Date
}
