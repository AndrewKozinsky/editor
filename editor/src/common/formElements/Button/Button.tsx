import React, {ReactElement, ReactNode} from 'react'
import {makeCN} from '../../../utils/StringUtils'
import './css/Button.scss'


export type ButtonPropType = {
    size?: string
    type?: string
    color?: string
    // icon?: string
    text?: string
    // isDisabled?: boolean
    // isLoading?: boolean
}

function Button(props: ButtonPropType) {

    const {
        size = 'middle', // Размер кнопки. Варианты: small (маленькая), middle (стандартного размера), big (большая)
        type = 'standard', // Тип кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значёк)
        color = 'base', // Цвет кнопки. Варианты: base (стандартный цвет), accent (акцентный цвет)
        // icon, // Тип значка
        text, // Текст на кнопке
        // isDisabled, // Заблокирована ли кнопка
        // isLoading, // Нужно ли на кнопке рисовать загрузчик
    } = props


    // Текст кнопки
    let btnText: null | string = null
    if (type !== 'onlyIcon' && text) btnText = text

    // Классы кнопки
    const CN = 'btn'
    const classes = [CN]


    // Размер кнопки.
    // small (маленькая), middle (стандартного размера), big (большая)
    if (size === 'middle') {
        classes.push(`${CN}--middle-size`)
    }

    // Тип кнопки.
    // standard (стандартная кнопка), onlyIcon (только значёк).
    if (type === 'standard') {
        classes.push(`${CN}--standard-type`)
    }

    // Цвет кнопки.
    // base (стандартный цвет), accent (акцентный цвет)
    if (color === 'base') {
        classes.push(`${CN}--base-color`)
    }


    return (
        <button className={makeCN(classes)}>{btnText}</button>
    )
}

export default Button