import StoreSitesTypes from '../site/sitesTypes'
import {
    PermanentSettingsCommonType,
    PermanentSettingsEditType,
    PermanentSettingsGroupType,
    PermanentSettingsType
} from './PermanentSettingsType'

// Типы редьюсера Store.permanentData
namespace StorePermanentDataTypes {

    // Установка данных в Store.permanentData
    export const SET_PERMANENT_DATA_ROOT = 'SET_PERMANENT_DATA_ROOT'
    export type SetPermanentDataRootAction = {
        type: typeof SET_PERMANENT_DATA_ROOT
        payload: PermanentSettingsType
    }

    export type SetPermanentDataCommonPayload = {
        propName: keyof PermanentSettingsCommonType
        propValue: any
    }
    // Установка данных для свойства common в Store.permanentData
    export const SET_PERMANENT_DATA_COMMON = 'SET_PERMANENT_DATA_COMMON'
    export type SetPermanentDataCommonAction = {
        type: typeof SET_PERMANENT_DATA_COMMON
        payload: SetPermanentDataCommonPayload
    }

    export type SetPermanentDataGroupPayload = {
        groupId: StoreSitesTypes.CurrentSiteId,
        propName: keyof PermanentSettingsGroupType
        propValue: any
    }
    // Установка данных для свойства объекта из массива group в Store.permanentData
    export const SET_PERMANENT_DATA_GROUP = 'SET_PERMANENT_DATA_GROUP'
    export type SetPermanentDataGroupAction = {
        type: typeof SET_PERMANENT_DATA_GROUP
        payload: SetPermanentDataGroupPayload
    }

    export type SetPermanentDataEditPayload = {
        propName: keyof PermanentSettingsEditType
        propValue: any
    }
    // Установка данных для свойства edit в Store.permanentData
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

export default StorePermanentDataTypes