import { makeCN } from 'utils/StringUtils'
import './ItemsList.scss'

const rootClass = 'items-list__item'

function makeClasses(isActive: boolean = false) {
    return {
        item: useGetItemClasses(isActive),
    }
}

export default makeClasses

export function useGetItemClasses(isActive: boolean): string {

    const classes = [rootClass]

    // Если кнопка выделена
    if (isActive) classes.push(`${rootClass}--active`)

    return makeCN(classes)
}
