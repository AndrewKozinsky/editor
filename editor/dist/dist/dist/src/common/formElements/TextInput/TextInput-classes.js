import { makeCN } from 'utils/StringUtils';
import './TextInput.scss';
const CN = 'text-input';
/** Функция возвращающая классы для элементов */
export default function makeClasses(maxWidth) {
    return {
        root: getTextInputClasses(maxWidth),
    };
}
/**
 * Функция возвращает классы выпадающего списка
 * @param maxWidth — максимальная ширина поля.
 */
export function getTextInputClasses(maxWidth) {
    // Классы
    const classes = [CN];
    // Добавление максимальной ширины при необходимости
    if (maxWidth) {
        classes.push(`${CN}--maxWidth-${maxWidth}`);
    }
    return makeCN(classes);
}
//# sourceMappingURL=TextInput-classes.js.map
//# sourceMappingURL=TextInput-classes.js.map
//# sourceMappingURL=TextInput-classes.js.map