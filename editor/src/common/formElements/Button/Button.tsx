import React from 'react'
import { getClasses } from './functions'
import './Button.scss'
import './functions'
import { useGetComponentSize } from '../../../utils/MiscUtils'
import { EditorSizeType } from '../../../store/settings/settingsTypes'


export type ButtonPropType = {
    type?: 'button' | 'submit' | 'reset'
    size?: EditorSizeType
    view?: 'standard' | 'onlyIcon'
    color?: 'base' | 'accent'
    // icon?: string
    text?: string
    disabled?: boolean
    // isLoading?: boolean
}

function Button(props: ButtonPropType) {

    const {
        type = 'button', // Тип кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значёк)
        view = 'standard', // Вид кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значёк)
        color = 'base', // Цвет кнопки. Варианты: base (стандартный цвет), accent (акцентный цвет)
        // icon, // Тип значка
        text, // Текст на кнопке
        disabled = false, // Заблокирована ли кнопка
        // isLoading, // Нужно ли на кнопке рисовать загрузчик
    } = props

    // Размер элемента': tiny (крошечный), small (маленький), middle (средний), big (большой)
    const size = useGetComponentSize(props.size)

    // Текст кнопки
    let btnText: null | string = null
    if (view !== 'onlyIcon' && text) btnText = text

    const btnAttrs = {
        type,
        className: getClasses(props, size),
        disabled: disabled
    }


    return (
        <button {...btnAttrs}>{btnText}</button>
    )
}

export default Button