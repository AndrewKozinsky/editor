import React, { useState } from 'react'
import { ObjStringKeyAnyVal } from 'types/miscTypes'
import {getRandomId} from 'utils/StringUtils'
import { EditorSizeType } from '../../../store/settings/settingsTypes'
import { getLabelClasses } from './Radio-func'
import './Radio.scss'
import {useGetComponentSize} from '../../../utils/MiscUtils';


export type RadioPropType = {
    label: string // Подпись флага
    name: string // Имя группы флагов
    value: string | number // Значение флага
    size?: EditorSizeType, // Размер поля
    onChange: () => void // Обработчик выбора пункта
}

/* Компонент выпадающего списка */
function Radio(props: RadioPropType) {

    const {
        label, // Подпись выпадающего списка
        name, // Имя группы флагов
        value, // Значение флага
        onChange // Обработчик выбора пункта
    } = props

    // Размер элемента': tiny (крошечный), small (маленький), middle (средний), big (большой)
    const size = useGetComponentSize(props.size)

    // id для связи подписи и флага
    const [id] = useState(getRandomId())

    // Атрибуты флага
    const inputAttribs: ObjStringKeyAnyVal = {
        type: 'radio',
        name,
        value,
        id,
        className: 'radio-input',
        onChange,
    }

    // Атрибуты label
    const labelAttribs: ObjStringKeyAnyVal = {
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