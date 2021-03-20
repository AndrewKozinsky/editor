import React from 'react'
// @ts-ignore
import { Link, useRouteMatch } from 'react-router-dom'
import {useGetComponentSize} from 'utils/MiscUtils'
import {EditorSizeType} from 'store/settings/settingsTypes'
import { getLiClasses } from './Menu-func'
import './Menu.scss'


// Корневой класс
const CN = 'menu'

// Тип props у компонента Menu
export type MenuPropType = {
    size?: EditorSizeType,
    items: {to: string, label: string}[]
}
// Тип массива данных для генерации пунктов меню
export type MenuItems = {to: string, label: string}[]

/** Компонент меню. Сейчас используется на форме входа. */
function Menu(props: MenuPropType) {

    const {
        items
    } = props

    // Размер элемента: tiny (крошечный), small (маленький), middle (средний), big (большой)
    const size = useGetComponentSize(props.size)

    const $items = items.map(item => {
        return (
            <li className={getLiClasses(size)}>
                <MenuLink to={item.to} label={item.label} />
            </li>
        )
    })

    return (
        <nav className={CN}>
            <ul className={`${CN}__ul`}>
                {$items}
            </ul>
        </nav>
    )
}

export default Menu



type MenuLinkPropType = {
    to: string
    label: string
}

/** Компонент ссылки меню */
function MenuLink(props: MenuLinkPropType) {

    const {
        to, // Куда ведёт ссылка
        label // Текст ссылки
    } = props

    // Соответствует ли текущей адрес переданной ссылке
    let match = useRouteMatch({
        path: to,
        exact: true
    })

    const classes: string[] = []
    if (match) classes.push(`${CN}--disabled-link`)

    return <Link to={to} className={classes}>{label}</Link>
}
