import { makeCN } from 'utils/stringUtils'
import './Select.scss'

const CN = 'select-input'
const wrapperClass = 'select-input__wrapper'

/** Функция возвращающая классы для элементов */
export default function makeClasses(isFocus: boolean, disabled: boolean) {
    return {
        wrapper: getWrapperClasses(isFocus),
        wrapperTip: getTipClasses(disabled)
    }
}

/**
 * Функция возвращает классы обёртки выпадающего списка.
 * @param {Boolean} isFocus — находится ли <select> в фокусе.
 */
function getWrapperClasses(isFocus: boolean) {
    // Классы обёртки
    const classes = [CN + '__wrapper']

    // Если есть фокусировка
    if (isFocus)  classes.push(`${CN}__wrapper--focus`)

    return makeCN(classes)
}

/**
 * Классы кончика выпадающего списка со стрелками
 * @param {boolean} disabled
 * @returns {string}
 */
function getTipClasses(disabled: boolean) {
    const classes = [wrapperClass + '-tip']

    // Если есть фокусировка
    if (disabled) classes.push(wrapperClass + `-tip--disabled`)

    return makeCN(classes)
}
