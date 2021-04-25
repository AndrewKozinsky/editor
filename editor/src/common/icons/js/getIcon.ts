import Logo from '../icons/logo'
import ErrorTriangle from '../icons/errorTriangle'
import SuccessCircle from '../icons/successCircle'
import SelectInputSmallArrows from '../icons/selectInputSmallArrows'
import SelectInputMiddleArrows from '../icons/selectInputMiddleArrows'
import SelectInputBigArrows from '../icons/selectInputBigArrows'
import mainTabMaterialsSmall from '../icons/mainTabMaterialsSmall';
import mainTabMaterialsMiddle from '../icons/mainTabMaterialsMiddle'
import mainTabMaterialsBig from '../icons/mainTabMaterialsBig'
import mainTabEditorSmall from '../icons/mainTabEditorSmall'
import mainTabEditorMiddle from '../icons/mainTabEditorMiddle'
import mainTabEditorBig from '../icons/mainTabEditorBig'
import mainTabSettingsSmall from '../icons/mainTabSettingsSmall'
import mainTabSettingsMiddle from '../icons/mainTabSettingsMiddle'
import mainTabSettingsBig from '../icons/mainTabSettingsBig'
import mainTabRoundScion from '../icons/mainTabRoundScion'

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
        case 'selectInputBigArrows':
            return SelectInputBigArrows

        // Значки главных вкладок
        case 'mainTabMaterialsSmall':
            return mainTabMaterialsSmall
        case 'mainTabMaterialsMiddle':
            return mainTabMaterialsMiddle
        case 'mainTabMaterialsBig':
            return mainTabMaterialsBig

        case 'mainTabEditorSmall':
            return mainTabEditorSmall
        case 'mainTabEditorMiddle':
            return mainTabEditorMiddle
        case 'mainTabEditorBig':
            return mainTabEditorBig

        case 'mainTabSettingsSmall':
            return mainTabSettingsSmall
        case 'mainTabSettingsMiddle':
            return mainTabSettingsMiddle
        case 'mainTabSettingsBig':
            return mainTabSettingsBig

        // Закругляемая часть в кнопки вкладки
        case 'mainTabRoundScion':
            return mainTabRoundScion
        default: return Logo
    }
}
