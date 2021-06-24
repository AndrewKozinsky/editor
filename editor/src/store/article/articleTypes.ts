import TempCompTypes from './codeType/tempCompCodeType'
import ArticleTypes from './codeType/articleCodeType'

namespace StoreArticleTypes {

    // Components
    export type TempComps = TempComp[]

    // A component template
    export type TempComp = {
        uuid: string
        name: string
        code: TempCompTypes.TempComp
    }

    export type LinksObj = {
        $window:   StoreArticleTypes.WindowLink
        $document: StoreArticleTypes.DocumentLink
        $head:     StoreArticleTypes.HeadLink
        $body:     StoreArticleTypes.BodyLink
    }

    // IFrame window, document, head and body
    export type WindowLink = null | Window
    export type DocumentLink = null | HTMLDocument
    export type HeadLink = null | HTMLHeadElement
    export type BodyLink = null | HTMLBodyElement


    // Типы типа и тип экшена
    // Set components templates array
    export const SET_TEMP_COMPS = 'SET_TEMP_COMPS'
    export type SetTempCompAction = {
        type: typeof SET_TEMP_COMPS
        payload: StoreArticleTypes.TempComps
    }

    // Set article object
    export const SET_ARTICLE = 'SET_ARTICLE'
    export type SetArticleAction = {
        type: typeof SET_ARTICLE
        payload: ArticleTypes.Article
    }

    // Set article object
    export const SET_INC_FILES_TEMPLATE = 'SET_INC_FILES_TEMPLATE'
    export type SetIncFilesTemplateAction = {
        type: typeof SET_INC_FILES_TEMPLATE
        payload: {
            inHead: string
            beforeEndBody: string
        }
    }

    // Set links to iFrame elements
    export const SET_LINKS = 'SET_LINKS'
    export type SetLinksAction = {
        type: typeof SET_LINKS
        payload: {
            $window:   WindowLink
            $document: DocumentLink
            $head:     HeadLink
            $body:     BodyLink
        }
    }


    export type ArticleAction =
        | SetTempCompAction
        | SetArticleAction
        | SetIncFilesTemplateAction
        | SetLinksAction
}

export default StoreArticleTypes
