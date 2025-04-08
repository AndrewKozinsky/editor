import { makeCN } from 'utils/stringUtils'
import './ItemsList.scss'

const CN = 'items-list__item'

/** Функция возвращающая классы для элементов */
export default function makeClasses(isActive: boolean = false) {
    return {
        item: useGetItemClasses(isActive),
    }
}

/** Функция возвращающая классы пункта списка */
export function useGetItemClasses(isActive: boolean): string {
    const classes = [CN]

    // Если кнопка выделена
    if (isActive) classes.push(`${CN}--active`)

    return makeCN(classes)
}
