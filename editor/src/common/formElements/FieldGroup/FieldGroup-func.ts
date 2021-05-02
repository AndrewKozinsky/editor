import StoreSettingsTypes from 'store/settings/settingsTypes'
import {makeCN} from 'utils/StringUtils'

/**
 * Функция возвращает классы обёртки полей ввода
 * @param {String} size — размер элемента.
 * @param {Number} gap — отступ между элементами внутри компонента.
 */
export function getFieldGroupClasses(size: StoreSettingsTypes.EditorSize, gap?: number) {

    // Классы
    const CN = 'field-wrapper'
    const classes = [CN]

    // Размер поля ввода.
    classes.push(`${CN}--${size}-size`)

    // Добавление класса дающего отступ между элементами внутри обёртки
    if (gap) classes.push(CN + '--gap' + gap)

    return makeCN(classes)
}