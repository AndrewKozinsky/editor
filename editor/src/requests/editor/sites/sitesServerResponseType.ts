import ErrorServerResponseType from 'requests/errorServerResponseType'

export type SuccessServerResponseType = {
    status: 'success',
    statusCode: number,
    data: {
        sites: SiteType[]
    }
}

type SiteType = {
    id: number
    name: string // "РУСХИТ"
    userId: number // 2
    createdAt: string
    defaultSiteTemplateId: null | number
    defaultMetaTemplateId: null | number
}

// Типы ответов от сервера при операциях с сайтами
export type SitesServerResponseType = ErrorServerResponseType | SuccessServerResponseType
