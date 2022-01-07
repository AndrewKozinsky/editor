import React from 'react'
import { useHistory } from 'react-router-dom'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Wrapper from 'common/Wrapper/Wrapper'
import { getMenuItems } from '../menuItems'
import getConfirmEmailFormConfig from './formConfig'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import confirmEmailMsg from 'messages/confirmEmailMessages'


/** Форма подтверждения почты */
export default function ConfirmEmailFormBlock() {
    const history = useHistory()

    const config = getConfirmEmailFormConfig()
    const formState = useFormConstructorState(config, {history})

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems()}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={confirmEmailMsg.formHeader} type='h1' />
            </Wrapper>
            <FormConstructor config={config} state={formState} />
        </div>
    )
}
