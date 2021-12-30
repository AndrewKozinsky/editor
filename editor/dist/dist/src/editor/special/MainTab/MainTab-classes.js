import { makeCN } from 'utils/StringUtils';
import './MainTab.scss';
const CN = 'main-tab';
/** Функция возвращающая классы для элементов */
export default function makeClasses(active, position) {
    return {
        tab: getTabClasses(active, position),
        scion: `${CN}__scion`
    };
}
/**
 * Функция возвращает классы вкладки.
 * @param {Boolean} active — текущая ли кнопка вкладки
 * @param {String} position — Положение вкладки влияет на расположение полукруглых элементов
 */
export function getTabClasses(active, position) {
    // Классы кнопки вкладки
    const classes = [CN];
    // Если активна
    if (active)
        classes.push(`${CN}--active`);
    // Позиция кнопки
    classes.push(`${CN}--${position}-position`);
    return makeCN(classes);
}
//# sourceMappingURL=MainTab-classes.js.map
//# sourceMappingURL=MainTab-classes.js.map