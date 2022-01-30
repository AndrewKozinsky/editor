import { makeCN } from 'utils/stringUtils'
import './FieldGroup.scss'

const CN = 'field-wrapper'

/** Функция возвращающая классы для элементов */
export default function makeClasses(vertical: boolean, gap?: number) {
    return {
        wrapper: getFieldGroupClasses(vertical, gap),
    }
}

/**
 * Функция возвращает классы обёртки полей ввода
 * @param {Boolean} vertical — Are the inputs arranged vertically?
 * @param {Number} gap — отступ между элементами внутри компонента.
 */
export function getFieldGroupClasses(vertical: boolean, gap?: number) {
    // Классы
    const classes = [CN]

    // Добавление класса дающего отступ между элементами внутри обёртки
    if (vertical) classes.push(CN + '--vertical')
    if (gap) classes.push(CN + '--gap' + gap)

    return makeCN(classes)
}
