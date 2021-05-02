import StoreSettingsTypes from 'store/settings/settingsTypes'
import { makeCN } from 'utils/StringUtils'

/**
 * Функция возвращает классы выпадающего списка
 * @param {String} size — размер элемента.
 * @param {Boolean} disabled — заблокировано ли поле где есть эта подпись
 * @param {Boolean} bold — должен ли текст быть жирным
 */
export function getLabelClasses(size: StoreSettingsTypes.EditorSize, disabled?: boolean, bold?: boolean) {

    // Классы кнопки
    const CN = 'label'
    const classes = [CN]

    // Размер кнопки.
    // tiny (крошечная), small (маленькая), middle (средняя), big (большая)
    classes.push(`${CN}--${size}-size`)

    // Если поле заблокировано
    if (disabled) classes.push(`${CN}--disabled`)

    // Если текст должен быть жирным
    if (bold) classes.push(`${CN}--bold`)

    return makeCN(classes)
}