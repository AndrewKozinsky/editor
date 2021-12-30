import useGetModalSelectors from 'store/modal/modalSelectors';
import { makeCN } from 'utils/StringUtils';
import './Modal.scss';
const CN = 'modal';
/** Функция возвращающая классы для элементов */
export default function useMakeClasses() {
    const modalType = useGetModalSelectors().type;
    return {
        root: getRootClass(modalType),
        outerWrapper: CN + `__outer-wrapper`,
        closeBtn: CN + `__close-btn`,
    };
}
// TODO Что делает эта функция?
function getRootClass(modalType) {
    const classes = [CN];
    if (modalType === 'full') {
        classes.push(CN + '--full');
    }
    return makeCN(classes);
}
//# sourceMappingURL=Modal-classes.js.map
//# sourceMappingURL=Modal-classes.js.map