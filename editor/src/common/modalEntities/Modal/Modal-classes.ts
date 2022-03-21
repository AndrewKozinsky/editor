import useGetModalSelectors from 'store/modal/modalSelectors'
import StoreModalTypes from 'store/modal/modalTypes'
import { makeCN } from 'utils/stringUtils'
import './Modal.scss'

const CN = 'modal'

/** Функция возвращающая классы для элементов */
export default function useMakeClasses() {
    const modalType = useGetModalSelectors().type

    return {
        root: getRootClass(modalType),
        outerWrapper: CN + `__outer-wrapper`,
        closeBtn: CN + `__close-btn`,
    }
}

/**
 * Функция возвращает классы корневого тега модального окна
 * @param {String} modalType — тип модального окна
 */
function getRootClass(modalType: StoreModalTypes.Type) {
    const classes  = [CN]

    if (modalType === 'full') {
        classes.push(CN + '--full')
    }

    return makeCN(classes)
}
