import { makeCN } from 'utils/StringUtils';
import './ItemsList.scss';
const CN = 'items-list__item';
/** Функция возвращающая классы для элементов */
export default function makeClasses(isActive = false) {
    return {
        item: useGetItemClasses(isActive),
    };
}
// TODO Что делает эта функция?
export function useGetItemClasses(isActive) {
    const classes = [CN];
    // Если кнопка выделена
    if (isActive)
        classes.push(`${CN}--active`);
    return makeCN(classes);
}
//# sourceMappingURL=ItemsList-classes.js.map