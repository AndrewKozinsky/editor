import './Menu.scss'

// Корневой класс
const CN = 'menu'

/** Функция возвращающая классы для элементов */
export default function makeClasses() {
    return {
        root: CN,
        ul: CN + `__ul`,
        li: CN + `__li`,
    }
}
