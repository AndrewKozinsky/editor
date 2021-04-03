import React, { useState } from 'react'
import { ObjStringKeyAnyValType } from 'types/miscTypes'
import {getRandomId} from 'utils/StringUtils'
import { getLabelClasses } from './Checkbox-func'
import './Checkbox.scss'
import { EditorSizeType } from 'store/settings/settingsTypes'
import {useGetComponentSize} from 'utils/MiscUtils'


export type CheckboxPropType = {
    label: string // Подпись флага
    name: string // Имя группы флагов
    value: string | number // Значение флага
    checked?: boolean // Отмечено ли поле
    size?: EditorSizeType, // Размер поля
    onChange?: (e: React.BaseSyntheticEvent) => void // Обработчик выбора пункта
    onBlur?: (e: React.BaseSyntheticEvent) => void, // Обработчик потерей полем фокуса
}

/* Компонент выпадающего списка */
function Checkbox(props: CheckboxPropType) {

    const {
        label, // Подпись выпадающего списка
        name, // Имя группы флагов
        value, // Значение флага
        checked, // Отмечено ли поле
        onChange, // Обработчик выбора пункта
        onBlur, // Обработчик потерей полем фокуса
    } = props

    // Размер элемента': tiny (крошечный), small (маленький), middle (средний), big (большой)
    const size = useGetComponentSize(props.size)

    // id для связи подписи и флага
    const [id] = useState(getRandomId())

    // Атрибуты флага
    const inputAttribs: ObjStringKeyAnyValType = {
        type: 'checkbox',
        name,
        value,
        id,
        checked,
        className: 'checkbox-input',
        onChange,
    }
    if (onBlur) inputAttribs.onBlur = onBlur

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


export default Checkbox