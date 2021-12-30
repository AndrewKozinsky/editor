import { makeCN } from 'utils/StringUtils';
import './Label.scss';
const CN = 'label';
/** Функция возвращающая классы для элементов */
export default function makeClasses(disabled, bold) {
    return {
        root: getLabelClasses(disabled, bold)
    };
}
/**
 * Функция возвращает классы выпадающего списка
 * @param {Boolean} disabled — заблокировано ли поле где есть эта подпись
 * @param {Boolean} bold — должен ли текст быть жирным
 */
export function getLabelClasses(disabled, bold) {
    // Классы кнопки
    const classes = [CN];
    // Если поле заблокировано
    if (disabled)
        classes.push(`${CN}--disabled`);
    // Если текст должен быть жирным
    if (bold)
        classes.push(`${CN}--bold`);
    return makeCN(classes);
}
//# sourceMappingURL=Label-classes.js.map