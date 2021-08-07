import React from 'react'
// @ts-ignore
import { useHistory } from 'react-router-dom'
import Header from 'src/common/textBlocks/Header/Header'
import Menu from 'src/common/misc/Menu/Menu'
import Wrapper from 'src/common/Wrapper/Wrapper'
import { getMenuItems } from '../menuItems'
import { confirmEmailMessages } from 'src/messages/confirmEmailMessages'
import config from './formConfig'
import FormConstructor from '../../libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'


/** Форма подтверждения почты */
export default function ConfirmEmailFormBlock() {
    const history = useHistory()
    const formState = useFormConstructorState(config, {history})

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems()}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={confirmEmailMessages.formHeader} type='h1' />
            </Wrapper>
            <FormConstructor config={config} state={formState} />
        </div>
    )
}
