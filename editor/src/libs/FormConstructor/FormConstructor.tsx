import React from 'react'
import FCType from './FCType'
import TextInput, { TextInputPropType } from 'common/formElements/TextInput/TextInput'
import FieldGroup, { FieldGroupPropType } from 'common/formElements/FieldGroup/FieldGroup'
import Select, { SelectPropType } from 'common/formElements/Select/Select'
import Wrapper from 'common/Wrapper/Wrapper'
import Button, { ButtonPropType } from 'common/formElements/Button/Button'
import useFormState from './state/useFormState'
import CommonError from './CommonError'

type FormConstructorPropType = {
    config: FCType.Config
}

function FormConstructor(props: FormConstructorPropType) {
    const { config } = props
    const state = useFormState(config)

    if (!state.formVisible) return null

    return (
        <form onSubmit={state.onFormSubmit}>
            <Fields config={config} state={state} />
            <Bottom config={config} state={state} />
            <CommonError error={state.commonError} />
        </form>
    )
}

export default FormConstructor


type FieldsPropType = {
    config: FCType.Config
    state: FCType.StateFormReturn
}

function Fields(props: FieldsPropType) {
    const { fields } = props.config
    const { state } = props

    const fieldsMarkup = Object.keys(fields).map((fieldName, i) => {
        const fieldConfig = fields[fieldName]

        let field = null

        if (fieldConfig.fieldType === 'text') {
            const fieldData = fieldConfig.fieldData as TextInputPropType
            fieldData.value = state.fields[fieldName].value[0]
            fieldData.onChange = state.onChangeFieldHandler
            fieldData.error = state.fields[fieldName].error

            fieldData.disabled = !!(state.fields[fieldName].disabled || state.formDisabled)

            field = <TextInput {...fieldData} />
        }
        else if (fieldConfig.fieldType === 'checkboxes' || fieldConfig.fieldType === 'radios') {
            const fieldData = fieldConfig.fieldData as FieldGroupPropType
            fieldData.value = state.fields[fieldName].value
            fieldData.onChange = state.onChangeFieldHandler

            fieldData.disabled = !!(state.fields[fieldName].disabled || state.formDisabled)

            field = <FieldGroup {...fieldData} />
        }
        else if (fieldConfig.fieldType === 'select') {
            const fieldData = fieldConfig.fieldData as SelectPropType
            fieldData.value = state.fields[fieldName].value[0]
            fieldData.onChange = state.onChangeFieldHandler

            fieldData.disabled = !!(state.fields[fieldName].disabled || state.formDisabled)

            field = <Select {...fieldData} />
        }

        return (
            <Wrapper b={10} key={i}>
                {field}
            </Wrapper>
        )
    })

    return <>{fieldsMarkup}</>
}


type BottomPropType = {
    config: FCType.Config
    state: FCType.StateFormReturn
}

function Bottom(props: BottomPropType) {
    const { config } = props
    const elems = config.bottom.elems

    return (
        <Wrapper t={20} align='justify'>
            <div>{elems}</div>
            <SubmitButton config={props.config} state={props.state} />
        </Wrapper>
    )
}

type SubmitPropType = {
    config: FCType.Config
    state: FCType.StateFormReturn
}

function SubmitButton(props: SubmitPropType) {
    const { state } = props

    const submitBtnConfig = props.config.bottom.submit as ButtonPropType
    submitBtnConfig.type = 'submit'

    submitBtnConfig.disabled = state.submitBtnDisabled || state.formDisabled

    submitBtnConfig.loading = state.submitBtnLoading

    return <Button {...submitBtnConfig} />
}
