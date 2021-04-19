import React from 'react'
import './Header.scss'
import StoreSettingsTypes from 'store/settings/settingsTypes'
import {useGetComponentSize} from 'utils/MiscUtils'
import { getHeaderClasses } from './Header-func'


export type HeaderPropType = {
    text: string
    type: 'h1' // Тип заголовка: он задаёт тег заголовка и размер текста
    relativeSize?: StoreSettingsTypes.EditorSizeMultiply
}

/** Заголовок форм авторизации и аутентификации */
function Header(props: HeaderPropType) {

    const {
        text, // Текст заголовка
        type // Тип заголовка: h1. Позже будут добавлены другие типы
    } = props

    // Размер компонента относительно размера всего интерфейса
    const relativeSize = useGetComponentSize(props.relativeSize)

    return (
        <h1 className={getHeaderClasses(props, relativeSize)}>
            { text }
        </h1>
    )
}

export default Header