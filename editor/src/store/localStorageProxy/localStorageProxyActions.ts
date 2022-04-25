import StoreLocalStorageProxyTypes from './localStorageProxyTypes'
import {LocalStorageProxyType} from './localStorageProxyType'

const localStorageProxyActions = {

    setRoot(payload: LocalStorageProxyType): StoreLocalStorageProxyTypes.SetPermanentDataRootAction {
        return {
            type: StoreLocalStorageProxyTypes.SET_PERMANENT_DATA_ROOT,
            payload
        }
    },

    setCommon(payload: StoreLocalStorageProxyTypes.SetPermanentDataCommonPayload): StoreLocalStorageProxyTypes.SetPermanentDataCommonAction {
        return {
            type: StoreLocalStorageProxyTypes.SET_PERMANENT_DATA_COMMON,
            payload
        }
    },

    setGroup(payload: StoreLocalStorageProxyTypes.SetPermanentDataGroupPayload): StoreLocalStorageProxyTypes.SetPermanentDataGroupAction {
        return {
            type: StoreLocalStorageProxyTypes.SET_PERMANENT_DATA_GROUP,
            payload
        }
    },

    setEdit(payload: StoreLocalStorageProxyTypes.SetPermanentDataEditPayload): StoreLocalStorageProxyTypes.SetPermanentDataEditAction {
        return {
            type: StoreLocalStorageProxyTypes.SET_PERMANENT_DATA_EDIT,
            payload
        }
    },
}

export default localStorageProxyActions