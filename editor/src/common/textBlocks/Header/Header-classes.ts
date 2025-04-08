import { makeCN } from 'utils/stringUtils'
import { HeaderTypeType } from './Header'
import './Header.scss'

const CN = 'header'

/** Функция возвращающая классы для элементов */
export default function makeClasses(type?: HeaderTypeType) {
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
    const classes = [CN]

    // Размер заголовка.
    // Получится строка вида
    // header--h1 или header--h2
    classes.push(`${CN}--${type}`)

    return makeCN(classes)
}
