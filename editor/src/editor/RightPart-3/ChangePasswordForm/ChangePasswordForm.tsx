import React from 'react'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import getConfig from './formConfig'
import { changePasswordSectionMessages } from 'messages/changePasswordSectionMessages'
import { commonMessages } from 'messages/commonMessages'
import useGetMessages from 'messages/fn/useGetMessages'


export default function ChangePasswordForm() {
    const commonMsg = useGetMessages(commonMessages)
    const changePasswordSectionMsg = useGetMessages(changePasswordSectionMessages)

    const config = getConfig(commonMsg, changePasswordSectionMsg)

    const formState = useFormConstructorState(config)
    return <FormConstructor config={config} state={formState} />
}
