import StoreSitesTypes from '../site/sitesTypes'
import {
    LocalStorageProxyCommonType,
    LocalStorageProxyEditType,
    LocalStorageProxyGroupType,
    LocalStorageProxyType
} from './LocalStorageProxyType'

// Типы редьюсера Store.localStorageProxy
namespace StoreLocalStorageProxyTypes {

    // Установка данных в Store.localStorageProxy
    export const SET_PERMANENT_DATA_ROOT = 'SET_PERMANENT_DATA_ROOT'
    export type SetPermanentDataRootAction = {
        type: typeof SET_PERMANENT_DATA_ROOT
        payload: LocalStorageProxyType
    }

    export type SetPermanentDataCommonPayload = {
        propName: keyof LocalStorageProxyCommonType
        propValue: any
    }
    // Установка данных для свойства common в Store.localStorageProxy
    export const SET_PERMANENT_DATA_COMMON = 'SET_PERMANENT_DATA_COMMON'
    export type SetPermanentDataCommonAction = {
        type: typeof SET_PERMANENT_DATA_COMMON
        payload: SetPermanentDataCommonPayload
    }

    export type SetPermanentDataGroupPayload = {
        groupId: StoreSitesTypes.CurrentSiteId,
        propName: keyof LocalStorageProxyGroupType
        propValue: any
    }
    // Установка данных для свойства объекта из массива group в Store.localStorageProxy
    export const SET_PERMANENT_DATA_GROUP = 'SET_PERMANENT_DATA_GROUP'
    export type SetPermanentDataGroupAction = {
        type: typeof SET_PERMANENT_DATA_GROUP
        payload: SetPermanentDataGroupPayload
    }

    export type SetPermanentDataEditPayload = {
        propName: keyof LocalStorageProxyEditType
        propValue: any
    }
    // Установка данных для свойства edit в Store.localStorageProxy
    export const SET_PERMANENT_DATA_EDIT = 'SET_PERMANENT_DATA_EDIT'
    export type SetPermanentDataEditAction = {
        type: typeof SET_PERMANENT_DATA_EDIT
        payload: SetPermanentDataEditPayload
    }


    export type SettingsAction =
        | SetPermanentDataRootAction
        | SetPermanentDataCommonAction
        | SetPermanentDataGroupAction
        | SetPermanentDataEditAction
}

export default StoreLocalStorageProxyTypes