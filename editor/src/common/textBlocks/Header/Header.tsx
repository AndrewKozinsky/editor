import React from 'react'
import './Header.scss'
import {EditorSizeType} from 'store/settings/settingsTypes'
import {useGetComponentSize} from 'utils/MiscUtils'
import { getHeaderClasses } from './Header-func'


export type HeaderPropType = {
    text: string
    type: 'h1' // Тип заголовка: он задаёт тег заголовка и размер текста
    size?: EditorSizeType
}

/** Заголовок форм авторизации и аутентификации */
function Header(props: HeaderPropType) {

    const {
        text, // Текст заголовка
        type // Тип заголовка: h1. Позже будут добавлены другие типы
    } = props

    // Размер элемента': tiny (крошечный), small (маленький), middle (средний), big (большой)
    const size = useGetComponentSize(props.size)

    return (
        <h1 className={getHeaderClasses(props, size)}>
            { text }
        </h1>
    )
}

export default Header