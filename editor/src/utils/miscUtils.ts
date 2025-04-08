import { ArticleReducerType } from 'store/article/articleReducer'
import { ModalReducerType } from 'store/modal/modalReducer'
import { SettingsReducerType } from 'store/settings/settingsReducer'
import { SitesReducerType } from 'store/site/sitesReducer'
import { UserReducerType } from 'store/user/userReducer'
import { AppStateType, store } from 'store/rootReducer'
import { HelpReducerType } from 'store/help/helpReducer'
import {LocalStorageProxyType} from 'store/localStorageProxy/localStorageProxyType'

/**
 * Функция получает данные, которые нужно записать в localStorage.
 * Чтобы сохранить типы полученные данные, предварительно пропускаются через JSON.stringify
 * @param {String} propName — имя свойства
 * @param {String} value — значение свойства
 * @param {Boolean} toJSON — нужно ли сохраняемое значение переводить в JSON
 */
export function setInLocalStorage(propName: string, value: any, toJSON: boolean = false) {
    const savedValue = toJSON
        ? JSON.stringify(value)
        : value

    localStorage.setItem(propName, savedValue)
}

/**
 * Получение из localStorage данных предварительно пропущенных через JSON.parse
 * @param {String} propName — имя свойства
 * @param {String} defaultValue — значение по умолчанию, которое будет возвращено
 * если в localStorage у запрашиваемого свойства нет значения.
 */
export function getFromLocalStorage(propName: string, defaultValue?: any) {
    let value = localStorage.getItem(propName)
    if (!value && defaultValue !== undefined) return defaultValue

    try {
        return JSON.parse(value)
    }
    catch(err) {
        return value
    }
}

/**
 * Удаление данных из localStorage
 * @param {String} propName — имя свойства
 */
export function removeFromLocalStorage(propName: string) {
    localStorage.removeItem(propName)
}

/**
 * The function create deep copy of object or array
 * @param {Object | Array} data — copied data
 */
export function createDeepCopy<T>(data: T): T {

    let f = function copy(data: T) {
        switch (toString.call(data)){
            case '[object Array]':
                return parseArray(data)
            case '[object Object]':
                return parseObj(data)
            default: return null // Возвращу null чтобы проверяльщик не ругался
        }

        function parseArray(arr: any) {
            return arr.map((elem: any) => {
                switch (toString.call(elem)){
                    case '[object Array]':
                    case '[object Object]':
                        return copy(elem)
                    default: return elem
                }
            })
        }

        function parseObj(obj: any) {
            let result = {}

            for(let key in obj) {
                switch (toString.call(obj[key])){
                    case '[object Array]':
                    case '[object Object]':
                        //@ts-ignore
                        result[key] = copy(obj[key])
                        break
                    default:
                        //@ts-ignore
                        result[key] = obj[key]
                }
            }
            return result
        }
    }

    return f(data)
}

/**
 * Псевдоним для функции store.getState().
 * Только дополнительно возвращаемые данные будет иметь правильный тип, а не any.
 */
export function getState() {
    const myStore: AppStateType = store.getState()
    const userStore: UserReducerType = myStore.user

    const sitesStore: SitesReducerType = myStore.sites
    const settingsStore: SettingsReducerType = myStore.settings
    const articleStore: ArticleReducerType = myStore.article
    const modalStore: ModalReducerType = myStore.modal
    const helpStore: HelpReducerType = myStore.help
    const localStorageProxyStore: LocalStorageProxyType = myStore.localStorageProxy

    return {
        user: userStore,
        sites: sitesStore,
        settings: settingsStore,
        article: articleStore,
        modal: modalStore,
        help: helpStore,
        localStorageProxy: localStorageProxyStore,
    }
}