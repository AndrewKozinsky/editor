import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import makeClasses from './Menu-classes'
import { makeCN } from 'utils/stringUtils'


// Тип props у компонента Menu
export type MenuPropType = {
    items: MenuItems // Пункты меню
}
// Тип массива данных для генерации пунктов меню
export type MenuItems = MenuItem[]
export type MenuItem = {to: string, label: string}

/** Компонент меню. Сейчас используется на форме входа. */
export default function Menu(props: MenuPropType) {
    const { items } = props

    const CN = makeClasses()

    const $items = items.map((item, i) => {
        return (
            <li className={CN.li} key={i}>
                <MenuLink to={item.to} label={item.label} key={i} />
            </li>
        )
    })

    return (
        <nav className={CN.root}>
            <ul className={CN.ul}>
                {$items}
            </ul>
        </nav>
    )
}


/** Компонент ссылки меню */
function MenuLink(props: MenuItem) {
    const {
        to,   // Куда ведёт ссылка
        label // Текст ссылки
    } = props

    // Соответствует ли текущей адрес переданной ссылке
    let match = useRouteMatch({
        path: to,
        exact: true
    })

    const classes: string[] = []
    if (match) classes.push('menu--disabled-link')

    return <Link to={to} className={makeCN(classes)}>{label}</Link>
}
