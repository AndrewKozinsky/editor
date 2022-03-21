import useGetModalSelectors from 'store/modal/modalSelectors'
import StoreModalTypes from 'store/modal/modalTypes'
import { makeCN } from 'utils/stringUtils'
import './ModalShortContent.scss'

const CN = 'modal-short-content'

/** Функция возвращающая классы для элементов */
export default function useMakeClasses() {
    const modalType = useGetModalSelectors().type

    return {
        root: CN,
        content: CN + `__content`,
        bottom: getBottom(modalType),
    }
}

/** Функция возвращает классы для элементы нижней части содержимого модального ока */
function getBottom(modalType: StoreModalTypes.Type) {
    const classes = [CN + `__bottom`]

    if (modalType === 'short') {
        classes.push(CN + `__bottom--short`)
    }
    else if (modalType === 'full') {
        classes.push(CN + `__bottom--full`)
    }

    return makeCN(classes)
}
