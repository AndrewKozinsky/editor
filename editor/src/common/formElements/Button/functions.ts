import {makeCN} from 'utils/StringUtils'
import { ButtonPropType } from './Button'

/**
 * Функция возвращает классы выпадающего списка
 * @param {Object} buttonProps — props переданные в текстовое поле
 */
export function getClasses(buttonProps: ButtonPropType) {
    const {
        size = 'middle', // Размер поля: small (маленькое), middle (среднего размера)
        view = 'standard', // Вид кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значёк)
        color = 'base', // Цвет кнопки. Варианты: base (стандартный цвет), accent (акцентный цвет)
    } = buttonProps

    // Классы кнопки
    const CN = 'btn'
    const classes = [CN]

    // Размер кнопки.
    // small (маленькая), middle (стандартного размера), big (большая)
    if (size === 'middle') {
        classes.push(`${CN}--middle-size`)
    }

    // Вид кнопки.
    // standard (стандартная кнопка), onlyIcon (только значёк).
    if (view === 'standard') {
        classes.push(`${CN}--standard-view`)
    }

    // Цвет кнопки.
    // base (стандартный цвет), accent (акцентный цвет)
    if (color === 'base') {
        classes.push(`${CN}--base-color`)
    }

    return makeCN(classes)
}