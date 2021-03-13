import React from 'react'
import './css/Header.scss'


export type HeaderPropType = {
    text: string,
    type: string
}

/** Заголовок форм авторизации и аутентификации */
function Header(props: HeaderPropType) {

    const {
        text, // Текст заголовка
        type // Тип заголовка: h1. Позже будут добавлены другие типы
    } = props

    const CN = 'header'

    return (
        <h1 className={`${CN} ${CN}--${type}`}>
            { text }
        </h1>
    )
}

export default Header