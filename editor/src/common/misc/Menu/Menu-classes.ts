import './Menu.scss'

// Корневой класс
const menuRootClass = 'menu'

export default function makeClasses() {
    return {
        root: menuRootClass,
        ul: `${menuRootClass}__ul`,
        li: `${menuRootClass}__li`,
    }
}
