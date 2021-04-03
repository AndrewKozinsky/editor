import React, {useState} from 'react'
import {getArrowIcon, getClasses, getOptions, getWrapperClasses} from './Select-func'
import { OptionsType } from './SelectTypes'
import { ObjStringKeyAnyValType } from 'types/miscTypes'
import { getRandomId } from 'utils/StringUtils'
import Label from '../Label/Label'
import {useGetComponentSize} from 'utils/MiscUtils'
import {EditorSizeType} from 'store/settings/settingsTypes'
import './Select.scss'
import inputChangeHandler from '../../../libs/formHandler/functions/inputChangeHandler';



export type SelectPropType = {
    label?: string // Подпись выпадающего списка
    name: string // Имя выпадающего списка
    value?: string | string[] // Выбранное значение выпадающего списка
    options: OptionsType // Массив для генерации тегов <option>
    size?: EditorSizeType, // Размер поля
    onChange: typeof inputChangeHandler, // Обработчик выбора пункта
    onBlur?: (e: React.BaseSyntheticEvent) => void, // Обработчик потерей полем фокуса
}

/* Компонент выпадающего списка */
function Select(props: SelectPropType) {

    const {
        label, // Подпись выпадающего списка
        name, // Имя выпадающего списка
        value, // Выбранное значение выпадающего списка
        options, // Массив для генерации тегов <option>
        onChange, // Обработчик выбора пункта
        onBlur, // Обработчик потерей полем фокуса
    } = props

    // Размер элемента': tiny (крошечный), small (маленький), middle (средний), big (большой)
    const size = useGetComponentSize(props.size)

    // Находится ли выпадающий список под фокусом
    const [isFocus, setIsFocus] = useState(false)

    // id для связи подписи и поля ввода
    const [id] = useState(getRandomId())

    // Атрибуты поля
    const inputAttribs: ObjStringKeyAnyValType = {
        name,
        className: getClasses(size),
        onFocus: () => setIsFocus(true),
        onBlur: (e: React.BaseSyntheticEvent) => {
            // Поставить статус сфокусированности в Состояние
            setIsFocus(false)
            // Если передали обработчик потерей фокуса, то запустить
            if (onBlur) onBlur(e)
        },
        onChange,
    }

    if (value) inputAttribs.value = value
    // Если есть подпись, то добавить id чтобы связать подпись и выпадающий список
    if (label) inputAttribs.id = id


    return (
        <>
            <Label label={label}  id={id} />
            <div className={getWrapperClasses(size, isFocus)}>
                <select {...inputAttribs}>
                    {getOptions(props)}
                </select>
                <div className='select-input-wrapper__tip'>{getArrowIcon(size)}</div>
            </div>
        </>
    )
}


export default Select