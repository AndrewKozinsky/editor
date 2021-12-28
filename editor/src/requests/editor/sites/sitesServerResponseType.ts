import ErrorServerResponseType from 'requests/errorServerResponseType'

type SuccessServerResponseType = {
    status: 'success',
    statusCode: number,
    data: {
        sites: SiteType[]
    }
}

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

// Типы ответов от сервера при операциях с сайтами
export type SitesServerResponseType = ErrorServerResponseType | SuccessServerResponseType
