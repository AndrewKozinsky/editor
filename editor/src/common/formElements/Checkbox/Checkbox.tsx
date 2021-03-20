import React, { useState } from 'react'
import { ObjStringKeyAnyVal } from 'types/miscTypes'
import {getRandomId} from 'utils/StringUtils'
import { getLabelClasses } from './js/gettingClasses'
import './Checkbox.scss'


export type CheckboxPropType = {
    label: string // Подпись флага
    name: string // Имя группы флагов
    value: string | number // Значение флага
    size?: 'small' | 'middle' | 'big', // Размер поля
    onChange: () => void // Обработчик выбора пункта
}

/* Компонент выпадающего списка */
function Checkbox(props: CheckboxPropType) {

    const {
        label, // Подпись выпадающего списка
        name, // Имя группы флагов
        value, // Значение флага
        size = 'small', // Размер поля: small (маленькое), middle (среднего размера), big
        onChange // Обработчик выбора пункта
    } = props

    // id для связи подписи и флага
    const [id] = useState(getRandomId())

    // Атрибуты флага
    const inputAttribs: ObjStringKeyAnyVal = {
        type: 'checkbox',
        name,
        value,
        id,
        className: 'checkbox-input',
        onChange,
    }

    // Атрибуты label
    const labelAttribs: ObjStringKeyAnyVal = {
        htmlFor: id,
        className: getLabelClasses(props),
    }

    return (
        <>
            <input {...inputAttribs} />
            <label {...labelAttribs}>{label}</label>
        </>
    )
}


export default Checkbox