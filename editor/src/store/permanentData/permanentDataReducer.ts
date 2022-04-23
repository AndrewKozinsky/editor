import StorePermanentDataTypes from './permanentDataTypes'
import {PermanentSettingsGroupType, PermanentSettingsType} from './PermanentSettingsType'

// Изначальные значения
const initialState: null | PermanentSettingsType = null


// Установка полного объекта Постоянных Настроек
function setRoot(
    state: PermanentSettingsType, action: StorePermanentDataTypes.SetPermanentDataRootAction
): PermanentSettingsType {
    return action.payload
}

// Изменение свойства из раздела common
function setCommon(
    state: PermanentSettingsType, action: StorePermanentDataTypes.SetPermanentDataCommonAction
): PermanentSettingsType {

    // Если изменили id текущей группы...
    if (action.payload.propName === 'groupId' && action.payload.propValue) {
        // Найти эту группу в массиве groups...
        const groupId = action.payload.propValue
        const groupSettings = state.groups.find(group => group.groupId === groupId)

        // Если такой группы нет, то добавить пустую группу
        if (!groupSettings) {
            return {
                ...state,
                common: {
                    ...state.common,
                    groupId: groupId
                },
                groups: [
                    ...state.groups,
                    getEmptyGroupObj(action.payload.propValue)
                ]
            }
        }
    }

    // Во всех остальных случаях изменить указанное свойство в common.
    return {
        ...state,
        common: {
            ...state.common,
            [action.payload.propName]: action.payload.propValue
        }
    }
}

function getEmptyGroupObj(groupId: any): PermanentSettingsGroupType {
    return {
        groupId: groupId,
        compOpenedFolders: [],
        artOpenedFolders: [],
        groupTemplateId: null,
        metaTemplateId: null,
        componentId: null,
        componentType: null,
        articleId: null,
        articleType: null
    }
}

function setGroup(
    state: PermanentSettingsType, action: StorePermanentDataTypes.SetPermanentDataGroupAction
): PermanentSettingsType {
    // id выбранной группы
    const groupId = action.payload.groupId

    // Получить объект с настройками группы
    const groupIdx = state.groups.findIndex(group => group.groupId === groupId)

    // Если такой объект найден
    if (groupIdx > -1) {
        // Скопировать массив...
        const newGroups = [...state.groups]
        // Заменить элемент массива новым объектом с изменённым свойством
        newGroups[groupIdx] = {...newGroups[groupIdx], [action.payload.propName]: action.payload.propValue}

        return {
            ...state,
            groups: newGroups
        }
    }

    // Во всех остальных случаев возвратить неизменное Состояние
    return state
}

function setEdit(
    state: PermanentSettingsType, action: StorePermanentDataTypes.SetPermanentDataEditAction
): PermanentSettingsType {
    return {
        ...state,
        edit: {...state.edit, [action.payload.propName]: action.payload.propValue}
    }
}

// Редьюсер Store.permanentData
export default function permanentDataReducer(state = initialState, action: StorePermanentDataTypes.SettingsAction): PermanentSettingsType {

    switch (action.type) {
        case StorePermanentDataTypes.SET_PERMANENT_DATA_ROOT:
            return setRoot(state, action)
        case StorePermanentDataTypes.SET_PERMANENT_DATA_COMMON:
            return setCommon(state, action)
        case StorePermanentDataTypes.SET_PERMANENT_DATA_GROUP:
            return setGroup(state, action)
        case StorePermanentDataTypes.SET_PERMANENT_DATA_EDIT:
            return setEdit(state, action)
        default:
            // @ts-ignore
            const x: never = null
            return state
    }
}
