import { makeCN } from 'utils/StringUtils'
import './ItemsList.scss'

const rootClass = 'items-list__item'

export default function makeClasses(isActive: boolean = false) {
    return {
        item: useGetItemClasses(isActive),
    }
}


export function useGetItemClasses(isActive: boolean): string {

    const classes = [rootClass]

    // Если кнопка выделена
    if (isActive) classes.push(`${rootClass}--active`)

    return makeCN(classes)
}
