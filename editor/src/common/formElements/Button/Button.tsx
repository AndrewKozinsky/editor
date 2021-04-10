import React from 'react'
import { useGetComponentSize } from 'utils/MiscUtils'
import { EditorSizeMultiplyType } from 'store/settings/settingsTypes'
import { getButtonClasses } from './Button-func'
import {ObjStringKeyAnyValType} from '../../../types/miscTypes';
import './Button.scss'


export type ButtonPropType = {
    type?: 'button' | 'submit' | 'reset'
    relativeSize?: EditorSizeMultiplyType
    view?: 'standard' | 'onlyIcon'
    color?: 'base' | 'accent'
    // icon?: string
    text?: string
    name?: string
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
        name, // Атрибут name кнопки
        disabled = false, // Заблокирована ли кнопка
        // isLoading, // Нужно ли на кнопке рисовать загрузчик
    } = props

    // Размер компонента относительно размера всего интерфейса
    const relativeSize = useGetComponentSize(props.relativeSize)

    // Текст кнопки
    let btnText: null | string = null
    if (view !== 'onlyIcon' && text) btnText = text

    const btnAttrs: ObjStringKeyAnyValType = {
        type,
        className: getButtonClasses(props, relativeSize),
        disabled: disabled
    }
    if (name) btnAttrs.name = name


    return (
        <button {...btnAttrs}>{btnText}</button>
    )
}

export default Button