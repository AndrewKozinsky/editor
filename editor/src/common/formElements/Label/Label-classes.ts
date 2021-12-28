import { makeCN } from 'utils/StringUtils'
import './Label.scss'


const CN = 'label'

/** Функция возвращающая классы для элементов */
export default function makeClasses(disabled?: boolean, bold?: boolean) {
    return {
        root: getLabelClasses(disabled, bold)
    }
}

/**
 * Функция возвращает классы выпадающего списка
 * @param {Boolean} disabled — заблокировано ли поле где есть эта подпись
 * @param {Boolean} bold — должен ли текст быть жирным
 */
export function getLabelClasses(disabled?: boolean, bold?: boolean) {

    // Классы кнопки
    const classes = [CN]

    // Если поле заблокировано
    if (disabled) classes.push(`${CN}--disabled`)

    // Если текст должен быть жирным
    if (bold) classes.push(`${CN}--bold`)

    return makeCN(classes)
}
