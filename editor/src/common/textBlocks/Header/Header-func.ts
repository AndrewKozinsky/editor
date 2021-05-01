import StoreSettingsTypes from 'store/settings/settingsTypes'
import {makeCN} from 'utils/StringUtils'
import { HeaderPropType } from './Header'

/**
 * Функция возвращает классы выпадающего списка
 * @param {String} type — тип заголовка. Он задаёт размер текста
 * @param size — размер элемента.
 */
export function getHeaderClasses(type: string, size: StoreSettingsTypes.EditorSize) {

    // Классы
    const CN = 'header'
    const classes = [CN]

    // Размер заголовка.
    // Получится строка вида
    // header--h1-small-size или header--h2-middle-size
    classes.push(`${CN}--${type}-${size}-size`)

    return makeCN(classes)
}