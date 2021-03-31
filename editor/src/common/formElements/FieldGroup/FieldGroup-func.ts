import {EditorSizeType} from 'store/settings/settingsTypes'
import {makeCN} from 'utils/StringUtils'

/**
 * Функция возвращает классы обёртки полей ввода
 * @param size — размер элемента.
 */
export function getFieldGroupClasses(size: EditorSizeType) {

    // Классы
    const CN = 'field-wrapper'
    const classes = [CN]

    // Размер поля ввода.
    classes.push(`${CN}--${size}-size`)

    return makeCN(classes)
}