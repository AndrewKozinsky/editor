import MetaType from 'editor/RightPart-1/ArticleSection/ArtForm/Meta/MetaType'
import ArticleTypes from '../article/codeType/articleCodeType'
import FilesTreeType from 'types/FilesTreeType'

namespace StoreSitesTypes {

    // САЙТЫ (ТИПЫ) ===================================================================
    // Сайты
    export type SitesType = Site[]
    // Сайт
    export type Site = {
        id: number,
        name: string,
        // id шаблона подключаемого файла применяемый по умолчанию при создании статьи для этого сайта
        defaultSiteTemplateId: null | number
        // id шаблона метаданных применяемый по умолчанию при создании статьи для этого сайта
        defaultMetaTemplateId: null | number
    }
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
    // id выбранного шаблона подключаемых файлов (пустая строка ставится при создании нового шаблона)
    export type CurrentSiteTemplateId = null | number | ''

    // ШАБЛОНЫ САЙТА (ТИПЫ)
    export type SiteTemplatesSection = {
        templates: SiteTemplatesType
        currentTemplateId: CurrentSiteTemplateId
    }

    // МЕТАДАННЫЕ (ТИПЫ)
    // Шаблон подключаемых файлов
    export type MetaTemplateType = {
        id: number,
        name: string
        content: string
    }
    // Массив шаблонов подключаемых файлов
    export type MetaTemplatesType = MetaTemplateType[]
    // id выбранного шаблона подключаемых файлов (пустая строка ставится при создании нового шаблона)
    export type CurrentMetaTemplateId = null | number | ''

    export type MetaTemplatesSection = {
        templates: MetaTemplatesType
        currentTemplateId: CurrentMetaTemplateId
    }

    // ПАПКИ С КОМПОНЕНТАМИ (ТИПЫ) ====================================================

    // Объект с данными папки с компонентами
    export type CompFolderSection = {
        compFolderId: null | number
        compFolder: FilesTreeType.Items
    }

    // ПАПКИ СО СТАТЬЯМИ (ТИПЫ) =======================================================

    // Объект с данными папки со статьями
    export type ArtFolderSection = {
        artFolderId: null | number
        artFolder: FilesTreeType.Items
    }

    // КОМПОНЕНТЫ (ТИПЫ) ==============================================================

    // id выбранного элемента: папки или компонента
    export type CurrentCompItemId = null | FilesTreeType.ItemId
    // Тип выбранного шаблона компонента (папка или компонент)
    export type CurrentCompItemType = null | FilesTreeType.ItemType
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
    export type CurrentArtItemId = null | FilesTreeType.ItemId
    // Тип выбранного элемента (папка или компонент)
    export type CurrentArtItemType = null | FilesTreeType.ItemType
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
        siteTemplateId: CurrentSiteTemplateId,
        metaTemplateId: CurrentMetaTemplateId
        meta: null | MetaType.Items
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


    // ШАБЛОНЫ МЕТАДАННЫХ (ЭКШЕНЫ) ===========================================

    // Установка массива шаблонов метаданных
    export const SET_META_TEMPLATES = 'SET_META_TEMPLATES'
    export type SetMetaTemplatesAction = {
        type: typeof SET_META_TEMPLATES
        payload: MetaTemplatesType
    }

    // Установка id выбранного шаблона метаданных
    export const SET_CURRENT_META_TEMPLATE_ID = 'SET_CURRENT_META_TEMPLATE_ID'
    export type SetCurrentMetaTemplateIdAction = {
        type: typeof SET_CURRENT_META_TEMPLATE_ID
        payload: CurrentMetaTemplateId
    }

    // ПАПКИ С КОМПОНЕНТАМИ (ЭКШЕНЫ) ==================================================

    export const SET_COMP_FOLDER = 'SET_COMP_FOLDER'
    export type SetCompFolderAction = {
        type: typeof SET_COMP_FOLDER
        payload: SetCompFolderActionPayload
    }
    export type SetCompFolderActionPayload = {
        id?: number
        folders: FilesTreeType.Items
    }

    // ПАПКИ СО СТАТЬЯМИ (ЭКШЕНЫ) =====================================================

    export const SET_ART_FOLDER = 'SET_ART_FOLDER'
    export type SetArtFolderAction = {
        type: typeof SET_ART_FOLDER
        payload: SetArtFolderActionPayload
    }
    export type SetArtFolderActionPayload = {
        id?: number
        folders: FilesTreeType.Items
    }

    // КОМПОНЕНТЫ (ЭКШЕНЫ) ============================================================

    // Установка id выбранного шаблона компонента
    export const SET_CURRENT_COMP = 'SET_CURRENT_COMP'
    export type SetCurrentCompAction = {
        type: typeof SET_CURRENT_COMP
        payload: {
            id: null | FilesTreeType.ItemId
            type: null | FilesTreeType.ItemType
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
            id: null | FilesTreeType.ItemId
            type: null | FilesTreeType.ItemType
            name?: string
            code?: ArticleTypes.Article
            siteTemplateId?: CurrentSiteTemplateId
            metaTemplateId?: CurrentMetaTemplateId
            meta: null | MetaType.Items
        }
    }

    // Установка id выбранной папки или статьи
    export const SET_ARTICLE_META_TEMPLATE_ID = 'SET_ARTICLE_META_TEMPLATE_ID'
    export type SetArticleMetaTemplateIdAction = {
        type: typeof SET_ARTICLE_META_TEMPLATE_ID
        payload: CurrentMetaTemplateId
    }

    // Установка id выбранной папки или статьи
    export const SET_ARTICLE_META = 'SET_ARTICLE_META'
    export type SetArticleMetaAction = {
        type: typeof SET_ARTICLE_META
        payload: null | MetaType.Items
    }


    export type SitesAction =
        | SetSitesAction
        | SetCurrentSiteIdAction
        | SetRightMainTabAction

        | SetSiteTemplatesAction
        | SetCurrentSiteTemplateIdAction

        | SetMetaTemplatesAction
        | SetCurrentMetaTemplateIdAction

        | SetCompFolderAction
        | SetArtFolderAction

        | SetCurrentCompAction
        | SetCurrentArtAction

        | SetArticleMetaTemplateIdAction
        | SetArticleMetaAction
}

export default StoreSitesTypes
