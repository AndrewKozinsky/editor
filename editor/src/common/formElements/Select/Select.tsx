import React, {useState} from 'react'
import {getArrowIcon, getClasses, getOptions, getWrapperClasses} from './Select-func'
import { OptionsType } from './SelectTypes'
import { MiscTypes } from 'types/miscTypes'
import { getRandomId } from 'utils/StringUtils'
import Label from '../Label/Label'
import {useGetComponentSize} from 'utils/MiscUtils'
import StoreSettingsTypes from 'store/settings/settingsTypes'
import './Select.scss'


export type SelectPropType = {
    label?: string // Подпись выпадающего списка
    name: string // Имя выпадающего списка
    value?: string | string[] // Выбранное значение выпадающего списка
    options: OptionsType // Массив для генерации тегов <option>
    relativeSize?: StoreSettingsTypes.EditorSizeMultiply, // Размер поля
    onChange?: (e: React.BaseSyntheticEvent) => void, // Обработчик выбора пункта
    onBlur?: (e: React.BaseSyntheticEvent) => void, // Обработчик потерей полем фокуса
    disabled?: boolean // Заблокировано ли поле
}

/* Компонент выпадающего списка */
function Select(props: SelectPropType) {

    const {
        label, // Подпись выпадающего списка
        name, // Имя выпадающего списка
        value, // Выбранное значение выпадающего списка
        relativeSize,
        options, // Массив для генерации тегов <option>
        disabled = false, // Заблокировано ли поле
        onChange, // Обработчик выбора пункта
        onBlur, // Обработчик потерей полем фокуса
    } = props

    // Размер компонента относительно размера всего интерфейса
    const size = useGetComponentSize(relativeSize)

    // Находится ли выпадающий список под фокусом
    const [isFocus, setIsFocus] = useState(false)

    // id для связи подписи и поля ввода
    const [id] = useState(getRandomId())

    // Атрибуты поля
    const inputAttribs: MiscTypes.ObjStringKeyAnyVal = {
        name,
        className: getClasses(size),
        onFocus: () => setIsFocus(true),
        onBlur: (e: React.BaseSyntheticEvent) => {
            // Поставить статус сфокусированности в Состояние
            setIsFocus(false)
            // Если передали обработчик потерей фокуса, то запустить
            if (onBlur) onBlur(e)
        },
        onChange//: (e: any) => console.log(e.target.value),
    }

    if (value) inputAttribs.value = value
    // Если есть подпись, то добавить id чтобы связать подпись и выпадающий список
    if (label) inputAttribs.id = id
    if (disabled) inputAttribs.disabled = true


    return (
        <>
            <Label label={label}  id={id} />
            <div className={getWrapperClasses(size, isFocus)}>
                <select {...inputAttribs}>
                    {getOptions(options)}
                </select>
                <div className='select-input-wrapper__tip'>{getArrowIcon(size)}</div>
            </div>
        </>
    )
}


export default Select