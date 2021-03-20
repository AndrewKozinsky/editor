import {makeCN} from 'utils/StringUtils'
import { ButtonPropType } from './Button'
import { EditorSizeType } from 'store/settings/settingsTypes'

/**
 * Функция возвращает классы выпадающего списка
 * @param {Object} buttonProps — props переданные в текстовое поле
 * @param size — размер элемента.
 */
export function getClasses(buttonProps: ButtonPropType, size: EditorSizeType) {
    const {
        view = 'standard', // Вид кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значёк)
        color = 'base', // Цвет кнопки. Варианты: base (стандартный цвет), accent (акцентный цвет)
    } = buttonProps

    // Классы кнопки
    const CN = 'btn'
    const classes = [CN]

    // Размер кнопки.
    // tiny (крошечная), small (маленькая), middle (средняя), big (большая)
    classes.push(`${CN}--${size}-size`)

    // Вид кнопки.
    // standard (стандартная кнопка), onlyIcon (только значёк).
    if (view === 'standard') classes.push(`${CN}--standard-view`)

    // Цвет кнопки.
    // base (стандартный цвет), accent (акцентный цвет)
    if (color === 'base') classes.push(`${CN}--base-color`)

    return makeCN(classes)
}