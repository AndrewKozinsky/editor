import React from 'react'
import FCType from './FCType'
import TextInput, { TextInputPropType } from 'common/formElements/TextInput/TextInput'
import FieldGroup, { FieldGroupPropType } from 'common/formElements/FieldGroup/FieldGroup'
import Select, { SelectPropType } from 'common/formElements/Select/Select'
import Wrapper from 'common/Wrapper/Wrapper'
import Button, { ButtonPropType } from 'common/formElements/Button/Button'
import CommonError from './misc/CommonError'

type FormConstructorPropType = {
    config: FCType.Config
    state: FCType.StateFormReturn
}

function FormConstructor(props: FormConstructorPropType) {
    const { config, state } = props

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


function Fields(props: FormConstructorPropType) {
    const { fields } = props.config
    const { state } = props

    const fieldsMarkup = Object.keys(fields).map((fieldName, i) => {
        const fieldConfig = fields[fieldName]

        let field = null

        if (fieldConfig.fieldType === 'text') {
            const fieldData = fieldConfig.fieldData as TextInputPropType
            fieldData.name = fieldName
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


function Bottom(props: FormConstructorPropType) {
    const { elems } = props.config.bottom

    return (
        <Wrapper t={20} align='justify'>
            <div>{elems}</div>
            <SubmitButton {...props} />
        </Wrapper>
    )
}

function SubmitButton(props: FormConstructorPropType) {
    const { state } = props

    const submitBtnConfig = props.config.bottom.submit as ButtonPropType
    submitBtnConfig.type = 'submit'

    submitBtnConfig.disabled = state.submitBtnDisabled || state.formDisabled

    submitBtnConfig.loading = state.submitBtnLoading

    return <Button {...submitBtnConfig} />
}
