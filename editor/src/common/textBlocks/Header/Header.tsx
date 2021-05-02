import React from 'react'
import StoreSettingsTypes from 'store/settings/settingsTypes'
import { useGetComponentSize } from 'utils/MiscUtils'
import { getHeaderClasses } from './Header-func'
import './Header.scss'


export type HeaderPropType = {
    text: string
    type?: 'h1' | 'h2' // Тип заголовка: он задаёт тег заголовка и размер текста
    relativeSize?: StoreSettingsTypes.EditorSizeMultiply
}

/** Заголовок форм авторизации и аутентификации */
function Header(props: HeaderPropType) {

    const {
        text, // Текст заголовка
        type = 'h1' // Тип заголовка: h1. Позже будут добавлены другие типы
    } = props

    // Размер компонента относительно размера всего интерфейса
    const relativeSize = useGetComponentSize(props.relativeSize)

    return (
        <h1 className={getHeaderClasses(type, relativeSize)}>
            { text }
        </h1>
    )
}

export default Header