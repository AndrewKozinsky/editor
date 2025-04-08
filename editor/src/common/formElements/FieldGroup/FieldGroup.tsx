import React, { ReactElement, ReactNode, useState } from 'react'
import { OuterOnChangeHandlerType } from '../outerOnChangeFn'
import Radio from '../Radio/Radio'
import Checkbox from '../Checkbox/Checkbox'
import Label from '../Label/Label'
import makeClasses from './FieldGroup-classes'
import { updateFieldValuesInState } from './FieldGroup-func'


/** Компонент FieldGroup в зависимости от переданного объекта отрисовывает флаги или переключатели. */
export type FieldGroupPropType = {
    label?: string | ReactElement
    grayText?: string // Серый текст
    inputType: FieldGroupInputType
    groupName: string
    inputsArr: FieldGroupInputDataType[]
    value: string[]
    gap?: 20 // Отступы между элементами внутри обёртки
    vertical?: boolean // Are the inputs arranged vertically?
    disabled?: boolean // Заблокировано ли поле
    onChange: OuterOnChangeHandlerType.FieldsHandler // Функция, в которую будут передаваться данные о значении группы полей после их изменения
    onBlur?: (e: React.BaseSyntheticEvent) => void, // Обработчик потерей полем фокуса
}
export type FieldGroupInputType = 'radio' | 'checkbox'
export type FieldGroupInputDataType = {
    label: string | ReactElement,
    value: string,
    grayText?: string,
}

/** Компонент группирующий флаги или переключатели */
export default function FieldGroup(props: FieldGroupPropType) {
    const {
        label,
        grayText,
        inputType,
        groupName,
        inputsArr,
        value,
        gap,
        vertical = false,
        disabled = false, // Заблокировано ли поле
        onChange,
        onBlur
    } = props

    // В Состоянии находится объект с данными об отмеченных значениях переключателей или флагов
    const [fieldsValues, setFieldsValues] = useState<OuterOnChangeHandlerType.FieldsData>(
        // Чтобы сразу получить данные об изначальных значениях полей передаётся функция
        function () {
            // Изначальные значения полей
            const fieldValues: OuterOnChangeHandlerType.FieldValues = []

            // Наполнить массив проставленными значениями
            inputsArr.forEach((inputData) => {
                if (!!value.includes(inputData.value)) {
                    fieldValues.push(inputData.value)
                }
            })

            // Возврат объекта Состояния
            return {fieldName: groupName, fieldValue: fieldValues}
        }
    )


    const $label = label
        ? <Label label={label} bold grayText={grayText} />
        : null

    // Получение типа поля: переключатель или флаг
    let Component = (inputType == 'checkbox') ? Checkbox : Radio

    return (
        <>
            {$label}
            <InputsWrapper gap={gap} vertical={vertical}>
                {inputsArr.map((inputData, i) => {

                    const attrs = {
                        value: inputData.value,
                        label: inputData.label,
                        grayText: inputData.grayText,
                        name: groupName,
                        checked: !!value.includes(inputData.value),
                        disabled,
                        onChange: updateFieldValuesInState(fieldsValues, setFieldsValues, inputType, onChange),
                        onBlur
                    }

                    return <Component {...attrs} key={i} />
                })}
            </InputsWrapper>
        </>
    )
}


export type InputsWrapperType = {
    gap: number,
    vertical: boolean
    children: ReactNode
}

/** Обёртка пунктов */
function InputsWrapper(props: InputsWrapperType) {
    const {
        gap,
        vertical,
        children
    } = props

    const CN = makeClasses(vertical, gap)

    return <div className={CN.wrapper}>{children}</div>
}
