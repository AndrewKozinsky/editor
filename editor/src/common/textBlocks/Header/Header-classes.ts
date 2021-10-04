import { makeCN } from 'utils/StringUtils'
import { HeaderTypeType } from './Header'
import './Header.scss'

const headerRootClass = 'header'

function makeClasses(type?: HeaderTypeType) {
    return {
        root: getHeaderRootClass(type)
    }
}

/**
 * Функция возвращает классы заголовка
 * @param {String} type — тип заголовка. Он задаёт размер текста
 */
export function getHeaderRootClass(type?: HeaderTypeType) {
    // Классы
    const classes = [headerRootClass]

    // Размер заголовка.
    // Получится строка вида
    // header--h1 или header--h2
    classes.push(`${headerRootClass}--${type}`)

    return makeCN(classes)
}

export default makeClasses