import React from 'react'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import { useUpdateEmailInForm } from './useUpdateEmailInForm'
import getEmailFormConfig from './formConfig'

/** Форма изменения почты пользователя */
export default function EmailForm() {
    const formConfig = getEmailFormConfig()

    // FormConstructor state manager
    const formState = useFormConstructorState(formConfig)
    // The hook updates email in form's field
    useUpdateEmailInForm(formState)

    return <FormConstructor config={formConfig} state={formState} />
}
