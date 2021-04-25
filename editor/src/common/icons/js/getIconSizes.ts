// import React from 'react';

import mainTabMaterialsSmall from '../icons/mainTabMaterialsSmall';
import mainTabMaterialsMiddle from '../icons/mainTabMaterialsMiddle';
import mainTabMaterialsBig from '../icons/mainTabMaterialsBig';
import mainTabEditorSmall from '../icons/mainTabEditorSmall';
import mainTabEditorMiddle from '../icons/mainTabEditorMiddle';
import mainTabEditorBig from '../icons/mainTabEditorBig';
import mainTabSettingsSmall from '../icons/mainTabSettingsSmall';
import mainTabSettingsMiddle from '../icons/mainTabSettingsMiddle';
import mainTabSettingsBig from '../icons/mainTabSettingsBig';

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
        case 'selectInputBigArrows':
            return {
                width: "10px",
                height: "20px",
                viewBox: "0 0 10 20"
            }

        // Значки главных вкладок
        case 'mainTabMaterialsSmall':
        case 'mainTabEditorSmall':
        case 'mainTabSettingsSmall':
            return {
                width: "39px",
                height: "34px",
                viewBox: "0 0 39 34"
            }
        case 'mainTabMaterialsMiddle':
        case 'mainTabEditorMiddle':
        case 'mainTabSettingsMiddle':
            return {
                width: "45px",
                height: "39px",
                viewBox: "0 0 45 39"
            }
        case 'mainTabMaterialsBig':
        case 'mainTabEditorBig':
        case 'mainTabSettingsBig':
            return {
                width: "51px",
                height: "44px",
                viewBox: "0 0 51 44"
            }
        case 'mainTabRoundScion':
            return {
                width: "3px",
                height: "3px",
                viewBox: "0 0 3 3"
            }
        default: return {}
    }
}






