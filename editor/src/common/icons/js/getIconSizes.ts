// import React from 'react';

/**
 * Функция возращает атрибуты с размерами значка в SVG.
 * В зависимости от типа значка будут возвращены разные названия размеры
 * @param {String} type — тип значка.
 */
export function getIconSizes(type: string) {

    switch (type) {
        case 'logo':
            // Базовый цвет значков
            return {
                width: "84px",
                height: "18px",
                viewBox: "0 0 84 18"
            }
        case 'errorTriangle':
        case 'successCircle':
            return {
                width: "13px",
                height: "13px",
                viewBox: "0 0 13 13"
            }
        case 'selectInputSmallArrows':
            return {
                width: "8px",
                height: "14px",
                viewBox: "0 0 8 14"
            }
        case 'selectInputMiddleArrows':
            return {
                width: "10px",
                height: "17px",
                viewBox: "0 0 10 17"
            }
        default: return {}
    }
}
