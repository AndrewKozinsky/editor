import useGetModalSelectors from 'store/modal/modalSelectors';
import { makeCN } from 'utils/StringUtils';
import './ModalShortContent.scss';
const CN = 'modal-short-content';
/** Функция возвращающая классы для элементов */
export default function useMakeClasses() {
    const modalType = useGetModalSelectors().type;
    return {
        root: CN,
        content: CN + `__content`,
        bottom: getBottom(modalType),
    };
}
// TODO Что делает эта функция?
function getBottom(modalType) {
    const classes = [CN + `__bottom`];
    if (modalType === 'short') {
        classes.push(CN + `__bottom--short`);
    }
    else if (modalType === 'full') {
        classes.push(CN + `__bottom--full`);
    }
    return makeCN(classes);
}
//# sourceMappingURL=ModalShortContent-classes.js.map
//# sourceMappingURL=ModalShortContent-classes.js.map