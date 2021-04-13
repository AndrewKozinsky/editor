import React from 'react'
import { useGetComponentSize } from 'utils/MiscUtils'
import { EditorSizeMultiplyType, EditorSizeType } from 'store/settings/settingsTypes'
import {getButtonClasses, getButtonLoaderClasses} from './Button-func'
import {ObjStringKeyAnyValType} from '../../../types/miscTypes';
import './Button.scss'
import Loader from '../../misc/Loader/Loader';


export type ButtonPropType = {
    type?: 'button' | 'submit' | 'reset'
    relativeSize?: EditorSizeMultiplyType
    view?: 'standard' | 'onlyIcon'
    color?: 'base' | 'accent'
    // icon?: string
    text?: string
    name?: string
    disabled?: boolean
    loading?: boolean
}

/** Компонент кнопки */
function Button(props: ButtonPropType) {

    let {
        type = 'button', // Тип кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значёк)
        view = 'standard', // Вид кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значёк)
        color = 'base', // Цвет кнопки. Варианты: base (стандартный цвет), accent (акцентный цвет)
        // icon, // Тип значка
        text, // Текст на кнопке
        name, // Атрибут name кнопки
        disabled = false, // Заблокирована ли кнопка
        loading = false, // Нужно ли на кнопке рисовать загрузчик
    } = props

    // Размер компонента относительно размера всего интерфейса
    const size = useGetComponentSize(props.relativeSize)

    // Текст кнопки
    let btnText: null | string = null
    if (view !== 'onlyIcon' && text) btnText = text

    // Если включена загрузка, то заблокировать кнопку
    if (loading) disabled = true

    const btnAttrs: ObjStringKeyAnyValType = {
        type,
        className: getButtonClasses(props, size),
        disabled: disabled
    }
    if (name) btnAttrs.name = name


    return (
        <button {...btnAttrs}>
            <ButtonLoader loading={loading} size={size}/>{btnText}
        </button>
    )
}

export default Button


type ButtonLoaderPropType = {
    loading?: boolean // Нужно ли отрисовывать загрузчик
    size: EditorSizeType
}

/** Компонент загрузчика кнопки */
function ButtonLoader(props: ButtonLoaderPropType) {

    const {
        loading = false,
        size
    } = props

    if (!loading) return null
    return <Loader className={getButtonLoaderClasses(size)} />
}