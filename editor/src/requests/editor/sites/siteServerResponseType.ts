
// Успешный ответ от сервера при операциях с сайтами
type SiteServerResponseType = {
    status: 'success',
    statusCode: number,
    data: {
        sites: SiteType[]
    }
}

export default SiteServerResponseType


type SiteType = {
    status: 'success'
    data: {
        site: {
            id: number // 7
            name: string // "РУСХИТ"
            userId: number // 2
            defaultSiteTemplateId: null | number
        }
    }
}
