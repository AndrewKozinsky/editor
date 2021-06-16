import {ReactElement} from 'react'
import {useDispatch} from 'react-redux'
import actions from '../store/rootAction'


/** Хук возвращает функцию открывающую модальное окно */
export function useGetModalOpenHandler() {
    const dispatch = useDispatch()

    return function (content: ReactElement) {
        dispatch(actions.modal.openModal(content))
    }
}

/** Хук возвращает функцию закрывающую модальное окно */
export function useGetModalCloseHandler() {
    const dispatch = useDispatch()

    return function () {
        dispatch(actions.modal.closeModal())
    }
}

/**
 * Запись в localStorage данных предварительно пропущенных через JSON.stringify
 * @param {String} propName — имя свойства
 * @param {String} value — значение свойства
 */
export function setInLocalStorage(propName: string, value: any) {
    localStorage.setItem(propName, JSON.stringify(value))
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

    return JSON.parse(value)
}

/**
 * Удаление данных из localStorage
 * @param {String} propName — имя свойства
 */
export function removeFromLocalStorage(propName: string) {
    localStorage.removeItem(propName)
}