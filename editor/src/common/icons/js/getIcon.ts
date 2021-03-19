import Logo from '../icons/logo'
import ErrorTriangle from '../icons/errorTriangle'
import SuccessCircle from '../icons/successCircle'
import SelectInputSmallArrows from '../icons/selectInputSmallArrows';
import SelectInputMiddleArrows from '../icons/selectInputMiddleArrows';

/**
 * Функция возвращает внутренную часть значка SVG в зависимости от типа
 * @param {String} type — тип значка.
 */
export function getIcon(type: string) {

    switch (type) {
        case 'logo':
            return Logo
        case 'errorTriangle':
            return ErrorTriangle
        case 'successCircle':
            return SuccessCircle
        case 'selectInputSmallArrows':
            return SelectInputSmallArrows
        case 'selectInputMiddleArrows':
            return SelectInputMiddleArrows
        default: return Logo
    }
}
