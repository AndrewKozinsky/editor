import React from 'react'
import {
    Link,
    useRouteMatch
} from "react-router-dom"
import './css/AuthFormMenu.scss'
import {useSelector} from 'react-redux'
import {AppState} from '../../../store/rootReduser'
import messages from '../messages'


// Корневой класс
const CN = 'page-menu'

function AuthFormMenu() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    return (
        <nav className={CN}>
            <ul className={`${CN}__ul`}>
                <li className={`${CN}__li`}>
                    <MenuLink
                        to='/reg'
                        label={messages.menu.reg[lang]}
                    />
                </li>
                <li className={`${CN}__li`}>
                    <MenuLink
                        to='/enter'
                        label={messages.menu.enter[lang]}
                    />
                </li>
                <li className={`${CN}__li`}>
                    <MenuLink
                        to='/reset-password'
                        label={messages.menu.reset[lang]}
                    />
                </li>
            </ul>
        </nav>
    );
}

export default AuthFormMenu



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
    });

    return <Link to={to} disable={match}>{label}</Link>
}