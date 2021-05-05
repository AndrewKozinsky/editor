import BtnSignSaveSmall from '../icons/btnSignSaveSmall';
import BtnSignSaveMiddle from '../icons/btnSignSaveMiddle';
import BtnSignSaveBig from '../icons/btnSignSaveBig';
import BtnSignFolderSmall from '../icons/btnSignFolderSmall';
import BtnSignFolderMiddle from '../icons/btnSignFolderMiddle';
import BtnSignFolderBig from '../icons/btnSignFolderBig';
import BtnSignTrashSmall from '../icons/btnSignTrashSmall';
import BtnSignTrashMiddle from '../icons/btnSignTrashMiddle';
import BtnSignTrashBig from '../icons/btnSignTrashBig';
import BtnSignCodeSmall from '../icons/btnSignCodeSmall';
import BtnSignCodeMiddle from '../icons/btnSignCodeMiddle';
import BtnSignCodeBig from '../icons/btnSignCodeBig';
import BtnSignAddSmall from '../icons/btnSignAddSmall';
import BtnSignAddMiddle from '../icons/btnSignAddMiddle';
import BtnSignAddBig from '../icons/btnSignAddBig';
import BtnSignJsonSmall from '../icons/btnSignJsonSmall';
import BtnSignJsonMiddle from '../icons/btnSignJsonMiddle';
import BtnSignJsonBig from '../icons/btnSignJsonBig';

/**
 * Функция возращает класс который нужно применить к SVG со значком.
 * В зависимости от типа значка будут возвращены разные названия классов
 * @param {String} type — тип значка.
 * @param {String} specialClass — класс, который нужно задать значку.
 */
export function getIconClass(type: string, specialClass?: string): string {
    const CN = 'icon'

    // Если указан спецкласс, то возратить его
    if (specialClass) return CN + specialClass

    switch (type) {
        // Базовый цвет значков
        case 'logo':
            return `${CN}-icon-color-fill`

        // Тёмная обводка
        case 'selectInputSmallArrows':
        case 'selectInputMiddleArrows':
        case 'selectInputBigArrows':
            return `${CN}-icon-color-stroke`

        // Значки главных вкладок
        case 'mainTabMaterials':
        case 'mainTabEditor':
        case 'mainTabSettings':
        // Значки на вкладках сайта
        case 'siteTabSite':
        case 'siteTabPlugins':
        case 'siteTabComponents':
        case 'siteTabArticle':
            return `${CN}-icon-color-fill`

        // Закругляемая часть в кнопки вкладки
        case 'mainTabRoundScion':
            return `${CN}-bg-color-2`

        // Значки на кнопках
        case 'btnSignSave':
        case 'btnSignFolder':
        case 'btnSignTrash':
        case 'btnSignCode':
        case 'btnSignAdd':
        case 'btnSignJson':
        case 'btnSignClose':
        case 'btnSignExit':
            return `${CN}-btn-icon`

        default: return ''
    }
}
