import { EditorSizeType } from 'store/settings/settingsTypes'
import { makeCN } from 'utils/StringUtils'

/**
 * Функция возвращает классы выпадающего списка
 * @param size — размер элемента.
 */
export function getLabelClasses(size: EditorSizeType) {

    // Классы кнопки
    const CN = 'label'
    const classes = [CN]

    // Размер кнопки.
    // tiny (крошечная), small (маленькая), middle (средняя), big (большая)
    classes.push(`${CN}--${size}-size`)

    return makeCN(classes)
}