import { makeCN } from 'utils/StringUtils'
import './Select.scss'

const selectRootClass = 'select-input'

export default function makeClasses(isFocus: boolean) {
    return {
        wrapper: getWrapperClasses(isFocus),
        wrapperTip: selectRootClass + '__wrapper-tip'
    }
}

/**
 * Функция возвращает классы обёртки выпадающего списка.
 * @param {Boolean} isFocus — находится ли <select> в фокусе.
 */
export function getWrapperClasses(isFocus: boolean) {

    // Классы обёртки
    const classes = [selectRootClass + '__wrapper']

    // Если есть фокусировка
    if (isFocus)  classes.push(`${selectRootClass}__wrapper--focus`)

    return makeCN(classes)
}
