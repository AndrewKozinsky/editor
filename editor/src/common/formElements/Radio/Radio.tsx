import React, { useState } from 'react'
import { ObjStringKeyAnyValType } from 'types/miscTypes'
import {getRandomId} from 'utils/StringUtils'
import { EditorSizeType } from 'store/settings/settingsTypes'
import { getLabelClasses } from './Radio-func'
import {useGetComponentSize} from 'utils/MiscUtils'
import './Radio.scss'


export type RadioPropType = {
    label: string // Подпись флага
    name: string // Имя группы флагов
    value: string | number // Значение флага
    defaultChecked?: boolean // Отмечено ли поле по умолчанию
    size?: EditorSizeType, // Размер поля
    onChange: () => void // Обработчик выбора пункта
}

/* Компонент выпадающего списка */
function Radio(props: RadioPropType) {

    const {
        label, // Подпись выпадающего списка
        name, // Имя группы флагов
        value, // Значение флага
        defaultChecked, // Отмечено ли поле по умолчанию
        onChange // Обработчик выбора пункта
    } = props

    // Размер элемента': tiny (крошечный), small (маленький), middle (средний), big (большой)
    const size = useGetComponentSize(props.size)

    // id для связи подписи и флага
    const [id] = useState(getRandomId())

    // Атрибуты переключателя
    const inputAttribs: ObjStringKeyAnyValType = {
        type: 'radio',
        name,
        value,
        id,
        className: 'radio-input',
        onChange,
    }
    if (defaultChecked) inputAttribs.defaultChecked = true

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