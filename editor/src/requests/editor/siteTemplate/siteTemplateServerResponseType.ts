
// Успешный ответ от сервера при операциях с шаблонами сайта
type SiteTemplateServerResponseType = {
    status: 'success',
    statusCode: number,
    data: {
        siteTemplates: SiteTemplate[]
    }
}

export default SiteTemplateServerResponseType

type SiteTemplate = {
    id: number // 7
    content: string // Code
    createdAt: Date
}