// import React, {ReactElement, ReactNode} from 'react'
// import Radio, { RadioPropType } from '../Radio/Radio'
// import Checkbox, {CheckboxPropType} from '../Checkbox/Checkbox'
// import FHTypes from 'libs/formHandler/types'
// import Label from '../Label/Label'
// import StoreSettingsTypes from 'store/settings/settingsTypes'
// import { getFieldGroupClasses } from './FieldGroup-func'
// import './FieldGroup.scss'


/**
 * Компонент FieldGroup в зависимости от переданного объекта отрисовывает элементы поля ввода формы: текстовое поле, флаги, переключатели, выпадающий список.
 * Дополнительно разрешает противоречия в типах передаваемых данных. Везде в свойство value передаётся или строка или массив строк.
 * А сами компоненты ожидают строку. Поэтому FieldGroup переводит этот тип в строковый.
 * Если в value передаётся массив строк, то это обозначает
 */

// type InputDataType = { label: string | ReactElement, value: string }

/*export type FieldGroupPropType = {
    label?: string
    inputType: 'radio' | 'checkbox'
    groupName: string
    inputsArr: InputDataType[]
    value: FHTypes.FieldValue
    gap?: 20 // Отступы между элементами внутри обёртки
    disabled?: boolean // Заблокировано ли поле
    onChange: (e: React.BaseSyntheticEvent) => void
    onBlur?: (e: React.BaseSyntheticEvent) => void, // Обработчик потерей полем фокуса
}*/

/*export default function FieldGroup(props: FieldGroupPropType) {
    const {
        label,
        inputType,
        groupName,
        inputsArr,
        value,
        gap,
        disabled = false, // Заблокировано ли поле
        onChange,
        onBlur
    } = props

    const $label = label ? <Label label={label} bold /> : null

    // Получение типа поля: переключатель или флаг
    let Component = (inputType == 'checkbox') ? Checkbox : Radio

    return (
        <>
            {$label}
            <InputsWrapper gap={gap}>
                {inputsArr.map((inputData, i) => {

                    const attrs = {
                        value: inputData.value,
                        label: inputData.label,
                        name: groupName,
                        checked: !!value.includes(inputData.value),
                        disabled,
                        key: i,
                        onChange,
                        onBlur
                    }

                    return <Component {...attrs} />
                })}
            </InputsWrapper>
        </>
    )
}*/


/*export type InputsWrapperType = {
    size?: StoreSettingsTypes.EditorSizeMultiply // Размер поля
    gap: number,
    children: ReactNode
}*/

/*
function InputsWrapper(props: InputsWrapperType) {
    const {
        gap,
        children
    } = props

    // Классы обёртки
    const cls = getFieldGroupClasses(size, gap)

    return (
        <div className={cls}>{children}</div>
    )
}*/
