import React from 'react'
import {makeCN} from 'utils/StringUtils'
import './css/Button.scss'


export type ButtonPropType = {
    type?: 'button' |  'submit' |  'reset'
    size?: string
    view?: 'standard' | 'onlyIcon'
    color?: string
    // icon?: string
    text?: string
    isDisabled?: boolean
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
        isDisabled = false, // Заблокирована ли кнопка
        // isLoading, // Нужно ли на кнопке рисовать загрузчик
    } = props


    // Текст кнопки
    let btnText: null | string = null
    if (view !== 'onlyIcon' && text) btnText = text

    const btnAttrs = {
        type,
        disabled: isDisabled
    }

    // Классы кнопки
    const CN = 'btn'
    const classes = [CN]


    // Размер кнопки.
    // small (маленькая), middle (стандартного размера), big (большая)
    if (size === 'middle') {
        classes.push(`${CN}--middle-size`)
    }

    // Вид кнопки.
    // standard (стандартная кнопка), onlyIcon (только значёк).
    if (view === 'standard') {
        classes.push(`${CN}--standard-view`)
    }

    // Цвет кнопки.
    // base (стандартный цвет), accent (акцентный цвет)
    if (color === 'base') {
        classes.push(`${CN}--base-color`)
    }

    btnAttrs.className = makeCN(classes)


    return (
        <button {...btnAttrs}>{btnText}</button>
    )
}

export default Button