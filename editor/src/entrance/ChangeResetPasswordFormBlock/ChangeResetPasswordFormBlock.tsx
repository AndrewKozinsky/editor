import React from 'react'
// @ts-ignore
import { useHistory } from 'react-router-dom'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Wrapper from 'common/Wrapper/Wrapper'
import { getMenuItems } from '../menuItems'
import { changeResetPasswordFormMessages } from 'src/messages/changeResetPasswordFormMessages'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import Notice from 'common/textBlocks/Notice/Notice'
import Button from 'common/formElements/Button/Button'
import { smoothMoveToEditor } from '../EntrancePages/EntrancePages-func'
import config from './formConfig'


/** Форма входа в сервис */
export default function ChangeResetPasswordFormBlock() {
    const formState = useFormConstructorState(config)

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems()}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={changeResetPasswordFormMessages.formHeader} type='h1' />
            </Wrapper>
            <FormConstructor config={config} state={formState} />
            {formState.formSentSuccessfully && <PasswordChangedMessage />}
        </div>
    )
}


/** Сообщение об изменённом пароле */
function PasswordChangedMessage() {
    let history = useHistory()

    function switchToEditor() {
        // Smooth hide entrance forms wrapper and show the editor
        smoothMoveToEditor()

        setTimeout(function() {
            history.push('/')
        }, 600)
    }

    return (
        <Notice bg icon='success'>
            <p>{changeResetPasswordFormMessages.passwordChanged}</p>
            <Wrapper t={10}>
                <Button
                    text={changeResetPasswordFormMessages.toEditor}
                    onClick={switchToEditor}
                />
            </Wrapper>
        </Notice>
    )
}
