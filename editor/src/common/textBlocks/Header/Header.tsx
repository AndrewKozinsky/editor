import React, { ReactElement } from 'react'
import makeClasses from './Header-classes'


export type HeaderPropType = {
    text: string | ReactElement
    type?: HeaderTypeType // Тип заголовка: он задаёт тег заголовка и размер текста
}
export type HeaderTypeType = 'h1' | 'h2'

/** Заголовок */
export default function Header(props: HeaderPropType) {

    const {
        text, // Текст заголовка
        type = 'h1' // Тип заголовка: h1. Позже будут добавлены другие типы
    } = props

    const CN = makeClasses(type)

    return (
        <h1 className={CN.root}>
            { text }
        </h1>
    )
}
