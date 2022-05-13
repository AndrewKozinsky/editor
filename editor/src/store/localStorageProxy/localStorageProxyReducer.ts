import StoreLocalStorageProxyTypes from './localStorageProxyTypes'
import {LocalStorageProxyGroupType, LocalStorageProxyType} from './localStorageProxyType'
import {store} from '../rootReducer'

// Изначальные значения
const initialState: null | LocalStorageProxyType = null


// Установка полного объекта Постоянных Настроек
function setRoot(
    state: LocalStorageProxyType, action: StoreLocalStorageProxyTypes.SetPermanentDataRootAction
): LocalStorageProxyType {
    return action.payload
}

// Изменение свойства из раздела common
function setCommon(
    state: LocalStorageProxyType, action: StoreLocalStorageProxyTypes.SetPermanentDataCommonAction
): LocalStorageProxyType {

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

function getEmptyGroupObj(groupId: any): LocalStorageProxyGroupType {
    return {
        groupId: groupId,
        compOpenedFolders: [],
        artOpenedFolders: [],
        groupTemplateId: null,
        metaTemplateId: null,
        componentId: null,
        componentType: null,
        articleId: null,
        articleType: null,
        tempCompsOpenFoldersIdsInArt: []
    }
}

function setGroup(
    state: LocalStorageProxyType, action: StoreLocalStorageProxyTypes.SetPermanentDataGroupAction
): LocalStorageProxyType {
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
    state: LocalStorageProxyType, action: StoreLocalStorageProxyTypes.SetPermanentDataEditAction
): LocalStorageProxyType {
    return {
        ...state,
        edit: {...state.edit, [action.payload.propName]: action.payload.propValue}
    }
}

// Редьюсер Store.localStorageProxy
export default function localStorageProxyReducer(state = initialState, action: StoreLocalStorageProxyTypes.SettingsAction): LocalStorageProxyType {

    switch (action.type) {
        case StoreLocalStorageProxyTypes.SET_PERMANENT_DATA_ROOT:
            return setRoot(state, action)
        case StoreLocalStorageProxyTypes.SET_PERMANENT_DATA_COMMON:
            return setCommon(state, action)
        case StoreLocalStorageProxyTypes.SET_PERMANENT_DATA_GROUP:
            return setGroup(state, action)
        case StoreLocalStorageProxyTypes.SET_PERMANENT_DATA_EDIT:
            return setEdit(state, action)
        default:
            // @ts-ignore
            const _: never = action.type
            // throw new Error('Errow in the localStorageProxyReducer')
            return state
    }
}
