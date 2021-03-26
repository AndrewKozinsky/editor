import React, {useState} from 'react'
import {getRandomId } from 'utils/StringUtils'
import Notice from 'common/Notice/Notice'
import Wrapper from 'common/Wrapper/Wrapper'
import { ObjStringKeyAnyValType } from 'types/miscTypes'
import Label from '../Label/Label';
import { EditorSizeType } from 'store/settings/settingsTypes'
import {useGetComponentSize} from 'utils/MiscUtils'
import { getTextInputClasses } from './TextInput-func'
import './TextInput.scss'


export type TextInputPropType = {
    label?: string // Подпись текстового поля
    type?: 'text' | 'email' | 'password' // Подпись текстового поля
    name: string, // Аттрибут name текстового поля
    value: string, // Значение поля ввода
    defaultValue?: string, // Значение поля ввода по умолчанию
    autocomplete?: '' | 'username' | 'current-password', // Значение автозаполнения поля
    // Доступные значения для autocomplete: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute
    size?: EditorSizeType // Размер поля
    placeholder?: string, // Текстозаполнитель
    autoFocus?: boolean, // Нужно ли ставить фокус при загрузке
    onChange: () => void, // Обработчик изменения поля
    onBlur?: () => void, // Обработчик потерей полем фокуса
    error?: string, // Текст ошибки
}


/** Текстовый компонент */
function TextInput(props: TextInputPropType) {

    const {
        label, // Подпись текстового поля
        type = 'text', // Тип поля. Варианты: text, email
        name,          // Аттрибут name текстового поля
        value,
        defaultValue, // Значение поля ввода по умолчанию
        autocomplete = '', // Значение автозаполнения поля
        placeholder,    // Текстозаполнитель
        autoFocus = false, // Нужно ли ставить фокус при загрузке
        onChange, // Обработчик изменения поля
        onBlur, // Обработчик потерей полем фокуса
    } = props

    // Размер элемента': tiny (крошечный), small (маленький), middle (средний), big (большой)
    const size = useGetComponentSize(props.size)

    // id для связи подписи и поля ввода
    const [id] = useState(getRandomId())

    // Аттрибуты поля
    const inputAttribs: ObjStringKeyAnyValType = {
        type: type,
        name,
        value,
        className: getTextInputClasses(size),
        onChange: onChange,
        onBlur: onBlur,
    }

    if (defaultValue) inputAttribs.defaultValue = defaultValue
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