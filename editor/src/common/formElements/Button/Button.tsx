import React, {useRef} from 'react'
import { useGetComponentSize } from 'utils/MiscUtils'
import StoreSettingsTypes from 'store/settings/settingsTypes'
import {ObjStringKeyAnyValType} from 'types/miscTypes'
import Loader from 'common/misc/Loader/Loader'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import {getButtonClasses, getButtonLoaderClasses} from './Button-func'
import './Button.scss'
import SvgIcon from '../../icons/SvgIcon';
import {useSetFocus} from '../TextInput/TextInput-func';


export type ButtonPropType = {
    type?: 'button' | 'submit' | 'reset'
    relativeSize?: StoreSettingsTypes.EditorSizeMultiply
    view?: 'standard' | 'onlyIcon'
    color?: 'base' | 'accent'
    icon?: 'btnSignSave' | 'btnSignFolder' | 'btnSignTrash' | 'btnSignCode' | 'btnSignAdd' | 'btnSignJson' | 'btnSignClose'
    text?: string
    name?: string
    loading?: boolean
    onClick?: (...args: any[]) => void
    disabled?: boolean
    autoFocus?: boolean | number, // Нужно ли ставить фокус при загрузке. Если передаётся число, то фокусировка будет поставлена через указанное количество миллисекунд
}


/** Компонент кнопки */
function Button(props: ButtonPropType) {

    let {
        type = 'button', // Тип кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значёк)
        view = 'standard', // Вид кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значёк)
        color = 'base', // Цвет кнопки. Варианты: base (стандартный цвет), accent (акцентный цвет)
        icon, // Тип значка
        text, // Текст на кнопке
        name, // Атрибут name кнопки
        disabled = false, // Заблокирована ли кнопка
        loading = false, // Нужно ли на кнопке рисовать загрузчик
        onClick,
        autoFocus = false, // Нужно ли ставить фокус при загрузке
    } = props

    const CN = 'btn'

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Ссылка на элемент
    const buttonRef = useRef(null)
    // Установка фокусировки при необходомости
    useSetFocus(buttonRef, autoFocus)

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

    // Если включена загрузка, то заблокировать кнопку и убрать значёк
    if (loading) {
        disabled = true
        icon = undefined
    }

    // Атрибуты кнопки
    const btnAttrs: ObjStringKeyAnyValType = {
        type,
        className: getButtonClasses(props, size),
        disabled: disabled,
        ref: buttonRef
    }
    if (name) btnAttrs.name = name
    if (onClick) btnAttrs.onClick = onClick

    // Значёк на кнопке
    let $icon = null
    if (icon) $icon = <SvgIcon type={icon} className={`${CN}__icon ${CN}__icon-${size}-size`} />

    return (
        <button {...btnAttrs}>
            {$icon}
            <ButtonLoader loading={loading} size={size}/>
            {btnText}
        </button>
    )
}

export default Button


type ButtonLoaderPropType = {
    loading?: boolean // Нужно ли отрисовывать загрузчик
    size: StoreSettingsTypes.EditorSize
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