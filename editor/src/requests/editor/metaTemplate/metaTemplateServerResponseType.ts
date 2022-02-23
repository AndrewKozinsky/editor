import ErrorServerResponseType from '../../errorServerResponseType'

// Успешный ответ от сервера при операциях с шаблонами сайта
type SuccessResponseType = {
    status: 'success',
    statusCode: number,
    data: {
        metaTemplates: MetaTemplate[]
    }
}

type MetaTemplate = {
    id: number // 7
    content: string // Code
    createdAt: Date
}

type MetaTemplateResponseType = ErrorServerResponseType | SuccessResponseType
export default MetaTemplateResponseType