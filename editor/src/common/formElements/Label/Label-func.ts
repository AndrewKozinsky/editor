import { EditorSizeType } from 'store/settings/settingsTypes'
import { makeCN } from 'utils/StringUtils'

/**
 * Функция возвращает классы выпадающего списка
 * @param {String} size — размер элемента.
 * @param {Boolean} disabled — заблокировано ли поле где есть эта подпись
 */
export function getLabelClasses(size: EditorSizeType, disabled?: boolean) {

    // Классы кнопки
    const CN = 'label'
    const classes = [CN]

    // Размер кнопки.
    // tiny (крошечная), small (маленькая), middle (средняя), big (большая)
    classes.push(`${CN}--${size}-size`)

    // Если поле заблокировано
    if (disabled) classes.push(`${CN}--disabled`)

    return makeCN(classes)
}