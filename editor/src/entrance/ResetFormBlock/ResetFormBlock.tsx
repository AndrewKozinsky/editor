import React, { useState } from 'react'
import Header from 'src/common/textBlocks/Header/Header'
import Menu from 'src/common/misc/Menu/Menu'
import Wrapper from 'src/common/Wrapper/Wrapper'
import { getMenuItems } from '../menuItems'
import { resetFormMessages, resetFormJSXFnMessages } from 'src/messages/resetFormMessages'
import UniversalAuthForm from '../UniversalAuthForm/UniversalAuthForm'
import Notice from 'src/common/textBlocks/Notice/Notice'
import createFormConfig from './formConfig'


/** Форма сброса пароля */
export default function ResetFormBlock() {

    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [email, setEmail] = useState('')

    const formConfig = createFormConfig(setEmail, setShowSuccessMessage)

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems()}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={resetFormMessages.formHeader} type='h1' />
            </Wrapper>
            <UniversalAuthForm config={formConfig} />
            <EmailWasSentMessage email={email} show={showSuccessMessage} />
        </div>
    )
}


type EmailWasSentMessagePropType = {
    show: boolean
    email: string // Почта пользователя, которую нужно подтвердить
}

/** Сообщение с просьбой перейти к письму и нажать на ссылку для ввода нового пароля */
function EmailWasSentMessage(props: EmailWasSentMessagePropType) {
    if (!props.show) return null

    return (
        <>
            <Notice icon='success' bg>
                {resetFormJSXFnMessages.retypePasswordLetter(props.email)}
            </Notice>
        </>
    )
}
