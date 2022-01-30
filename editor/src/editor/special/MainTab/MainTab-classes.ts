import { makeCN } from 'utils/stringUtils'
import './MainTab.scss'

const CN = 'main-tab'

/** Функция возвращающая классы для элементов */
export default function makeClasses(active: boolean, position: 'top' | 'left') {
    return {
        tab: getTabClasses(active, position),
        scion: `${CN}__scion`
    }
}

/**
 * Функция возвращает классы вкладки.
 * @param {Boolean} active — текущая ли кнопка вкладки
 * @param {String} position — Положение вкладки влияет на расположение полукруглых элементов
 */
export function getTabClasses(active: boolean, position: 'top' | 'left') {

    // Классы кнопки вкладки
    const classes = [CN]

    // Если активна
    if (active) classes.push(`${CN}--active`)

    // Позиция кнопки
    classes.push(`${CN}--${position}-position`)

    return makeCN(classes)
}
