import React, {useState} from 'react'
import {getArrowIcon, getClasses, getOptions, getWrapperClasses} from './functions'
import { OptionsType } from './SelectTypes'
import { ObjStringKeyAnyVal } from 'types/miscTypes'
import {getRandomId} from 'utils/StringUtils';
import './Select.scss'
import Label from '../Label/Label';



export type SelectPropType = {
    label?: string // Подпись выпадающего списка
    name: string // Имя выпадающего списка
    value?: string // Выбранное значение выпадающего списка
    options: OptionsType // Массив для генерации тегов <option>
    size?: 'small' | 'middle' | 'big', // Размер поля
    onChange: () => void, // Обработчик выбора пункта
}

/* Компонент выпадающего списка */
function Select(props: SelectPropType) {

    const {
        label, // Подпись выпадающего списка
        name, // Имя выпадающего списка
        value, // Выбранное значение выпадающего списка
        options, // Массив для генерации тегов <option>
        size = 'small', // Размер поля: small (маленькое), middle (среднего размера), big
        onChange // Обработчик выбора пункта
    } = props

    // Находится ли выпадающий список под фокусом
    const [isFocus, setIsFocus] = useState(false)

    // id для связи подписи и поля ввода
    const [id] = useState(getRandomId())

    // Атрибуты поля
    const inputAttribs: ObjStringKeyAnyVal = {
        name,
        className: getClasses(props),
        onFocus: () => setIsFocus(true),
        onBlur: () => setIsFocus(false),
        onChange,
    }

    if (value) inputAttribs.label = value
    // Если есть подпись, то добавить id чтобы связать подпись и выпадающий список
    if (label) inputAttribs.id = id


    return (
        <>
            <Label label={label}  id={id} />
            <div className={getWrapperClasses(props, isFocus)}>
                <select {...inputAttribs} >
                    {getOptions(props)}
                </select>
                <div className='select-input-wrapper__tip'>{getArrowIcon(props)}</div>
            </div>
        </>
    )
}


export default Select