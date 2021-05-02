import {makeCN} from 'src/utils/StringUtils'
import StoreSettingsTypes from 'src/store/settings/settingsTypes'

/**
 * Функция возвращает классы обёртки выпадающего списка.
 * @param {String} size — размер элемента.
 * @param {Boolean} active — текущая ли кнопка вкладки
 * @param {String} position — Положение вкладки влияет на расположение полукруглых элементов
 */
export function getTabClasses(size: StoreSettingsTypes.EditorSize, active: boolean, position: 'top' | 'left') {

    // Классы кнопки вкладки
    const CN = 'main-tab'
    const classes = [CN]

    // Если активна
    if (active) classes.push(`${CN}--active`)

    // Позиция кнопки
    classes.push(`${CN}--${position}-position`)

    return makeCN(classes)
}