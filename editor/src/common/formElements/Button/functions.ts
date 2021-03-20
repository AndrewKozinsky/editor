import {makeCN} from 'utils/StringUtils'
import { ButtonPropType } from './Button'

/**
 * Функция возвращает классы выпадающего списка
 * @param {Object} buttonProps — props переданные в текстовое поле
 */
export function getClasses(buttonProps: ButtonPropType) {
    const {
        size = 'small', // Размер кнопки: tiny (крошечная), small (маленькая), middle (средняя), big (большая)
        view = 'standard', // Вид кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значёк)
        color = 'base', // Цвет кнопки. Варианты: base (стандартный цвет), accent (акцентный цвет)
    } = buttonProps

    // Классы кнопки
    const CN = 'btn'
    const classes = [CN]

    // Размер кнопки.
    // tiny (крошечная), small (маленькая), middle (средняя), big (большая)
    if (size === 'tiny') classes.push(`${CN}--tiny-size`)
    if (size === 'small') classes.push(`${CN}--small-size`)
    if (size === 'middle') classes.push(`${CN}--middle-size`)
    if (size === 'big') classes.push(`${CN}--big-size`)

    // Вид кнопки.
    // standard (стандартная кнопка), onlyIcon (только значёк).
    if (view === 'standard') classes.push(`${CN}--standard-view`)

    // Цвет кнопки.
    // base (стандартный цвет), accent (акцентный цвет)
    if (color === 'base') classes.push(`${CN}--base-color`)

    return makeCN(classes)
}