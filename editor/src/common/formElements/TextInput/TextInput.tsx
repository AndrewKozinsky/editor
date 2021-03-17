import React, {useState} from 'react'
import './css/TextInput.scss'
import {getRandomId, makeCN } from 'utils/StringUtils'
import Notice from 'common/Notice/Notice'
import Wrapper from 'common/Wrapper/Wrapper'


type TextInputPropType = {
    label?: string // Подпись текстового поля
    type?: 'text' | 'email' | 'password' // Подпись текстового поля
    name: string, // Аттрибут name текстового поля
    value: string, // Аттрибут name текстового поля
    autocomplete?: '' | 'username' | 'current-password', // Значение автозаполнения поля
    // Доступные значения для autocomplete: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute
    size?: 'small' | 'middle' // Размер поля
    placeholder?: string, // Текстозаполнитель
    autoFocus?: boolean, // Нужно ли ставить фокус при загрузке
    onChange: () => void, // Обработчик изменения поля
    onBlur: () => void, // Обработчик потерей полем фокуса
    error: null | string, // Текст ошибки
}


/** Текстовый компонент */
function TextInput(props: TextInputPropType) {

    const {
        type = 'text', // Тип поля. Варианты: text, email
        name,          // Аттрибут name текстового поля
        value,          // Аттрибут value текстового поля
        autocomplete = '', // Значение автозаполнения поля
        size = 'small', // Размер поля. Варианты: small (маленькое), middle (среднего размера)
        placeholder,    // Текстозаполнитель
        autoFocus = false, // Нужно ли ставить фокус при загрузке
        onChange, // Обработчик изменения поля
        onBlur, // Обработчик потерей полем фокуса
    } = props

    // id для связи подписи и поля ввода
    const [id] = useState(getRandomId())


    // Классы
    const CN = 'text-input'
    const classes = [CN]

    // Размер поля ввода.
    if (size === 'small') classes.push(`${CN}--small-size`)
    if (size === 'middle') classes.push(`${CN}--middle-size`)

    // Аттрибуты поля
    const inputAttribs: {[key: string]: any} = {
        type: type,
        name: name,
        value: value,
        className: makeCN(classes),
        onChange: onChange,
        onBlur: onBlur,
    }

    if (autocomplete) inputAttribs.autoComplete = autocomplete
    if (placeholder) inputAttribs.placeholder = placeholder
    if (autoFocus) inputAttribs.autoFocus = autoFocus


    return (
        <div>
            <Label {...props}  id={id} />
            <input {...inputAttribs} id={id} />
            <Error {...props} />
        </div>
    )
}


interface LabelInt extends TextInputPropType {
    id: string
}

/** Подпись текстового компонента */
function Label(props: LabelInt) {
    const {
        label, // Подпись текстового поля
        id
    } = props

    const CN = 'text-input-label'

    if (!label) return null
    return <label className={CN} htmlFor={id}>{label}</label>
}


/** Сообщение об ошибке текстового компонента */
function Error(props: TextInputPropType) {
    const {
        error // Текст ошибки
    } = props
    
    if (!error) return null
    return (
        <Wrapper t={5}>
            <Notice type='error'>{error}</Notice>
        </Wrapper>
    )
}


export default TextInput