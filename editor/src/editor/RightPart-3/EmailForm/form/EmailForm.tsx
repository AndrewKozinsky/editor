import React from 'react'
import FormConstructor from 'src/libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'src/libs/FormConstructor/state/useFormConstructorState'
import formConfig from './formConfig'
import { useUpdateEmailInForm } from './useUpdateEmailInForm'


export default function EmailForm() {
    // FormConstructor state manager
    const formState = useFormConstructorState(formConfig)
    // The hook updates email in form's field
    useUpdateEmailInForm(formState)

    return <FormConstructor config={formConfig} state={formState} />
}