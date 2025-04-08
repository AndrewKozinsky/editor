import React, { ReactElement, useState } from 'react'
import { MiscTypes } from 'types/miscTypes'
import { getRandomId } from 'utils/stringUtils'
import { fieldOnChangeHandler, OuterOnChangeHandlerType } from '../outerOnChangeFn'
import './Radio.scss'


export type RadioPropType = {
    label: string | ReactElement // Подпись флага
    grayText?: string
    name: string // Имя группы флагов
    value: string // Значение флага
    checked?: boolean // Отмечено ли поле
    disabled?: boolean // Заблокировано ли поле
    onChange: OuterOnChangeHandlerType.FieldsHandler // Обработчик выбора пункта
    onBlur?: (e: React.BaseSyntheticEvent) => void, // Обработчик потерей полем фокуса
}

/* Компонент выпадающего списка */
export default function Radio(props: RadioPropType) {

    const {
        label, // Подпись выпадающего списка
        grayText,
        name, // Имя группы флагов
        value, // Значение флага
        checked, // Отмечено ли поле
        disabled = false, // Заблокировано ли поле
        onChange, // Обработчик выбора пункта
        onBlur, // Обработчик потерей полем фокуса
    } = props

    // id для связи подписи и флага
    const [id] = useState(getRandomId())

    // Атрибуты переключателя
    const inputAttribs: MiscTypes.ObjStringKey<any> = {
        type: 'radio',
        name,
        value,
        id,
        checked,
        className: 'radio-input',
        onChange: (e: React.BaseSyntheticEvent) => fieldOnChangeHandler(e, onChange)
    }
    if (onBlur) inputAttribs.onBlur = onBlur
    if (disabled) inputAttribs.disabled = true

    // Атрибуты label
    const labelWrapperAttribs: MiscTypes.ObjStringKey<any> = {
        htmlFor: id,
        className: 'radio-label-wrapper',
    }

    return (
        <div>
            <input {...inputAttribs} />
            <label {...labelWrapperAttribs}>
                <span className='radio-label'>{label}</span>
                {grayText && <p className='radio__gray-text'>{grayText}</p>}
            </label>

        </div>
    )
}
