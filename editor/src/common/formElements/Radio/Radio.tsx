import React, { useState } from 'react'
import { ObjStringKeyAnyValType } from 'types/miscTypes'
import { getRandomId } from 'utils/StringUtils'
import StoreSettingsTypes from 'store/settings/settingsTypes'
import { getLabelClasses } from './Radio-func'
import {useGetComponentSize} from 'utils/MiscUtils'
import './Radio.scss'


export type RadioPropType = {
    label: string // Подпись флага
    name: string // Имя группы флагов
    value: string | number // Значение флага
    checked?: boolean // Отмечено ли поле
    relativeSize?: StoreSettingsTypes.EditorSizeMultiply, // Размер поля
    disabled?: boolean // Заблокировано ли поле
    onChange?: (e: React.BaseSyntheticEvent) => void // Обработчик выбора пункта
    onBlur?: (e: React.BaseSyntheticEvent) => void, // Обработчик потерей полем фокуса
}

/* Компонент выпадающего списка */
function Radio(props: RadioPropType) {

    const {
        label, // Подпись выпадающего списка
        name, // Имя группы флагов
        value, // Значение флага
        checked, // Отмечено ли поле
        relativeSize,
        disabled = false, // Заблокировано ли поле
        onChange, // Обработчик выбора пункта
        onBlur, // Обработчик потерей полем фокуса
    } = props

    // Размер компонента относительно размера всего интерфейса
    const size = useGetComponentSize(relativeSize)

    // id для связи подписи и флага
    const [id] = useState(getRandomId())

    // Атрибуты переключателя
    const inputAttribs: ObjStringKeyAnyValType = {
        type: 'radio',
        name,
        value,
        id,
        checked,
        className: 'radio-input',
        onChange,
    }
    if (onBlur) inputAttribs.onBlur = onBlur
    if (disabled) inputAttribs.disabled = true

    // Атрибуты label
    const labelAttribs: ObjStringKeyAnyValType = {
        htmlFor: id,
        className: getLabelClasses(size),
    }

    return (
        <>
            <input {...inputAttribs} />
            <label {...labelAttribs}>{label}</label>
        </>
    )
}


export default Radio