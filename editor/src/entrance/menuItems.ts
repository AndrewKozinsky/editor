import { MenuItems } from 'common/misc/Menu/Menu'
import { regMenuMessages } from 'src/messages/regMenuMessages'


/** Функция возвращает массив данных для генерации меню выше формы */
export function getMenuItems(): MenuItems {
    return [
        { to: '/reg', label: regMenuMessages.reg },
        { to: '/enter', label: regMenuMessages.enter },
        { to: '/reset-password', label: regMenuMessages.reset }
    ]
}
