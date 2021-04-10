import React, {ReactNode} from 'react'
import Radio, { RadioPropType } from '../Radio/Radio'
import Select, { SelectPropType } from '../Select/Select'
import TextInput, { TextInputPropType } from '../TextInput/TextInput'
import Checkbox, {CheckboxPropType} from '../Checkbox/Checkbox'
import FHTypes from 'libs/formHandler/types'
import Label from '../Label/Label'
import {getTextInputClasses} from '../TextInput/TextInput-func';
import {useGetComponentSize} from '../../../utils/MiscUtils';
import {EditorSizeType} from '../../../store/settings/settingsTypes'
import { getFieldGroupClasses } from './FieldGroup-func'
import './FieldGroup.scss'

/**
 * Компонент FieldGroup в зависимости от переданного объекта отрисовывает элементы поля ввода формы: текстовое поле, флаги, переключатели, выпадающий список.
 * Дополнительно разрешает противоречия в типах передаваемых данных. Везде в свойство value передаётся или строка или массив строк.
 * А сами компоненты ожидают строку. Поэтому FieldGroup переводит этот тип в строковый.
 * Если в value передаётся массив строк, то это обозначает
 */

type InputDataType = { label: string, value: string }

export type FieldGroupPropType = {
    label?: string
    inputType: 'radio' | 'checkbox'
    groupName: string
    inputsArr: InputDataType[]
    value: FHTypes.FieldValue
    onChange: (e: React.BaseSyntheticEvent) => void
    onBlur?: (e: React.BaseSyntheticEvent) => void, // Обработчик потерей полем фокуса
}

function FieldGroup(props: FieldGroupPropType) {

    const {
        label,
        inputType,
        groupName,
        inputsArr,
        value,
        onChange,
        onBlur
    } = props

    const $label = label ? <Label label={label} /> : null

    // Получение типа поля: переключатель или флаг
    let Component = Radio
    if (inputType == 'checkbox') Component = Checkbox

    return (
        <>
            {$label}
            <InputsWrapper>
                {inputsArr.map((inputData, i) => {

                    const attrs = {
                        value: inputData.value,
                        label: inputData.label,
                        name: groupName,
                        checked: !!(value.find(val => val === inputData.value)),
                        key: i,
                        onChange,
                        onBlur
                    }

                    return <Component {...attrs} />
                })}
            </InputsWrapper>
        </>
    )
}

export default FieldGroup



export type InputsWrapperType = {
    size?: EditorSizeType // Размер поля
    children: ReactNode
}

function InputsWrapper(props: InputsWrapperType) {
    const {
        children
    } = props


    // Размер элемента': tiny (крошечный), small (маленький), middle (средний), big (большой)
    const size = useGetComponentSize(props.size)
    // Классы обёртки
    const cls = getFieldGroupClasses(size)

    return (
        <div className={cls}>{children}</div>
    )
}