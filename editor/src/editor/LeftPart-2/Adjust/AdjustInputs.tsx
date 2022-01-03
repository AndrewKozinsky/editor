import React, { ReactElement } from 'react'
import FieldGroup, { FieldGroupPropType } from 'common/formElements/FieldGroup/FieldGroup'
import Select, { SelectPropType } from 'common/formElements/Select/Select'
import TextInput, { TextInputPropType } from 'common/formElements/TextInput/TextInput'

type AdjInputsPropType = {
    config: AdjTextInputsType[]
}

export type AdjTextInputsType = AdjTextInputType | AdjCheckboxInputType | AdjRadioInputType | AdjSelectInputType
type AdjTextInputType = {
    type: 'text',
    data: TextInputPropType
}
type AdjCheckboxInputType = {
    type: 'checkbox',
    data: FieldGroupPropType
}
type AdjRadioInputType = {
    type: 'radio',
    data: FieldGroupPropType
}
type AdjSelectInputType = {
    type: 'select',
    data: SelectPropType
}

export default function AdjustInputs(props: AdjInputsPropType) {
    return (
        <>
            {props.config.map((inputConfig, i) => {
                return <AdjustInput inputConfig={inputConfig} key={i} />
            })}
        </>
    )
}

type AdjustInputPropType = {
    inputConfig: AdjTextInputsType
}

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

