import React from 'react'
// @ts-ignore
import { useHistory } from 'react-router-dom'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Wrapper from 'common/Wrapper/Wrapper'
import { getMenuItems } from '../menuItems'
import { confirmEmailMessages } from 'messages/confirmEmailMessages'
import UniversalAuthForm from '../UniversalAuthForm/UniversalAuthForm'
import createFormConfig from './formConfig'


/** Форма подтверждения почты */
export default function ConfirmEmailFormBlock() {
    const history = useHistory()

    const formConfig = createFormConfig(history)

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems()}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={confirmEmailMessages.formHeader} type='h1' />
            </Wrapper>
            <UniversalAuthForm config={formConfig} />
        </div>
    )
}
