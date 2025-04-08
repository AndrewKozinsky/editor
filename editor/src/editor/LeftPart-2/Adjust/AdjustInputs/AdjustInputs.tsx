import React, { ReactElement } from 'react'
import FieldGroup, { FieldGroupPropType } from 'common/formElements/FieldGroup/FieldGroup'
import Select, { SelectPropType } from 'common/formElements/Select/Select'
import TextInput, { TextInputPropType } from 'common/formElements/TextInput/TextInput'

type AdjInputsPropType = {
    config: null | AdjInputsType[]
}

export type AdjInputsType = AdjTextInputType | AdjCheckboxInputType | AdjRadioInputType | AdjSelectInputType

export type AdjTextInputType = {
    type: 'text',
    data: TextInputPropType
}
export type AdjCheckboxInputType = {
    type: 'checkbox',
    data: FieldGroupPropType
}
export type AdjRadioInputType = {
    type: 'radio',
    data: FieldGroupPropType
}
export type AdjSelectInputType = {
    type: 'select',
    data: SelectPropType
}

/** Компонент генерирует поля ввода изменения атрибутов выделенного элемента */
export default function AdjustInputs(props: AdjInputsPropType) {
    const { config } = props

    if (!config) return null

    return (
        <>
            {props.config.map((inputConfig, i) => {
                return <AdjustInput inputConfig={inputConfig} key={i} />
            })}
        </>
    )
}

type AdjustInputPropType = {
    inputConfig: AdjInputsType
}

/** Поле ввода изменения атрибута выделенного элемента */
function AdjustInput(props: AdjustInputPropType) {
    const { inputConfig } = props

    let Component: ReactElement

    if (inputConfig.type === 'text') {
        Component = <TextInput {...inputConfig.data} />
    }
    else if (inputConfig.type === 'checkbox' || inputConfig.type === 'radio') {
        Component = <FieldGroup {...inputConfig.data} />
    }
    else if (inputConfig.type === 'select') {
        Component = <Select {...inputConfig.data} />
    }

    return (
        <div>
            {Component}
        </div>
    )
}
