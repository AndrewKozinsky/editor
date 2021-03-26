import {makeCN} from 'utils/StringUtils'
import {EditorSizeType} from 'store/settings/settingsTypes'

/**
 * Функция возвращает классы выпадающего списка
 * @param size — размер элемента.
 */
export function getTextInputClasses(size: EditorSizeType) {

    // Классы
    const CN = 'text-input'
    const classes = [CN]

    // Размер поля ввода.
    classes.push(`${CN}--${size}-size`)

    return makeCN(classes)
}