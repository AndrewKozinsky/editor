import FilesTreeType from 'libs/FilesTree/types'

namespace StoreSitesTypes {

    // Сайт
    export type SiteType = {
        id: string,
        name: string,
        // id шаблона подключаемого файла применяемый по умолчанию при создании статьи для этого сайта
        defaultIncFilesTemplateId: null | string
    }
    // Сайты
    export type SitesType = SiteType[]
    // id выбранного сайта
    export type CurrentSiteId = null | string
    // id открытой вкладки на правой части
    export type RightMainTab = number

    // Шаблон подключаемых файлов
    export type IncFilesTemplateType = {
        id: string,
        name: string,
        head?: string
        body?: string
    }
    // Массив шаблонов подключаемых файлов
    export type IncFilesTemplatesType = IncFilesTemplateType[]
    // id выбранного шаблона подключаемых файлов
    export type CurrentIncFilesTemplateId = null | string
    // id выбранного шаблона компонента
    export type CurrentComponentId = null | FilesTreeType.UuId

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

    // Установка id текущей основной вкладки справа
    export const SET_RIGHT_MAIN_TAB = 'SET_RIGHT_MAIN_TAB'
    export type SetRightMainTabAction = {
        type: typeof SET_RIGHT_MAIN_TAB
        payload: RightMainTab
    }


    // Установка массива шаблонов подключаемых файлов
    export const SET_INC_FILES_TEMPLATES = 'SET_INC_FILES_TEMPLATES'
    export type SetIncFilesTemplatesAction = {
        type: typeof SET_INC_FILES_TEMPLATES
        payload: IncFilesTemplatesType
    }

    // Установка id выбранного шаблона подключаемых файлов
    export const SET_CURRENT_INC_FILES_TEMPLATE_ID = 'SET_CURRENT_INC_FILES_TEMPLATE_ID'
    export type SetCurrentIncFilesTemplateIdAction = {
        type: typeof SET_CURRENT_INC_FILES_TEMPLATE_ID
        payload: CurrentIncFilesTemplateId
    }

    // Установка порядка шаблонов компонентов выбранного сайта
    export const SET_COMPONENTS_ORDER = 'SET_COMPONENTS_ORDER'
    export type SetComponentsOrderAction = {
        type: typeof SET_COMPONENTS_ORDER
        payload: null | FilesTreeType.Items
    }

    // Установка id выбранного шаблона компонента
    export const SET_CURRENT_COMPONENT_ID = 'SET_CURRENT_COMPONENT_ID'
    export type SetCurrentComponentIdAction = {
        type: typeof SET_CURRENT_COMPONENT_ID
        payload: FilesTreeType.UuId
    }


    export type SitesAction =
        | SetSitesAction
        | SetCurrentSiteIdAction
        | SetRightMainTabAction
        | SetIncFilesTemplatesAction
        | SetCurrentIncFilesTemplateIdAction
        | SetComponentsOrderAction
        | SetCurrentComponentIdAction
}

export default StoreSitesTypes
