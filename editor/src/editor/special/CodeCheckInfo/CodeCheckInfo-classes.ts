import './CodeCheckInfo.scss'

const rootClass = 'code-check-info'

export default function makeClasses() {
    return {
        header: `${rootClass}__header`,
        itemsUl: `${rootClass}__items-ul`,
        itemsLi: `${rootClass}__items-li`,
        code: `${rootClass}__code`,
    }
}
