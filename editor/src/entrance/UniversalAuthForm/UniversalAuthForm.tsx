import React, { ReactElement } from 'react'
import UniversalAuthFormConfigType from './UniversalAuthFormConfigType'
import Button from 'src/common/formElements/Button/Button'
import Form from 'src/common/formElements/Form/Form'
import Wrapper, { WrapperPropType } from 'src/common/Wrapper/Wrapper'
import TextInput, { TextInputPropType } from 'src/common/formElements/TextInput/TextInput'
import getFormConfig from './formResources'
import useFormHandler from 'src/libs/formHandler/useFormHandler'
import CommonError from '../CommonError/CommonError'


type UniversalAuthFormPropType = {
    config: UniversalAuthFormConfigType.Config,
}

/** Universal Auth Form component */
export default function UniversalAuthForm(props: UniversalAuthFormPropType) {

    const { config } = props

    // FormHandler
    const fh = useFormHandler(getFormConfig(config), 'form')

    const fields: ReactElement[] = []
    let fieldCounter = -1

    for (let fieldName in config.fields) {
        const field = config.fields[fieldName]
        fieldCounter++

        let wrapperProps: WrapperPropType = {}
        if (fieldCounter > 0) wrapperProps.t = 15

        const textInputArgs: TextInputPropType = {
            label: field.label,
            name: fieldName,
            value: fh.fields[fieldName].value[0],
            onChange: fh.onChangeFieldHandler,
            error: fh.fields[fieldName].data.error,
            disabled: fh.fields[fieldName].data.disabled
        }
        if (field.autocomplete) {
            textInputArgs.autocomplete = field.autocomplete
        }
        if (field.placeholder) {
            textInputArgs.placeholder = field.placeholder
        }
        if (field.autoFocus) {
            textInputArgs.autoFocus = field.autoFocus
        }
        if (field.type) {
            textInputArgs.type = field.type
        }

        fields.push (
            <Wrapper {...wrapperProps} key={fieldName}>
                <TextInput {...textInputArgs} />
            </Wrapper>
        )
    }

    if (!fh.formState.form.data.isFormVisible) return null

    return (
        <Form name='form' formHandlers={fh.formHandlers}>
            {fields}
            <Wrapper t={20}>
                <Button
                    type='submit'
                    text={config.submit.text}
                    big
                    block
                    align='center'
                    color='accent'
                    name='submit'
                    disabled={fh.fields.submit.data.disabled}
                    loading={fh.fields.submit.data.loading}
                />
            </Wrapper>
            {fh.form.commonError && <CommonError error={fh.form.commonError} />}
        </Form>
    )
}
