import ErrorServerResponseType from '../../errorServerResponseType'

// Успешный ответ от сервера при операциях с шаблонами сайта
type SuccessResponseType = {
    status: 'success',
    statusCode: number,
    data: {
        siteTemplates: SiteTemplate[]
    }
}

type SiteTemplate = {
    id: number // 7
    content: string // Code
    createdAt: Date
}

type SiteTemplateResponseType = ErrorServerResponseType | SuccessResponseType
export default SiteTemplateResponseType