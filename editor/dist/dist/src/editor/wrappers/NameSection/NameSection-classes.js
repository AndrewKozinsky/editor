import { makeCN } from 'utils/StringUtils';
import './NameSection.scss';
const CN = 'name-section';
/** Функция возвращающая классы для элементов */
export default function makeClasses(type) {
    return {
        header: getHeaderClasses(type),
        bg: `${CN}__header-bg`
    };
}
/**
 * Функция возвращает классы заголовка компонента
 * @param {Number} type — тип компонента. 1 — большой, 2 — мелкий компонент
 */
export function getHeaderClasses(type) {
    // Классы заголовка
    // Вида: name-section__header name-section__header--type1
    const classes = [`${CN}__header`];
    classes.push(`${CN}__header--type${type}`);
    return makeCN(classes);
}
//# sourceMappingURL=NameSection-classes.js.map
//# sourceMappingURL=NameSection-classes.js.map