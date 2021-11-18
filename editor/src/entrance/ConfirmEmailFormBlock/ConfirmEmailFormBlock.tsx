import React from 'react'
import { useHistory } from 'react-router-dom'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Wrapper from 'common/Wrapper/Wrapper'
import { getMenuItems } from '../menuItems'
import getConfig from './formConfig'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import useGetMessages from 'messages/fn/useGetMessages'
import { regMenuMessages } from 'messages/regMenuMessages'
import { confirmEmailMessages } from 'messages/confirmEmailMessages'
import { commonMessages } from 'messages/commonMessages'


/** Форма подтверждения почты */
export default function ConfirmEmailFormBlock() {
    const history = useHistory()

    const commonMsg = useGetMessages(commonMessages)
    const confirmEmailMsg = useGetMessages(confirmEmailMessages)
    const regMenuMsg = useGetMessages(regMenuMessages)

    const config = getConfig(commonMsg, confirmEmailMsg)
    const formState = useFormConstructorState(config, {history})

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems(regMenuMsg)}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={confirmEmailMsg.formHeader} type='h1' />
            </Wrapper>
            <FormConstructor config={config} state={formState} />
        </div>
    )
}
