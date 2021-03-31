import React, {ReactNode} from 'react'
import Radio, { RadioPropType } from '../Radio/Radio'
import Select, { SelectPropType } from '../Select/Select'
import TextInput, { TextInputPropType } from '../TextInput/TextInput'
import Checkbox, {CheckboxPropType} from '../Checkbox/Checkbox'
import { ValueType } from 'libs/formHandler/types'
import Label from '../Label/Label'
import {getTextInputClasses} from '../TextInput/TextInput-func';
import {useGetComponentSize} from '../../../utils/MiscUtils';
import {EditorSizeType} from '../../../store/settings/settingsTypes'
import { getFieldGroupClasses } from './FieldGroup-func'
import './FieldGroup.scss'
import {ObjStringKeyAnyValType} from '../../../types/miscTypes';
import inputChangeHandler from '../../../libs/formHandler/functions/inputChangeHandler'

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
    value: ValueType
    onChange: typeof inputChangeHandler
}

function FieldGroup(props: FieldGroupPropType) {

    const {
        label,
        inputType,
        groupName,
        inputsArr,
        value,
        onChange
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
                    const isChecked = !!(value.find(val => val === inputData.value))

                    return (
                        <Component
                            value={inputData.value}
                            label={inputData.label}
                            name={groupName}
                            checked={isChecked}
                            key={i}
                            onChange={onChange}
                        />
                    )
                })}
            </InputsWrapper>
        </>
    )

    /*if (inputType === 'radio') {
        return (
            <>
                {$label}
                <InputsWrapper>
                    {inputsArr.map((inputData, i) => {
                        return (
                            <Radio
                                value={inputData.value}
                                label={inputData.label}
                                name={groupName}
                                key={i}
                                onChange={onChange}
                            />
                        )
                    })}
                </InputsWrapper>
            </>
        )
    }*/
    /*else if (inputType === 'checkbox') {
        return (
            <>
                {$label}
                <InputsWrapper>
                    {inputsArr.map((inputData, i) => {
                        return (
                            <Checkbox
                                value={inputData.value}
                                label={inputData.label}
                                name={groupName}
                                key={i}
                                onChange={onChange}
                            />
                        )
                    })}
                </InputsWrapper>
            </>
        )
    }*/
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