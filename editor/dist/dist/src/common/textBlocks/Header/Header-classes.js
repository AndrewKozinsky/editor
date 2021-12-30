import { makeCN } from 'utils/StringUtils';
import './Header.scss';
const headerRootClass = 'header';
/** Функция возвращающая классы для элементов */
export default function makeClasses(type) {
    return {
        root: getHeaderRootClass(type)
    };
}
/**
 * Функция возвращает классы заголовка
 * @param {String} type — тип заголовка. Он задаёт размер текста
 */
export function getHeaderRootClass(type) {
    // Классы
    const classes = [headerRootClass];
    // Размер заголовка.
    // Получится строка вида
    // header--h1 или header--h2
    classes.push(`${headerRootClass}--${type}`);
    return makeCN(classes);
}
//# sourceMappingURL=Header-classes.js.map
//# sourceMappingURL=Header-classes.js.map