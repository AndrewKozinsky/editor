import TempCompTypes from './codeType/tempCompCodeType'
import ArticleTypes from './codeType/articleCodeType'
import DragFilesTreeType from 'libs/DragFilesTree/types'
import SiteTemplateTypes from './codeType/siteTemplateCodeType'

namespace StoreArticleTypes {

    export type HistoryItems = HistoryItem[]

    export type HistoryItem = {
        // Article
        article: ArticleTypes.Article
        // Flash rectangles coordinates
        hoveredElem: FlashedElem
        selectedElem: FlashedElem
        moveHoveredComp: MoveFlashedComp
        moveSelectedComp: MoveFlashedComp
        // Current text component
        selectedTextComp: SelectedTextComp
    }

    export type FlashedTagType = null | 'element' | 'rootElement' | 'component'
    export type FlashedElem = {
        tagType: FlashedTagType
        dataCompId: FlashedElemId
        dataElemId: FlashedElemId
    }
    export type MoveFlashedComp = {
        dataCompId: FlashedElemId
    }

    export type SelectedTextComp = {
        dataCompId: FlashedElemId
    }

    export type FlashedElemId = null | ArticleTypes.Id

    // Components
    export type TempComps = TempComp[]

    // A component template
    export type TempComp = {
        id: number
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

    export type PressedKeyType = null | string
    export type PressedKey = {
        code: PressedKeyType, // Тип клавиши. null обозначает необрабатываемую клавишу, Text символьная, остальные значения берутся из e.code
        value?: string // Если code Letter, то сюда заносится значение символа
        altKey: boolean
        ctrlKey: boolean
        shiftKey: boolean
    }

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

    // Установка данных последней введённого символа
    export const SET_PRESSED_KEY = 'SET_PRESSED_KEY'
    export type SetPressedKeyAction = {
        type: typeof SET_PRESSED_KEY,
        payload: PressedKey
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
        payload: DragFilesTreeType.Items
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

    // Установка id выделенного текстового компонента
    export const SET_TEXT_COMP_ID = 'SET_TEXT_COMP_ID'
    export type SetTextCompIdAction = {
        type: typeof SET_TEXT_COMP_ID,
        payload: number | null
    }

    export const CREATE_AND_SET_HISTORY_ITEM = 'CREATE_AND_SET_HISTORY_ITEM'
    export type CreateAndSetHistoryItemAction = {
        type: typeof CREATE_AND_SET_HISTORY_ITEM
        payload: StoreArticleTypes.CreateNewHistoryItem
    }

    // Action changes a current history step
    export const MAKE_HISTORY_STEP = 'MAKE_HISTORY_STEP'
    export type MakeHistoryStepAction = {
        type: typeof MAKE_HISTORY_STEP
        payload: 'undo' | 'redo'
    }

    // Action changes a current history step
    export const SET_HISTORY_STEP_WHEN_ARTICLE_WAS_SAVED = 'SET_HISTORY_STEP_WHEN_ARTICLE_WAS_SAVED'
    export type SetHistoryStepWhenArticleWasSavedAction = {
        type: typeof SET_HISTORY_STEP_WHEN_ARTICLE_WAS_SAVED
    }

    // Установка id выделенного текстового компонента
    export const UPDATE_CURRENT_ARTICLE = 'UPDATE_CURRENT_ARTICLE'
    export type UpdateCurrentArticleAction = {
        type: typeof UPDATE_CURRENT_ARTICLE,
        payload: HistoryItem
    }

    // Очистка статьи
    export const CLEAR_ARTICLE = 'CLEAR_ARTICLE'
    export type ClearArticleAction = {
        type: typeof CLEAR_ARTICLE
    }


    export type ArticleAction =
        | SetLinksAction
        | SetPressedKeyAction
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
        | SetTextCompIdAction
        | CreateAndSetHistoryItemAction
        | MakeHistoryStepAction
        | SetHistoryStepWhenArticleWasSavedAction
        | UpdateCurrentArticleAction
        | ClearArticleAction
}

export default StoreArticleTypes
