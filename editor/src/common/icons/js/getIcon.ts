import Logo from '../icons/logo'
import ErrorTriangle from '../icons/errorTriangle'
import SuccessCircle from '../icons/successCircle'

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
        default: return Logo
    }
}
