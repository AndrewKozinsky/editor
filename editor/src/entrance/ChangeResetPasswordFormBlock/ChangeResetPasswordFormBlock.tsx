import React, {useCallback} from 'react'
import { useHistory } from 'react-router-dom'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Wrapper from 'common/Wrapper/Wrapper'
import { getMenuItems } from '../menuItems'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import Notice from 'common/textBlocks/Notice/Notice'
import Button from 'common/formElements/Button/Button'
import { smoothMoveToEditor } from '../EntrancePages/EntrancePages-func'
import getChangeResetPasswordFormConfig from './formConfig'
import changeResetPasswordFormMsg from 'messages/changeResetPasswordFormMessages'


/** Форма входа в сервис */
export default function ChangeResetPasswordFormBlock() {
    const config = getChangeResetPasswordFormConfig()
    const formState = useFormConstructorState(config)

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems()}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={changeResetPasswordFormMsg.formHeader} type='h1' />
            </Wrapper>
            <FormConstructor config={config} state={formState} />
            {formState.formSentSuccessfully && <PasswordChangedMessage />}
        </div>
    )
}


/** Сообщение об изменённом пароле */
function PasswordChangedMessage() {
    let history = useHistory()

    const switchToEditor = useCallback(function() {
        // Smooth hide entrance forms wrapper and show the editor
        smoothMoveToEditor()

        setTimeout(function() {
            history.push('/')
        }, 600)
    }, [])

    return (
        <Notice bg icon='success'>
            <p>{changeResetPasswordFormMsg.passwordChanged}</p>
            <Wrapper t={10}>
                <Button
                    text={changeResetPasswordFormMsg.toEditor}
                    onClick={switchToEditor}
                />
            </Wrapper>
        </Notice>
    )
}
