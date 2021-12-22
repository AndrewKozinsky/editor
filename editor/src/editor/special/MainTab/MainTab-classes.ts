import { makeCN } from 'utils/StringUtils'
import './MainTab.scss'

const rootClass = 'main-tab'

export default function makeClasses(active: boolean, position: 'top' | 'left') {
    return {
        tab: getTabClasses(active, position),
        scion: `${rootClass}__scion`
    }
}

/**
 * Функция возвращает классы вкладки.
 * @param {Boolean} active — текущая ли кнопка вкладки
 * @param {String} position — Положение вкладки влияет на расположение полукруглых элементов
 */
export function getTabClasses(active: boolean, position: 'top' | 'left') {

    // Классы кнопки вкладки
    const classes = [rootClass]

    // Если активна
    if (active) classes.push(`${rootClass}--active`)

    // Позиция кнопки
    classes.push(`${rootClass}--${position}-position`)

    return makeCN(classes)
}
