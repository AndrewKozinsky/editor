import { makeCN } from 'utils/StringUtils'

import './FieldGroup.scss'

const appRootClass = 'field-wrapper'

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
    const classes = [appRootClass]

    // Добавление класса дающего отступ между элементами внутри обёртки
    if (vertical) classes.push(appRootClass + '--vertical')
    if (gap) classes.push(appRootClass + '--gap' + gap)

    return makeCN(classes)
}
