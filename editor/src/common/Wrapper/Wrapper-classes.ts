import { WrapperPropType } from './Wrapper'
import { makeCN } from 'utils/stringUtils'
import './Wrapper.scss'

const CN = 'wrapper'

/** Функция возвращающая классы для элементов */
export default function makeClasses(wrapperProps: WrapperPropType, extraClass?: string) {
    return {
        root: getRootClass(wrapperProps, extraClass), // Обёртка
    }
}

/**
 * Функция возвращает классы универсальной обёртки
 * @param {Object} wrapperProps — props переданные в обёртку
 * @param {String} extraClass — дополнительный класс
 */
function getRootClass(wrapperProps: WrapperPropType, extraClass?: string) {
    const {
        align,
        verticalAlign,
        t,     // Отступ сверху
        b      // Отступ снизу
    } = wrapperProps

    let classes = [CN]

    // Добавление класса дающую выравнивание
    if (align) classes.push(CN + '--align-' + align)
    if (verticalAlign) classes.push(CN + '--vertical-align-' + verticalAlign)

    // Добавление класса дающего верхний оступ
    if (t) classes.push(CN + '--t' + t)

    // Добавление класса дающего нижний оступ
    if (b) classes.push(CN + '--b' + b)

    // Добавление класса дающего отступ между элементами внутри обёртки
    if (wrapperProps.gap) classes.push(CN + '--gap' + wrapperProps.gap)

    if (extraClass) classes.push(extraClass)

    return makeCN(classes)
}
