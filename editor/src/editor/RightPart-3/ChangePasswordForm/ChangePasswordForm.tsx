import React from 'react'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import getChangePasswordFormConfig from './formConfig'

/* Форма изменения пароля пользователя */
export default function ChangePasswordForm() {
    const formState = useFormConstructorState(getChangePasswordFormConfig)
    return <FormConstructor config={getChangePasswordFormConfig} state={formState} />
}
