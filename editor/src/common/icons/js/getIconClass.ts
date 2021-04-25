/**
 * Функция возращает класс который нужно применить к SVG со значком.
 * В зависимости от типа значка будут возвращены разные названия классов
 * @param {String} type — тип значка.
 */
export function getIconClass(type: string): string {
    const CN = 'main-tab'

    switch (type) {
        case 'logo':
            // Базовый цвет значков
            return `${CN}-icon-color-fill`
        case 'selectInputSmallArrows':
        case 'selectInputMiddleArrows':
        case 'selectInputBigArrows':
            return `${CN}-icon-color-stroke`

        // Значки главных вкладок
        case 'mainTabMaterialsSmall':
        case 'mainTabEditorSmall':
        case 'mainTabSettingsSmall':
        case 'mainTabMaterialsMiddle':
        case 'mainTabEditorMiddle':
        case 'mainTabSettingsMiddle':
        case 'mainTabMaterialsBig':
        case 'mainTabEditorBig':
        case 'mainTabSettingsBig':
            return `${CN}-icon-color-fill`

        // Закругляемая часть в кнопки вкладки
        case 'mainTabRoundScion':
            return `${CN}-bg-color-2`
        default: return ''
    }
}
