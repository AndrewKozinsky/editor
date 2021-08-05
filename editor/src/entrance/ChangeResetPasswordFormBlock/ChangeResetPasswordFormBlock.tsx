// import React, { useState } from 'react'
// @ts-ignore
// import { useHistory } from 'react-router-dom'
// import Header from 'src/common/textBlocks/Header/Header'
// import Menu from 'src/common/misc/Menu/Menu'
// import Wrapper from 'src/common/Wrapper/Wrapper'
// import { getMenuItems } from '../menuItems'
// import { changeResetPasswordFormMessages } from 'src/messages/changeResetPasswordFormMessages'
// import UniversalAuthForm from '../UniversalAuthForm/UniversalAuthForm'
// import createFormConfig from './formConfig'
// import Notice from 'src/common/textBlocks/Notice/Notice'
// import Button from 'src/common/formElements/Button/Button'
// import { smoothMoveToEditor } from '../EntrancePages/EntrancePages-func'


/** Форма входа в сервис */
/*export default function ChangeResetPasswordFormBlock() {
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
}*/


/** Сообщение об изменённом пароле */
/*function PasswordChangedMessage() {
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
}*/
