import { makeCN } from 'utils/StringUtils';
import './Wrapper.scss';
const wrapperRootClass = 'wrapper';
/** Функция возвращающая классы для элементов */
export default function makeClasses(wrapperProps, extraClass) {
    return {
        root: getRootClass(wrapperProps, extraClass), // Обёртка
    };
}
/**
 * Функция возвращает классы универсальной обёртки
 * @param {Object} wrapperProps — props переданные в обёртку
 * @param {String} extraClass — дополнительный класс
 */
function getRootClass(wrapperProps, extraClass) {
    const { align, verticalAlign, t, // Отступ сверху
    b // Отступ снизу
     } = wrapperProps;
    let classes = [wrapperRootClass];
    // Добавление класса дающую выравнивание
    if (align)
        classes.push(wrapperRootClass + '--align-' + align);
    if (verticalAlign)
        classes.push(wrapperRootClass + '--vertical-align-' + verticalAlign);
    // Добавление класса дающего верхний оступ
    if (t)
        classes.push(wrapperRootClass + '--t' + t);
    // Добавление класса дающего нижний оступ
    if (b)
        classes.push(wrapperRootClass + '--b' + b);
    // Добавление класса дающего отступ между элементами внутри обёртки
    if (wrapperProps.gap)
        classes.push(wrapperRootClass + '--gap' + wrapperProps.gap);
    if (extraClass)
        classes.push(extraClass);
    return makeCN(classes);
}
//# sourceMappingURL=Wrapper-classes.js.map
//# sourceMappingURL=Wrapper-classes.js.map
//# sourceMappingURL=Wrapper-classes.js.map