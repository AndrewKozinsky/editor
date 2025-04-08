import './BottomButtons.scss'
import {makeCN} from 'utils/stringUtils'

const CN = 'left-bottom-section'

/** Функция возвращающая классы для элементов */
export default function makeClasses() {
    return {
        root: CN,
        group: CN + '__group',
        button: CN + '__button',
    }
}

/** Функция возвращающая классы для элементов */
export function makeAttrBtnClasses(isActive: boolean) {
    const classes = [CN + '__attr-btn']

    // Если поле активно
    if (isActive) classes.push(`${CN}__attr-btn--active`)

    return makeCN(classes)
}
