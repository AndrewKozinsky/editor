import './CodeCheckInfo.scss'

const CN = 'code-check-info'

/** Функция возвращающая классы для элементов */
export default function makeClasses() {
    return {
        header: CN + `__header`,
        itemsUl: CN + `__items-ul`,
        itemsLi: CN + `__items-li`,
        code: CN + `__code`,
    }
}
