import {makeCN} from 'src/utils/StringUtils'
import StoreSettingsTypes from 'src/store/settings/settingsTypes'

/**
 * Функция возвращает классы обёртки выпадающего списка.
 * @param size — размер элемента.
 */
export function getLabelClasses(size: StoreSettingsTypes.EditorSize) {

    // Классы обёртки
    const CN = 'checkbox-label'
    const classes = [CN]

    // Размер обёртки списка.
    classes.push(`${CN}--${size}-size`)

    return makeCN(classes)
}