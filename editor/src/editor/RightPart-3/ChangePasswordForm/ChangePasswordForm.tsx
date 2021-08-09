import React from 'react'
import FormConstructor from '../../../libs/FormConstructor/FormConstructor'
import useFormConstructorState from "../../../libs/FormConstructor/state/useFormConstructorState"
import config from './formConfig'


export default function ChangePasswordForm() {
    const formState = useFormConstructorState(config)
    return <FormConstructor config={config} state={formState} />
}