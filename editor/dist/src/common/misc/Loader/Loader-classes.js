import './Loader.scss';
const loaderRootClass = 'loader';
/** Функция возвращающая классы для элементов */
export default function makeClasses(externalClasses) {
    return {
        root: getRootClass(externalClasses),
        svg: loaderRootClass + '__svg',
    };
}
/**
 * Функция формирует классы обёртки загрузчика
 * @param {String} externalClasses — дополнительные классы, которые нужно добавить обёртке.
 */
function getRootClass(externalClasses) {
    const wrapperCls = loaderRootClass + '__wrapper';
    const classes = [wrapperCls];
    if (externalClasses) {
        classes.push(externalClasses);
    }
    return classes.join(' ');
}
//# sourceMappingURL=Loader-classes.js.map