import TempCompTypes from './codeType/tempCompCodeType'
import TempCompsTreeType from 'editor/LeftPart-2/TempComps/TempCompsTree/types'
import ArticleTypes from './codeType/articleCodeType'
import SiteTemplateTypes from './codeType/siteTemplateCodeType'

namespace StoreArticleTypes {
    export type HistoryItems = HistoryItem[]

    export type HistoryItem = {
        // Article
        article: ArticleTypes.Article
        // Flash rectangles coordinates
        hoveredElem: FlashedElem
        selectedElem: FlashedElem
        moveHoveredComp: FlashedElem
        moveSelectedComp: FlashedElem
    }

    export type FlashedTagType = null | 'element' | 'rootElement' | 'textComponent'
    export type FlashedElem = {
        tagType: FlashedTagType
        dataCompId: FlashedElemId
        dataElemId: FlashedElemId
    }

    export type FlashedElemId = null | ArticleTypes.Id

    // Components
    // export type TempComps = TempComp[]

    // A component template
    /*export type TempComp = {
        id: TempCompTypes.Id
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

    // Тип объекта возвращаемый функциями манипуляции компонентами (вставки, удаления, клонирования)
    // Этот объект требуется для экшена и редьюсера ставящий новый объект истории статьи
    export type CreateNewHistoryItem = {
        components: ArticleTypes.Components // Массив компонентов
        maxCompId: number // максимальный id
    }


    // =============================================

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
            name: string,
            siteId: number,
            siteTemplateId: number
        }
    }

    export const CHANGE_SITE_TEMPLATE_ID = 'CHANGE_SITE_TEMPLATE_ID'
    export type ChangeSiteTemplateIdAction = {
        type: typeof CHANGE_SITE_TEMPLATE_ID
        payload: number
    }

    export const CHANGE_SITE_TEMPLATE_VERSION_HASH = 'CHANGE_SITE_TEMPLATE_VERSION_HASH'
    export type ChangeSiteTemplateVersionHashAction = {
        type: typeof CHANGE_SITE_TEMPLATE_VERSION_HASH
    }

    // Set article object
    export const SET_SITE_TEMPLATE = 'SET_SITE_TEMPLATE'
    export type SetSiteTemplateAction = {
        type: typeof SET_SITE_TEMPLATE
        payload: SiteTemplateTypes.Template
    }

    // Увеличение хеша версии папок шаблонов компонентов. После этого хук запустит скачивание нового шаблона сайта
    export const CHANGE_TEMP_COMPS_FOLDERS_VERSION_HASH = 'CHANGE_TEMP_COMPS_FOLDERS_VERSION_HASH'
    export type ChangeTempCompsFoldersVersionHashAction = {
        type: typeof CHANGE_TEMP_COMPS_FOLDERS_VERSION_HASH
    }

    // Увеличение хеша версии папок шаблонов компонентов. После этого хук запустит скачивание нового шаблона сайта
    export const CHANGE_TEMP_COMPS_VERSION_HASH = 'CHANGE_TEMP_COMPS_VERSION_HASH'
    export type ChangeTempCompsVersionHashAction = {
        type: typeof CHANGE_TEMP_COMPS_VERSION_HASH
    }

    export const SET_TEMP_COMP_FOLDERS = 'SET_TEMP_COMP_FOLDERS'
    export type SetTempCompFoldersAction = {
        type: typeof SET_TEMP_COMP_FOLDERS
        payload: TempCompsTreeType.Items
    }

    // Типы типа и тип экшена
    // Set components templates array
    export const SET_TEMP_COMPS = 'SET_TEMP_COMPS'
    export type SetTempCompAction = {
        type: typeof SET_TEMP_COMPS
        payload: TempCompTypes.TempComps
    }

    export type FlashedElemType = 'hover' | 'select' | 'moveHover' | 'moveSelect'
    export const SET_FLASHED_ELEMENT = 'SET_FLASHED_ELEMENT'
    export type SetFlashedElementAction = {
        type: typeof SET_FLASHED_ELEMENT
        payload: {
            actionType: FlashedElemType
            tagType: StoreArticleTypes.FlashedTagType
            dataCompId: StoreArticleTypes.FlashedElemId
            dataElemId: StoreArticleTypes.FlashedElemId
        }
    }

    export const CREATE_AND_SET_HISTORY_ITEM = 'CREATE_AND_SET_HISTORY_ITEM'
    export type CreateAndSetHistoryItemAction = {
        type: typeof CREATE_AND_SET_HISTORY_ITEM
        payload: StoreArticleTypes.CreateNewHistoryItem
    }

    export const UPDATE_CURRENT_HISTORY_ITEM = 'UPDATE_CURRENT_HISTORY_ITEM'
    export type UpdateCurrentHistoryItemAction = {
        type: typeof UPDATE_CURRENT_HISTORY_ITEM
        payload: {
            itemDetails: StoreArticleTypes.CreateNewHistoryItem,
            setIsArticleSaved: boolean
        }
    }

    // Action changes a current history step
    export const MAKE_HISTORY_STEP = 'MAKE_HISTORY_STEP'
    export type MakeHistoryStepAction = {
        type: typeof MAKE_HISTORY_STEP
        payload: 'undo' | 'redo'
    }

    // Action changes a current history step
    export const SET_ARTICLE_IS_SAVED = 'SET_ARTICLE_IS_SAVED'
    export type setArticleIsSavedAction = {
        type: typeof SET_ARTICLE_IS_SAVED
    }

    // Очистка статьи
    export const CLEAR_ARTICLE = 'CLEAR_ARTICLE'
    export type ClearArticleAction = {
        type: typeof CLEAR_ARTICLE
    }

    // Скорректированы ли данные статьи (чтобы данные соответствовали шаблонам)
    export const SET_IS_ART_DATA_CORRECT = 'SET_IS_ART_DATA_CORRECT'
    export type SetIsArtDataCorrectAction = {
        type: typeof SET_IS_ART_DATA_CORRECT
        payload: boolean
    }


    export type ArticleAction =
        | SetLinksAction
        | SetArticleIdAction
        | SetArticleAction
        | ChangeSiteTemplateIdAction
        | ChangeSiteTemplateVersionHashAction
        | SetSiteTemplateAction
        | ChangeTempCompsFoldersVersionHashAction
        | ChangeTempCompsVersionHashAction
        | SetTempCompFoldersAction
        | SetTempCompAction
        | SetFlashedElementAction
        | CreateAndSetHistoryItemAction
        | UpdateCurrentHistoryItemAction
        | MakeHistoryStepAction
        | setArticleIsSavedAction
        | ClearArticleAction
        | SetIsArtDataCorrectAction
}

export default StoreArticleTypes
