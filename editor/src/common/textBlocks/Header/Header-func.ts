import StoreSettingsTypes from 'store/settings/settingsTypes'
import {makeCN} from 'utils/StringUtils'
import { HeaderPropType } from './Header'

/**
 * Функция возвращает классы выпадающего списка
 * @param {Object} headerProps — props переданные в компонент заголовка
 * @param size — размер элемента.
 */
export function getHeaderClasses(headerProps: HeaderPropType, size: StoreSettingsTypes.EditorSize) {

    const {
        type // Тип заголовка: он задаёт тег заголовка и размер текста
    } = headerProps

    // Классы
    const CN = 'header'
    const classes = [CN]

    // Размер заголовка.
    // Получится строка вида
    // header--h1-small-size или header--h1-middle-size
    if (type === 'h1') classes.push(`${CN}--h1-${size}-size`)

    return makeCN(classes)
}