import {EditorLanguageType} from '../../store/settings/settingsTypes';
import {MenuItems} from '../../common/misc/Menu/Menu';
import messages from './messages';

/**
 * Функция возвращает массив данных для генерации меню выше формы
 * @param {String} lang — язык интерфейса
 */
export function getMenuItems(lang: EditorLanguageType): MenuItems {
    return [
        { to: '/reg', label: messages.menu.reg[lang] },
        { to: '/enter', label: messages.menu.enter[lang] },
        { to: '/reset-password', label: messages.menu.reset[lang] }
    ]
}