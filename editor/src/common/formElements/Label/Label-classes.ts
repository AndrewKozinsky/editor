import { makeCN } from 'utils/StringUtils'
import './Label.scss'


const labelRootClass = 'label'

function makeClasses(disabled?: boolean, bold?: boolean) {
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
    const classes = [labelRootClass]

    // Если поле заблокировано
    if (disabled) classes.push(`${labelRootClass}--disabled`)

    // Если текст должен быть жирным
    if (bold) classes.push(`${labelRootClass}--bold`)

    return makeCN(classes)
}

export default makeClasses