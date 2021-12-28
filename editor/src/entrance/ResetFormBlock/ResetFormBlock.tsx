import React from 'react'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Wrapper from 'common/Wrapper/Wrapper'
import { getMenuItems } from '../menuItems'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import getConfig from './formConfig'
import useGetMessages from 'messages/fn/useGetMessages'
import { regMenuMessages } from 'messages/regMenuMessages'
import { resetFormMessages } from 'messages/resetFormMessages'
import { commonMessages } from 'messages/commonMessages'


/** Форма сброса пароля */
export default function ResetFormBlock() {
    const commonMsg = useGetMessages(commonMessages)
    const resetFormMsg = useGetMessages(resetFormMessages)
    const regMenuMsg = useGetMessages(regMenuMessages)

    const config = getConfig(commonMsg, resetFormMsg)
    const formState = useFormConstructorState(config)

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems(regMenuMsg)}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={resetFormMsg.formHeader} type='h1' />
            </Wrapper>
            <FormConstructor config={config} state={formState} />
        </div>
    )
}
