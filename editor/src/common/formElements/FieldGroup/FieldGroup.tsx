import React, {ReactElement, ReactNode} from 'react'
import Radio from '../Radio/Radio'
import Checkbox from '../Checkbox/Checkbox'
import Label from '../Label/Label'
import makeClasses from './FieldGroup-classes'


/** Компонент FieldGroup в зависимости от переданного объекта отрисовывает флаги или переключатели. */
export type FieldGroupPropType = {
    label?: string | ReactElement
    inputType: 'radio' | 'checkbox'
    groupName: string
    inputsArr: InputDataType[]
    value: string[]
    gap?: 20 // Отступы между элементами внутри обёртки
    vertical?: boolean // Are the inputs arranged vertically?
    disabled?: boolean // Заблокировано ли поле
    onChange: (e: React.BaseSyntheticEvent) => void
    onBlur?: (e: React.BaseSyntheticEvent) => void, // Обработчик потерей полем фокуса
}

type InputDataType = { label: string | ReactElement, value: string }

// TODO Что делает эта функция?
export default function FieldGroup(props: FieldGroupPropType) {
    const {
        label,
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

    const $label = label ? <Label label={label} bold /> : null

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
                        name: groupName,
                        checked: !!value.includes(inputData.value),
                        disabled,
                        onChange,
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

// TODO Что делает эта функция?
function InputsWrapper(props: InputsWrapperType) {
    const {
        gap,
        vertical,
        children
    } = props

    const CN = makeClasses(vertical, gap)

    return <div className={CN.wrapper}>{children}</div>
}
