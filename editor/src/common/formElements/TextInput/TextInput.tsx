import React, { useRef, useState } from 'react'
import { fieldOnChangeHandler, OuterOnChangeHandlerType } from '../outerOnChangeFn'
import InputError from 'common/formElements/InputError/InputError'
import Wrapper from 'common/Wrapper/Wrapper'
import { MiscTypes } from 'types/miscTypes'
import Label from '../Label/Label'
import { useSetFocus } from './TextInput-func'
import makeClasses from './TextInput-classes'
import { getRandomId } from 'utils/stringUtils'


export type TextInputPropType = {
    label?: string // Подпись текстового поля
    grayText?: string // Серый текст
    inputType?: 'text' | 'textarea' // Тип поля ввода
    type?: 'text' | 'email' | 'password' // Тип поля
    name: string, // Аттрибут name текстового поля
    value: string, // Аттрибут value текстового поля
    autocomplete?: 'email' | 'username' | 'current-password' | 'new-password', // Значение автозаполнения поля
    // Доступные значения для autocomplete: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute
    maxWidth?: 250 // Максимальная ширина поля
    rows?: number // Количество рядов у текстового поля
    placeholder?: string, // Текстозаполнитель
    onChange: OuterOnChangeHandlerType.FieldsHandler, // Обработчик изменения поля
    onBlur?: (e: React.BaseSyntheticEvent) => void, // Обработчик потерей полем фокуса
    onKeyDown?: (e: React.BaseSyntheticEvent) => void, // Обработчик нажатия клавиши
    error?: string, // Текст ошибки
    disabled?: boolean // Заблокировано ли поле
    autoFocus?: boolean | number, // Нужно ли ставить фокус при загрузке. Если передаётся число, то фокусировка будет поставлена через указанное количество миллисекунд
}


/** Текстовый компонент */
export default function TextInput(props: TextInputPropType) {
    const {
        label, // Подпись текстового поля
        grayText,
        inputType = 'text', // Тип поля ввода
        type = 'text', // Тип поля. Варианты: text, email
        name,          // Аттрибут name текстового поля
        value,
        autocomplete = '', // Значение автозаполнения поля
        placeholder,    // Текстозаполнитель
        maxWidth, // Максимальная ширина поля
        rows = 5, // Количество рядов у текстового поля
        onChange, // Обработчик изменения поля
        onBlur, // Обработчик потерей полем фокуса
        onKeyDown, // Обработчик нажатия клавиши
        error,
        disabled = false, // Заблокировано ли поле
        autoFocus = false, // Нужно ли ставить фокус при загрузке
    } = props

    // Ссылка на элемент чтобы при необходимости поставить фокусировку
    const inputRef = useRef(null)

    // Установка фокусировки при необходомости
    useSetFocus(inputRef, autoFocus)

    // id для связи подписи и поля ввода
    const [id] = useState(getRandomId())

    const CN = makeClasses(maxWidth)

    // Аттрибуты поля
    const inputAttribs: MiscTypes.ObjStringKey<any> = {
        type,
        name,
        value,
        className: CN.root,
        onChange: (e: React.BaseSyntheticEvent) => fieldOnChangeHandler(e, onChange),
    }

    if (autocomplete) inputAttribs.autoComplete = autocomplete
    if (placeholder) inputAttribs.placeholder = placeholder
    if (onBlur) inputAttribs.onBlur = onBlur
    if (onKeyDown) inputAttribs.onKeyDown = onKeyDown

    return (
        <div>
            <Label label={label} disabled={disabled} id={id} grayText={grayText} />
            {inputType === 'text' &&
                <input {...inputAttribs} disabled={disabled} id={id} ref={inputRef} />
            }
            {inputType === 'textarea' &&
                <textarea {...inputAttribs} disabled={disabled} id={id} ref={inputRef} rows={rows} />
            }
            <Error error={error} />
        </div>
    )
}


/** Сообщение об ошибке текстового компонента */
function Error(props: { error: string }) {
    // Текст ошибки
    const { error } = props
    
    if (!error) return null

    return (
        <Wrapper t={5}>
            <InputError text={error} />
        </Wrapper>
    )
}
