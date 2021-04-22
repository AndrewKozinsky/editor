import React, {useEffect, useRef, useState} from 'react'
import {getRandomId } from 'utils/StringUtils'
import Notice from 'common/Notice/Notice'
import Wrapper from 'common/Wrapper/Wrapper'
import { ObjStringKeyAnyValType } from 'types/miscTypes'
import Label from '../Label/Label';
import StoreSettingsTypes from 'store/settings/settingsTypes'
import {useGetComponentSize} from 'utils/MiscUtils'
import {getTextInputClasses, useSetFocus} from './TextInput-func'
import './TextInput.scss'


export type TextInputPropType = {
    label?: string // Подпись текстового поля
    type?: 'text' | 'email' | 'password' // Подпись текстового поля
    name: string, // Аттрибут name текстового поля
    value: string, // Аттрибут name текстового поля
    autocomplete?: 'email' | 'username' | 'current-password' | 'new-password', // Значение автозаполнения поля
    // Доступные значения для autocomplete: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute
    relativeSize?: StoreSettingsTypes.EditorSizeMultiply // Размер поля
    placeholder?: string, // Текстозаполнитель
    autoFocus?: boolean | number, // Нужно ли ставить фокус при загрузке. Если передаётся число, то фокусировка будет поставлена через указанное количество миллисекунд
    onChange?: (e: React.BaseSyntheticEvent) => void, // Обработчик изменения поля
    onBlur?: (e: React.BaseSyntheticEvent) => void, // Обработчик потерей полем фокуса
    onKeyDown?: (e: React.BaseSyntheticEvent) => void, // Обработчик нажатия клавиши
    error?: string, // Текст ошибки
    disabled?: boolean // Заблокировано ли поле
}


/** Текстовый компонент */
function TextInput(props: TextInputPropType) {

    const {
        label, // Подпись текстового поля
        type = 'text', // Тип поля. Варианты: text, email
        name,          // Аттрибут name текстового поля
        value,
        autocomplete = '', // Значение автозаполнения поля
        placeholder,    // Текстозаполнитель
        relativeSize,
        disabled = false, // Заблокировано ли поле
        autoFocus = false, // Нужно ли ставить фокус при загрузке
        onChange, // Обработчик изменения поля
        onBlur, // Обработчик потерей полем фокуса
        onKeyDown, // Обработчик нажатия клавиши
    } = props

    // Ссылка на элемент
    const inputRef = useRef(null)

    // Установка фокусировки при необходомости
    useSetFocus(inputRef, autoFocus)

    // Размер компонента относительно размера всего интерфейса
    const size = useGetComponentSize(relativeSize)

    // id для связи подписи и поля ввода
    const [id] = useState(getRandomId())

    // Аттрибуты поля
    const inputAttribs: ObjStringKeyAnyValType = {
        type: type,
        name,
        value,
        className: getTextInputClasses(size),
        onChange: onChange,
    }

    if (autocomplete) inputAttribs.autoComplete = autocomplete
    if (placeholder) inputAttribs.placeholder = placeholder
    if (onBlur) inputAttribs.onBlur = onBlur
    if (onKeyDown) inputAttribs.onKeyDown = onKeyDown


    return (
        <div>
            <Label label={label} disabled={disabled} id={id} />
            <input {...inputAttribs} disabled={disabled} id={id} ref={inputRef} />
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