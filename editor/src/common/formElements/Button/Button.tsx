import React from 'react'
import { getClasses } from './functions'
import './Button.scss'
import './functions'


export type ButtonPropType = {
    type?: 'button' |  'submit' |  'reset'
    size?: 'small' | 'middle' | 'big'
    view?: 'standard' | 'onlyIcon'
    color?: string
    // icon?: string
    text?: string
    disabled?: boolean
    // isLoading?: boolean
}

function Button(props: ButtonPropType) {

    const {
        type = 'button', // Тип кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значёк)
        size = 'middle', // Размер кнопки. Варианты: small (маленькая), middle (стандартного размера), big (большая)
        view = 'standard', // Вид кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значёк)
        color = 'base', // Цвет кнопки. Варианты: base (стандартный цвет), accent (акцентный цвет)
        // icon, // Тип значка
        text, // Текст на кнопке
        disabled = false, // Заблокирована ли кнопка
        // isLoading, // Нужно ли на кнопке рисовать загрузчик
    } = props


    // Текст кнопки
    let btnText: null | string = null
    if (view !== 'onlyIcon' && text) btnText = text

    const btnAttrs = {
        type,
        className: getClasses(props),
        disabled: disabled
    }


    return (
        <button {...btnAttrs}>{btnText}</button>
    )
}

export default Button