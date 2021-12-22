import DragFilesTreeType from 'libs/DragFilesTree/types'
import ArticleTypes from '../article/codeType/articleCodeType'

namespace StoreSitesTypes {

    // САЙТЫ (ТИПЫ) ===================================================================
    // Сайт
    export type SiteType = {
        id: number,
        name: string,
        // id шаблона подключаемого файла применяемый по умолчанию при создании статьи для этого сайта
        defaultSiteTemplateId: null | number
    }
    // Сайты
    export type SitesType = SiteType[]
    // id выбранного сайта
    export type CurrentSiteId = null | number | ''

    // ПРАВЫЕ ВКЛАДКИ =================================================================

    // id открытой вкладки на правой части
    export type RightMainTab = number

    // ШАБЛОНЫ ПОДКЛЮЧАЕМЫХ ФАЙЛОВ (ТИПЫ) =============================================

    // Шаблон подключаемых файлов
    export type SiteTemplateType = {
        id: number,
        name: string
        content: string
    }
    // Массив шаблонов подключаемых файлов
    export type SiteTemplatesType = SiteTemplateType[]
    // id выбранного шаблона подключаемых файлов
    export type CurrentSiteTemplateId = null | number | ''

    // ПАПКИ С КОМПОНЕНТАМИ (ТИПЫ) ====================================================

    // Объект с данными папки с компонентами
    export type CompFolderSection = {
        compFolderId: null | number
        compFolder: DragFilesTreeType.Items
    }

    // ПАПКИ СО СТАТЬЯМИ (ТИПЫ) =======================================================

    // Объект с данными папки со статьями
    export type ArtFolderSection = {
        artFolderId: null | number
        artFolder: DragFilesTreeType.Items
    }

    // КОМПОНЕНТЫ (ТИПЫ) ==============================================================

    // id выбранного элемента: папки или компонента
    export type CurrentCompItemId = null | number
    // Тип выбранного шаблона компонента (папка или компонент)
    export type CurrentCompItemType = null | DragFilesTreeType.ItemType
    // Имя выбранного компонента
    export type ComponentName = null | string
    // Строка с кодом выбранного шаблона компонента
    export type ComponentCode = null | string

    // Объект с данными компонента
    export type ComponentSection = {
        currentCompItemId: CurrentCompItemId
        currentCompItemType: CurrentCompItemType
        currentCompName: ComponentName
        currentCompCode: ComponentCode
    }

    // СТАТЬИ (ТИПЫ) ==================================================================

    // id выбранного элемента: папки или статьи
    export type CurrentArtItemId = null | number
    // Тип выбранного элемента (папка или компонент)
    export type CurrentArtItemType = null | DragFilesTreeType.ItemType
    // Имя выбранной статьи
    export type ArticleName = null | string
    // Строка с кодом выбранной статьи
    export type ArticleCode = null | ArticleTypes.Article

    // Объект с данными статьи
    export type ArticleSection = {
        currentArtItemId: CurrentArtItemId
        currentArtItemType: CurrentArtItemType
        currentArtName: ArticleName
        currentArtCode: ArticleCode,
        siteTemplateId: CurrentSiteTemplateId
    }

    // САЙТЫ (ЭКШЕНЫ) =================================================================

    // Типы типа и тип экшена
    // Установка массива сайтов
    export const SET_SITES = 'SET_SITES'
    export type SetSitesAction = {
        type: typeof SET_SITES
        payload: SitesType
    }

    // Установка id выбранного сайта
    export const SET_CURRENT_SITE_ID = 'SET_CURRENT_SITE_ID'
    export type SetCurrentSiteIdAction = {
        type: typeof SET_CURRENT_SITE_ID
        payload: CurrentSiteId
    }

    // ПРАВЫЕ ВКЛАДКИ (ЭКШЕНЫ) ========================================================

    // Установка id текущей основной вкладки справа
    export const SET_RIGHT_MAIN_TAB = 'SET_RIGHT_MAIN_TAB'
    export type SetRightMainTabAction = {
        type: typeof SET_RIGHT_MAIN_TAB
        payload: RightMainTab
    }

    // ШАБЛОНЫ ПОДКЛЮЧАЕМЫХ ФАЙЛОВ (ЭКШЕНЫ) ===========================================

    // Установка массива шаблонов подключаемых файлов
    export const SET_SITE_TEMPLATES = 'SET_SITE_TEMPLATES'
    export type SetSiteTemplatesAction = {
        type: typeof SET_SITE_TEMPLATES
        payload: SiteTemplatesType
    }

    // Установка id выбранного шаблона подключаемых файлов
    export const SET_CURRENT_SITE_TEMPLATE_ID = 'SET_CURRENT_SITE_TEMPLATE_ID'
    export type SetCurrentSiteTemplateIdAction = {
        type: typeof SET_CURRENT_SITE_TEMPLATE_ID
        payload: CurrentSiteTemplateId
    }

    // ПАПКИ С КОМПОНЕНТАМИ (ЭКШЕНЫ) ==================================================

    export const SET_COMP_FOLDER = 'SET_COMP_FOLDER'
    export type SetCompFolderAction = {
        type: typeof SET_COMP_FOLDER
        payload: SetCompFolderActionPayload
    }
    export type SetCompFolderActionPayload = {
        id?: number
        folders: DragFilesTreeType.Items
    }

    // ПАПКИ СО СТАТЬЯМИ (ЭКШЕНЫ) =====================================================

    export const SET_ART_FOLDER = 'SET_ART_FOLDER'
    export type SetArtFolderAction = {
        type: typeof SET_ART_FOLDER
        payload: SetArtFolderActionPayload
    }
    export type SetArtFolderActionPayload = {
        id?: number
        folders: DragFilesTreeType.Items
    }

    // КОМПОНЕНТЫ (ЭКШЕНЫ) ============================================================

    // Установка id выбранного шаблона компонента
    export const SET_CURRENT_COMP = 'SET_CURRENT_COMP'
    export type SetCurrentCompAction = {
        type: typeof SET_CURRENT_COMP
        payload: {
            id: null | DragFilesTreeType.Id
            type: null | DragFilesTreeType.ItemType
            name?: string
            code?: string
        }
    }

    // СТАТЬИ (ЭКШЕНЫ) ================================================================

    // Установка id выбранной папки или статьи
    export const SET_CURRENT_ART = 'SET_CURRENT_ART'
    export type SetCurrentArtAction = {
        type: typeof SET_CURRENT_ART
        payload: {
            id: null | DragFilesTreeType.Id
            type: null | DragFilesTreeType.ItemType
            name?: string
            code?: ArticleTypes.Article
            siteTemplateId?: null | number
        }
    }

    // Установка id выбранной папки или статьи
    export const SET_CURRENT_ART_ITEM_ID = 'SET_CURRENT_ART_ITEM_ID'
    export type SetCurrentArtItemIdAction = {
        type: typeof SET_CURRENT_ART_ITEM_ID
        payload: CurrentArtItemId
    }


    export type SitesAction =
        | SetSitesAction
        | SetCurrentSiteIdAction
        | SetRightMainTabAction
        | SetSiteTemplatesAction
        | SetCurrentSiteTemplateIdAction

        | SetCompFolderAction
        | SetArtFolderAction

        | SetCurrentCompAction
        | SetCurrentArtAction
        | SetCurrentArtItemIdAction
}

export default StoreSitesTypes
