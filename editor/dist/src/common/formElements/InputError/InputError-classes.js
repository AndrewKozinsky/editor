import './InputError.scss';
const appRootClass = 'input-error';
/** Функция возвращающая классы для элементов */
export default function makeClasses() {
    return {
        root: [appRootClass, appRootClass + '--error'].join(' '),
        icon: appRootClass + '__icon',
        paragraph: appRootClass + '__paragraph'
    };
}
//# sourceMappingURL=InputError-classes.js.map