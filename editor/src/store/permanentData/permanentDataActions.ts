import StorePermanentDataTypes from './permanentDataTypes'
import {PermanentSettingsType} from './PermanentSettingsType'

const permanentDataActions = {

    setRoot(payload: PermanentSettingsType): StorePermanentDataTypes.SetPermanentDataRootAction {
        return {
            type: StorePermanentDataTypes.SET_PERMANENT_DATA_ROOT,
            payload
        }
    },

    setCommon(payload: StorePermanentDataTypes.SetPermanentDataCommonPayload): StorePermanentDataTypes.SetPermanentDataCommonAction {
        return {
            type: StorePermanentDataTypes.SET_PERMANENT_DATA_COMMON,
            payload
        }
    },

    setGroup(payload: StorePermanentDataTypes.SetPermanentDataGroupPayload): StorePermanentDataTypes.SetPermanentDataGroupAction {
        return {
            type: StorePermanentDataTypes.SET_PERMANENT_DATA_GROUP,
            payload
        }
    },

    setEdit(payload: StorePermanentDataTypes.SetPermanentDataEditPayload): StorePermanentDataTypes.SetPermanentDataEditAction {
        return {
            type: StorePermanentDataTypes.SET_PERMANENT_DATA_EDIT,
            payload
        }
    },
}

export default permanentDataActions