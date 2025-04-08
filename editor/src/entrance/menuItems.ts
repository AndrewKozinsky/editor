import { MenuItems } from 'common/misc/Menu/Menu'
import regMenuMsg from 'messages/regMenuMessages'

/** Функция возвращает массив данных для генерации меню выше формы */
export function getMenuItems(): MenuItems {
    return [
        { to: '/reg', label: regMenuMsg.reg },
        { to: '/enter', label: regMenuMsg.enter },
        { to: '/reset-password', label: regMenuMsg.reset }
    ]
}
