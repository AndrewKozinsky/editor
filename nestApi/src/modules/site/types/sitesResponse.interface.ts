
// Тип данных отравляемых клиенту при операциях с сайтом
export interface SitesResponseInterface {
    status: 'success'
    statusCode: number
    data: {
        sites: SiteType[]
    }
}

type SiteType = {
    id: number
    name: string
    defaultSiteTemplateId: null | number
    defaultMetaTemplateId: null | number
    createdAt: Date
}