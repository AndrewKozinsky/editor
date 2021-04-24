/**
 * Функция возращает класс который нужно применить к SVG со значком.
 * В зависимости от типа значка будут возвращены разные названия классов
 * @param {String} type — тип значка.
 */
export function getIconClass(type: string): string {

    switch (type) {
        case 'logo':
            // Базовый цвет значков
            return 'base-svg-logo'
        case 'selectInputSmallArrows':
        case 'selectInputMiddleArrows':
        case 'selectInputBigArrows':
            return 'select-input-arrows'
        default: return ''
    }
}
