import {WrapperPropType} from './Wrapper'
import { makeCN } from 'utils/StringUtils'
import './Wrapper.scss'

const wrapperRootClass = 'wrapper'

function makeClasses(wrapperProps: WrapperPropType) {
    return {
        root: getRootClass(wrapperProps), // Обёртка
    }
}

/**
 * Функция возвращает классы универсальной обёртки
 * @param {Object} wrapperProps — props переданные в обёртку
 */
function getRootClass(wrapperProps: WrapperPropType) {
    const {
        align,
        verticalAlign,
        t,     // Отступ сверху
        b      // Отступ снизу
    } = wrapperProps

    let classes = [wrapperRootClass]

    // Добавление класса дающую выравнивание
    if (align) classes.push(wrapperRootClass + '--align-' + align)
    if (verticalAlign) classes.push(wrapperRootClass + '--vertical-align-' + verticalAlign)

    // Добавление класса дающего верхний оступ
    if (t) classes.push(wrapperRootClass + '--t' + t)

    // Добавление класса дающего нижний оступ
    if (b) classes.push(wrapperRootClass + '--b' + b)

    // Добавление класса дающего отступ между элементами внутри обёртки
    if (wrapperProps.gap) classes.push(wrapperRootClass + '--gap' + wrapperProps.gap)

    return makeCN(classes)
}

export default makeClasses