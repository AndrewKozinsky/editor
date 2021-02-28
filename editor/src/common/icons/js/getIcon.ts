import Logo from '../icons/logo'

/**
 * Функция возвращает внутренную часть значка SVG в зависимости от типа
 * @param {String} type — тип значка.
 */
export function getIcon(type: string) {

    switch (type) {
        case 'logo':
            return Logo
        default: return Logo
    }
}