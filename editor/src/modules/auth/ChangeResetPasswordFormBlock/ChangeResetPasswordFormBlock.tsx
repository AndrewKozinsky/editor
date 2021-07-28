import React, { useState } from 'react'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Wrapper from 'common/Wrapper/Wrapper'
import { getMenuItems } from '../menuItems'
import {
    changeResetPasswordFormMessages,
    changeResetPasswordFormJSXMessages
} from 'messages/changeResetPasswordFormMessages'
import UniversalAuthForm from '../UniversalAuthForm/UniversalAuthForm'
import createFormConfig from './formConfig'
import Notice from 'common/textBlocks/Notice/Notice'


/** Форма входа в сервис */
export default function ChangeResetPasswordFormBlock() {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const formConfig = createFormConfig(setShowSuccessMessage)

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems()}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={changeResetPasswordFormMessages.formHeader} type='h1' />
            </Wrapper>
            <UniversalAuthForm config={formConfig} />
            {showSuccessMessage && <PasswordChangedMessage />}
        </div>
    )
}


/** Сообщение об изменённом пароле */
function PasswordChangedMessage() {
    return (
        <Notice bg icon='success'>
            {changeResetPasswordFormJSXMessages.passwordChanged}
        </Notice>
    )
}
