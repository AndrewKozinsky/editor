import TempCompTypes from './codeType/tempCompCodeType'
import ArticleTypes from './codeType/articleCodeType'
import DragFilesTreeType from '../../libs/DragFilesTree/types'
import SiteTemplateTypes from './codeType/siteTemplateCodeType'
// import { CreateCompFnReturnType } from 'editor/RightPart-2/articleManager/insert'

namespace StoreArticleTypes {

    export type HistoryItems = HistoryItem[]

    export type HistoryItem = {
        // Articles
        article: ArticleTypes.Article
        // Flash rectangles coordinates
        hoveredElem: FlashedElem
        selectedElem: FlashedElem
        moveHoveredComp: MoveFlashedElem
        moveSelectedComp: MoveFlashedElem
        // Current text component
        selectedTextComp: SelectedTextComp
    }

    export type FlashedElem = {
        dataCompId: FlashedElemId
        dataElemId: FlashedElemId
    }
    export type MoveFlashedElem = {
        dataCompId: FlashedElemId
    }

    export type SelectedTextComp = {
        dataCompId: FlashedElemId
    }

    export type FlashedElemId = null | ArticleTypes.Id

    // Components
    // export type TempComps = TempComp[]

    // A component template
    /*export type TempComp = {
        id: number
        name: string
        code: TempCompTypes.TempComp
    }*/

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


    // =============================================

    // Типы типа и тип экшена
    // Set components templates array
    // export const CLEAR_ARTICLE = 'CLEAR_ARTICLE'
    // export type ClearArticleAction = {
    //     type: typeof CLEAR_ARTICLE
    // }

    // Set components templates array
    export const SET_ARTICLE_ID = 'SET_ARTICLE_ID'
    export type SetArticleIdAction = {
        type: typeof SET_ARTICLE_ID,
        payload: number
    }

    // Set article object
    export const SET_ARTICLE = 'SET_ARTICLE'
    export type SetArticleAction = {
        type: typeof SET_ARTICLE
        payload: {
            article: ArticleTypes.Article,
            siteId: number,
            siteTemplateId: number
        }
    }

    // Типы типа и тип экшена
    // Set components templates array
    export const SET_TEMP_COMPS = 'SET_TEMP_COMPS'
    export type SetTempCompAction = {
        type: typeof SET_TEMP_COMPS
        payload: TempCompTypes.TempComps
    }

    // Set article object
    export const SET_SITE_TEMPLATE = 'SET_SITE_TEMPLATE'
    export type SetSiteTemplateAction = {
        type: typeof SET_SITE_TEMPLATE
        payload: SiteTemplateTypes.Template
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

    export type FlashedElemType = 'hover' | 'select' | 'moveHover' | 'moveSelect'
    export const SET_FLASHED_ELEMENT = 'SET_FLASHED_ELEMENT'
    export type SetFlashedElementAction = {
        type: typeof SET_FLASHED_ELEMENT
        payload: {
            actionType: FlashedElemType,
            dataCompId: StoreArticleTypes.FlashedElemId,
            dataElemId: StoreArticleTypes.FlashedElemId
        }
    }


    export const SET_TEMP_COMP_FOLDERS = 'SET_TEMP_COMP_FOLDERS'
    export type SetTempCompFoldersAction = {
        type: typeof SET_TEMP_COMP_FOLDERS
        payload: DragFilesTreeType.Items
    }

    //
    // export const CREATE_AND_SET_HISTORY_ITEM = 'CREATE_AND_SET_HISTORY_ITEM'
    /*export type CreateAndSetHistoryItemAction = {
        type: typeof CREATE_AND_SET_HISTORY_ITEM
        payload: CreateCompFnReturnType
    }*/

    // Action changes a current history step
    // export const MAKE_HISTORY_STEP = 'MAKE_HISTORY_STEP'
    /*export type MakeHistoryStepAction = {
        type: typeof MAKE_HISTORY_STEP
        payload: 'undo' | 'redo'
    }*/

    // Action changes a current history step
    // export const SET_HISTORY_STEP_WHEN_ARTICLE_WAS_SAVED = 'SET_HISTORY_STEP_WHEN_ARTICLE_WAS_SAVED'
    /*export type SetHistoryStepWhenArticleWasSavedAction = {
        type: typeof SET_HISTORY_STEP_WHEN_ARTICLE_WAS_SAVED
    }*/

    // Set components templates array
    export const SET_ARTICLE_DATA_PREPARED = 'SET_ARTICLE_DATA_PREPARED'
    export type SetArticleDataPreparedAction = {
        type: typeof SET_ARTICLE_DATA_PREPARED,
        payload: boolean
    }

    // Установка id выделенного текстового компонента
    export const SET_TEXT_COMP_ID = 'SET_TEXT_COMP_ID'
    export type SetTextCompIdAction = {
        type: typeof SET_TEXT_COMP_ID,
        payload: number | null
    }


    export type ArticleAction =
        // | ClearArticleAction
        | SetArticleIdAction
        | SetArticleAction
        | SetTempCompAction
        | SetSiteTemplateAction
        | SetLinksAction
        | SetFlashedElementAction
        | SetTempCompFoldersAction
    //     | CreateAndSetHistoryItemAction
    //     | MakeHistoryStepAction
    //     | SetHistoryStepWhenArticleWasSavedAction
        | SetArticleDataPreparedAction
        | SetTextCompIdAction
}

export default StoreArticleTypes
