import './Menu.scss'

// Корневой класс
const menuRootClass = 'menu'

function makeClasses() {
    return {
        root: menuRootClass,
        ul: `${menuRootClass}__ul`,
        li: `${menuRootClass}__li`,
    }
}

export default makeClasses