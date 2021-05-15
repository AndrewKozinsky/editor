import React, {useRef} from 'react'
import { useGetComponentSize } from 'utils/MiscUtils'
import StoreSettingsTypes from 'store/settings/settingsTypes'
import {MiscTypes} from 'types/miscTypes'
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
    icon?: 'btnSignSave' | 'btnSignFolder' | 'btnSignTrash' | 'btnSignCode' | 'btnSignAdd' | 'btnSignJson' | 'btnSignClose' | 'btnSignExit'
    text?: string
    name?: string
    loading?: boolean
    block?: boolean // Должна ли кнопка быть блочным элементом на всю ширину
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
        block = false, // Должна ли кнопка быть блочным элементом на всю ширину
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
    const btnAttrs: MiscTypes.ObjStringKeyAnyVal = {
        type,
        className: getButtonClasses(props, size, block),
        disabled: disabled,
        ref: buttonRef
    }
    if (name) btnAttrs.name = name
    if (onClick) btnAttrs.onClick = onClick



    return (
        <button {...btnAttrs}>
            <ButtonIcon iconType={icon} CN={CN} size={size} color={color} />
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


type ButtonIconPropType = {
    iconType: string // Тип значка. Если не передан, то кнопка не будет отрисована
    CN: string // Корневой класс кнопки
    size: StoreSettingsTypes.EditorSize // Размер значка
    color?: 'base' | 'accent' // Цвет заливки кнопки
}

function ButtonIcon(props: ButtonIconPropType) {

    const {
        iconType,
        CN,
        size,
        color
    } = props

    if (!iconType) return null

    const attrs: MiscTypes.ObjStringKeyStringVal = {
        type: iconType,
        className: `${CN}__icon ${CN}__icon-${size}-size`
    }
    if (color === 'accent') {
        attrs.specialClass = '-white-btn-icon'
    }

    //@ts-ignore
    return <SvgIcon {...attrs}  />


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