import {makeCN} from 'utils/StringUtils'
import { ButtonPropType } from './Button'
import StoreSettingsTypes from 'store/settings/settingsTypes'

/**
 * Функция возвращает классы кнопки
 * @param {Object} buttonProps — props переданные в кнопку
 * @param {String} size — размер элемента.
 */
export function getButtonClasses(buttonProps: ButtonPropType, size: StoreSettingsTypes.EditorSize) {
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


/**
 * Функция возвращает классы загрузчика кнопки
 * @param {String} size — размер загрузчика
 */
export function getButtonLoaderClasses(size: StoreSettingsTypes.EditorSize) {

    // Классы кнопки
    const CN = 'btn-loader'
    const classes = [CN]

    // Размер загрузчика.
    // tiny (крошечная), small (маленькая), middle (средняя), big (большая)
    classes.push(`${CN}--${size}-size`)

    return makeCN(classes)
}
