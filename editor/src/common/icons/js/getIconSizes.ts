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
        default: return {}
    }
}
