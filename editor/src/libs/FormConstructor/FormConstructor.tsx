import React from 'react'
import FCType from './FCType'
import Hr from 'common/misc/Hr/Hr'
import TextInput, { TextInputPropType } from 'common/formElements/TextInput/TextInput'
import FieldGroup, { FieldGroupPropType } from 'common/formElements/FieldGroup/FieldGroup'
import Select, { SelectPropType } from 'common/formElements/Select/Select'
import Wrapper, { WrapperPropType } from 'common/Wrapper/Wrapper'
import Button, { ButtonPropType } from 'common/formElements/Button/Button'
import CommonNotice from 'libs/FormConstructor/misc/CommonNotice'
import serverMsg from 'messages/serverMessages'

type FormConstructorPropType = {
    config: FCType.Config // Form config
    state: FCType.StateFormReturn // Form state
}

/** The component gets form config and its state and generate form's markup */
function FormConstructor(props: FormConstructorPropType) {
    const { config, state } = props

    if (!state.formVisible) return null

    return (
        <form onSubmit={state.onFormSubmit}>
            <Fields config={config} state={state} />
            <BottomDivider config={config} state={state} />
            <Bottom config={config} state={state} />
            <Common config={config} state={state} />
        </form>
    )
}

export default FormConstructor

/** Form fields component */
function Fields(props: FormConstructorPropType) {
    const { fields } = props.config
    const { state } = props

    // A form may consists only submit button
    if (!fields) return null

    // Generate all fields depends on its type and passed data
    let fieldsMarkup = Object.keys(fields).map((fieldName, i) => {
        const fieldConfig = fields[fieldName]

        // Field element
        let field = null

        // If it is a text input
        if (fieldConfig.fieldType === 'text') {
            // Get all field data
            const fieldData = fieldConfig.fieldData as TextInputPropType

            // Add field name, value, onChange handler and error text. This data controlled by FormConstructor Store
            fieldData.name = fieldName
            fieldData.value = state.fields[fieldName].value[0]
            fieldData.onChange = state.onChangeFieldHandler

            // Получить текст ошибки...
            let errorText = state.fields[fieldName].error
            // Возможно этот текст ошибки пришёл из сервера.
            // Тогда он будет вида site_CreateSiteDto_nameTooLong
            // Поэтому проверю есть ли человекочитаемый эквивалент в объекте serverMsg
            //@ts-ignore
            if (errorText && serverMsg[errorText]) errorText = serverMsg[errorText]
            // Назначу текст ошибки
            fieldData.error = errorText

            // Disable field if it is disabled or entire form
            fieldData.disabled = !!(state.fields[fieldName].disabled || state.formDisabled)

            field = <TextInput {...fieldData} />
        }
        else if (fieldConfig.fieldType === 'checkbox' || fieldConfig.fieldType === 'radio') {
            const fieldData = fieldConfig.fieldData as FieldGroupPropType
            fieldData.value = state.fields[fieldName].value
            fieldData.onChange = state.onChangeFieldHandler

            fieldData.disabled = !!(state.fields[fieldName].disabled || state.formDisabled)

            field = <FieldGroup {...fieldData} />
        }
        else if (fieldConfig.fieldType === 'select') {
            const fieldData = fieldConfig.fieldData as SelectPropType
            fieldData.name = fieldName
            fieldData.value = state.fields[fieldName].value[0]

            //@ts-ignore
            if (state.fields[fieldName].options) {
                //@ts-ignore
                fieldData.options = state.fields[fieldName].options
            }

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

/** Разделительная полоса между полями формы и кнопкой отправки */
function BottomDivider(props: FormConstructorPropType) {
    if (!props.config.bottom?.hr) return null

    return (
        <Wrapper t={10}>
            <Hr />
        </Wrapper>
    )
}

/** The component with some passed elements (buttons, for example) and a submit button */
function Bottom(props: FormConstructorPropType) {
    const { hr } = props.config.bottom
    const { elems, align } = props.config.bottom

    // Some wrapper customization
    let wrapperProps: WrapperPropType = {align: 'justify', t: 5}
    if (hr) wrapperProps.t = 15
    if (align === 'left') delete wrapperProps.align

    return (
        <Wrapper {...wrapperProps}>
            <div>{elems}</div>
            <SubmitButton {...props} />
        </Wrapper>
    )
}

/** Submit button component */
function SubmitButton(props: FormConstructorPropType) {
    const { state } = props

    const submitBtnConfig = props.config.bottom.submit as ButtonPropType
    submitBtnConfig.type = 'submit'
    submitBtnConfig.disabled = state.submitBtnDisabled || state.formDisabled
    submitBtnConfig.loading = state.submitBtnLoading

    return <Button {...submitBtnConfig} />
}

/** A component with common success or error message */
function Common(props: FormConstructorPropType) {
    const { state } = props

    if (state.commonError && state.showCommonError) {
        return <CommonNotice type='error' text={state.commonError} />
    }
    else if (state.commonSuccess && state.showCommonSuccess && state.formSentSuccessfully) {
        return <CommonNotice type='success' text={state.commonSuccess} />
    }

    return null
}
