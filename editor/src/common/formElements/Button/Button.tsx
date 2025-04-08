import React, { ReactElement, useRef } from 'react'
import { MiscTypes } from 'types/miscTypes'
import Loader from 'common/misc/Loader/Loader'
import iconsCollector from '../../icons/js/getIcon'
import { useSetFocus } from './Button-func'
import makeClasses from './Button-classes'
import SvgIcon, { SvgIconPropType } from '../../icons/SvgIcon'


export type ButtonPropType = {
    type?: 'button' | 'submit' | 'reset'
    view?: 'standard' | 'onlyIcon'
    color?: 'base' | 'accent'
    big?: boolean, // Is button big
    align?: 'center' | 'right'
    icon?: ButtonIconType
    text?: string | ReactElement
    name?: string
    loading?: boolean
    block?: boolean // Должна ли кнопка быть блочным элементом на всю ширину
    extraClass?: string
    id?: string
    onClick?: (...args: any[]) => void
    disabled?: boolean
    autoFocus?: boolean | number, // Нужно ли ставить фокус при загрузке. Если передаётся число, то фокусировка будет поставлена через указанное количество миллисекунд
}

export type ButtonIconType = 'btnSignSave' | 'btnSignFolder' | 'btnSignTrash' | 'btnSignCode' | 'btnSignText'
    | 'btnSignAdd' | 'btnSignJson' | 'btnSignClose' | 'btnSignExit' | 'btnSignEdit' | 'btnSignUndo' | 'btnSignRedo'


/** Компонент кнопки */
export default function Button(props: ButtonPropType) {

    let {
        type = 'button', // Тип кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значок)
        view = 'standard', // Вид кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значок)
        color = 'base', // Цвет кнопки. Варианты: base (стандартный цвет), accent (акцентный цвет)
        icon, // Тип значка
        text, // Текст на кнопке
        name, // Атрибут name кнопки
        disabled = false, // Заблокирована ли кнопка
        loading = false, // Нужно ли на кнопке рисовать загрузчик
        onClick,
        id,
        autoFocus = false, // Нужно ли ставить фокус при загрузке
    } = props

    // Ссылка на элемент
    const buttonRef = useRef(null)
    // Установка фокусировки при необходомости
    useSetFocus(buttonRef, autoFocus)

    // Текст кнопки
    let btnText: null | string | ReactElement = null
    if (view !== 'onlyIcon' && text) btnText = text

    // При загрузке поменять текст кнопки
    if (btnText && loading) {
        // const editorLanguage = getFromLocalStorage(config.ls.editorLanguage)
        // if (editorLanguage === 'eng') btnText = 'Sending...'
        // if (editorLanguage === 'rus') btnText = 'Отправка...'
    }

    // Если включена загрузка, то заблокировать кнопку и убрать значок
    if (loading) {
        disabled = true
        icon = undefined
    }

    const CN = makeClasses(props)

    // Атрибуты кнопки
    const btnAttrs: MiscTypes.ObjStringKey<any> = {
        type,
        className: CN.root,
        disabled: disabled,
        ref: buttonRef
    }
    if (name) btnAttrs.name = name
    if (onClick) btnAttrs.onClick = onClick
    if (id) btnAttrs.id = id


    return (
        <button {...btnAttrs}>
            {/*@ts-ignore*/}
            <ButtonIcon iconType={icon} color={color} CN={CN} />
            <ButtonLoader loading={loading} />
            {btnText}
        </button>
    )
}


type ButtonIconPropType = {
    iconType: keyof typeof iconsCollector // Тип значка. Если не передан, то кнопка не будет отрисована
    color?: 'base' | 'accent' // Цвет заливки кнопки
    CN: MiscTypes.ObjStringKey<string>
}

/* Значок на кнопке */
function ButtonIcon(props: ButtonIconPropType) {
    const { iconType, color, CN } = props

    if (!iconType) return null

    const attrs: SvgIconPropType = {
        type: iconType,
        baseClass: '-icon-fill',
        extraClass: CN.icon
    }
    if (color === 'accent') {
        attrs.baseClass = '-white-fill'
    }

    return <SvgIcon {...attrs}  />
}


type ButtonLoaderPropType = {
    loading?: boolean // Нужно ли отрисовать загрузчик
}

/** Компонент загрузчика кнопки */
function ButtonLoader(props: ButtonLoaderPropType) {
    const { loading = false } = props

    if (!loading) return null
    return <Loader className='btn-loader' />
}
