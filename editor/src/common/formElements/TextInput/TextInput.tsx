import React, {useState} from 'react'
import {getRandomId } from 'utils/StringUtils'
import Notice from 'common/Notice/Notice'
import Wrapper from 'common/Wrapper/Wrapper'
import './TextInput.scss'
import { getClasses } from './functions'
import { ObjStringKeyAnyVal } from 'types/miscTypes'
import Label from '../Label/Label';


export type TextInputPropType = {
    label?: string // Подпись текстового поля
    type?: 'text' | 'email' | 'password' // Подпись текстового поля
    name: string, // Аттрибут name текстового поля
    value: string, // Аттрибут name текстового поля
    autocomplete?: '' | 'username' | 'current-password', // Значение автозаполнения поля
    // Доступные значения для autocomplete: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute
    size?: 'small' | 'middle' | 'big' // Размер поля
    placeholder?: string, // Текстозаполнитель
    autoFocus?: boolean, // Нужно ли ставить фокус при загрузке
    onChange: () => void, // Обработчик изменения поля
    onBlur: () => void, // Обработчик потерей полем фокуса
    error: null | string, // Текст ошибки
}


/** Текстовый компонент */
function TextInput(props: TextInputPropType) {

    const {
        label, // Подпись текстового поля
        type = 'text', // Тип поля. Варианты: text, email
        name,          // Аттрибут name текстового поля
        value,          // Аттрибут value текстового поля
        autocomplete = '', // Значение автозаполнения поля
        size = 'small', // Размер поля: small (маленькое), middle (среднего размера)
        placeholder,    // Текстозаполнитель
        autoFocus = false, // Нужно ли ставить фокус при загрузке
        onChange, // Обработчик изменения поля
        onBlur, // Обработчик потерей полем фокуса
    } = props

    // id для связи подписи и поля ввода
    const [id] = useState(getRandomId())

    // Аттрибуты поля
    const inputAttribs: ObjStringKeyAnyVal = {
        type: type,
        name: name,
        value: value,
        className: getClasses(props),
        onChange: onChange,
        onBlur: onBlur,
    }

    if (autocomplete) inputAttribs.autoComplete = autocomplete
    if (placeholder) inputAttribs.placeholder = placeholder
    if (autoFocus) inputAttribs.autoFocus = autoFocus


    return (
        <div>
            <Label label={label}  id={id} />
            <input {...inputAttribs} id={id} />
            <Error {...props} />
        </div>
    )
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