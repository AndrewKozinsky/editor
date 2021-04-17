import React from 'react'
import { useGetComponentSize } from 'utils/MiscUtils'
import { EditorSizeMultiplyType, EditorSizeType } from 'store/settings/settingsTypes'
import {ObjStringKeyAnyValType} from 'types/miscTypes'
import Loader from 'common/misc/Loader/Loader'
import './Button.scss'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import {getButtonClasses, getButtonLoaderClasses} from './Button-func'


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
    onClick?: (...args: any[]) => void
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
        onClick
    } = props

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Размер компонента относительно размера всего интерфейса
    const size = useGetComponentSize(props.relativeSize)

    // Текст кнопки
    let btnText: null | string = null
    if (view !== 'onlyIcon' && text) btnText = text

    // При загрузке поменять текст кнопки
    if (btnText && loading) {
        if (lang === 'eng') btnText = 'Sending...'
        if (lang === 'rus') btnText = 'Отправка...'
    }

    // Если включена загрузка, то заблокировать кнопку
    if (loading) disabled = true

    const btnAttrs: ObjStringKeyAnyValType = {
        type,
        className: getButtonClasses(props, size),
        disabled: disabled
    }
    if (name) btnAttrs.name = name
    if (onClick) btnAttrs.onClick = onClick


    return (
        <button {...btnAttrs}>
            <ButtonLoader loading={loading} size={size}/>
            {btnText}
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