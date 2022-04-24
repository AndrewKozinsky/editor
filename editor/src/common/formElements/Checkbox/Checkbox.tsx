import React, { ReactElement, useState } from 'react'
import {
    fieldOnChangeHandler,
    OuterOnChangeHandlerType
} from '../outerOnChangeFn'
import { MiscTypes } from 'types/miscTypes'
import {getRandomId} from 'utils/stringUtils'
import './Checkbox.scss'


export type CheckboxPropType = {
    label: string | ReactElement // Подпись флага
    grayText?: string
    name: string // Имя группы флагов
    value: string // Значение флага
    checked?: boolean // Отмечено ли поле
    disabled?: boolean // Заблокировано ли поле
    onChange: OuterOnChangeHandlerType.FieldsHandler // Обработчик выбора пункта
    onBlur?: (e: React.BaseSyntheticEvent) => void, // Обработчик потерей полем фокуса
}

/* Checkbox component */
export default function Checkbox(props: CheckboxPropType) {

    const {
        label, // Подпись выпадающего списка
        grayText,
        name, // Имя группы флагов
        value, // Значение флага
        disabled = false, // Заблокировано ли поле
        checked, // Отмечено ли поле
        onChange, // Обработчик выбора пункта
        onBlur, // Обработчик потерей полем фокуса
    } = props

    // id для связи подписи и флага
    const [id] = useState(getRandomId())

    // Атрибуты флага
    const inputAttribs: MiscTypes.ObjStringKey<any> = {
        type: 'checkbox',
        name,
        value,
        id,
        checked,
        className: 'checkbox-input',
        onChange: (e: React.BaseSyntheticEvent) => fieldOnChangeHandler(e, onChange)
    }
    if (onBlur) inputAttribs.onBlur = onBlur
    if (disabled) inputAttribs.disabled = true

    // Атрибуты label
    const labelWrapperAttribs: MiscTypes.ObjStringKey<any> = {
        htmlFor: id,
        className: 'checkbox-label-wrapper',
    }

    return (
        <div>
            <input {...inputAttribs} />
            <label {...labelWrapperAttribs}>
                <span className='checkbox-label'>{label}</span>
                {grayText && <p className='checkbox__gray-text'>{grayText}</p>}
            </label>
        </div>
    )
}
