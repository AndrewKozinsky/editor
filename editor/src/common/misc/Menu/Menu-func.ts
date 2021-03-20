import { makeCN } from 'utils/StringUtils'
import { EditorSizeType } from 'store/settings/settingsTypes'


/**
 * Функция возвращает классы элемента <nav> меню.
 * @param size — размер элемента.
 */
export function getLiClasses(size: EditorSizeType) {

    // Классы элемента <nav>
    const CN = 'menu__li'
    const classes = [CN]

    // Размер элемента <nav>
    classes.push(`${CN}--${size}-size`)

    return makeCN(classes)
}
