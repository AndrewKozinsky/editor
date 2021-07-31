import React, { useState } from 'react'
import Header from 'src/common/textBlocks/Header/Header'
import Menu from 'src/common/misc/Menu/Menu'
import Wrapper from 'src/common/Wrapper/Wrapper'
import Notice from 'src/common/textBlocks/Notice/Notice'
import { getMenuItems } from '../menuItems'
import { regFormMessages, regFormJSXFnMessages, regFormJSXMessages } from 'src/messages/regFormMessages'
import UniversalAuthForm from '../UniversalAuthForm/UniversalAuthForm'
import createFormConfig from './formConfig'


/** User Sign up form */
export default function RegFormBlock() {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [email, setEmail] = useState('')

    const formConfig = createFormConfig(setEmail, setShowSuccessMessage)

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems()}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={regFormMessages.formHeader} type='h1' />
            </Wrapper>
            <UniversalAuthForm config={formConfig} />
            <LetterWasSent email={email} show={showSuccessMessage} />
            <Info hide={showSuccessMessage} />
        </div>
    )
}


type LetterWasSentPropType = {
    show: boolean
    email: string // Почта пользователя, на которую регистрируется учётная запись
}

/** The message that the letter was sent */
export function LetterWasSent(props: LetterWasSentPropType) {
    if (!props.show) return null

    return (
        <Notice icon='success' bg>
            {regFormJSXFnMessages.confirmRegistrationLetter(props.email)}
        </Notice>
    )
}

type InfoPropType = {
    hide: boolean
}

function Info(props: InfoPropType) {
    if (props.hide) return null

    return (
        <>
            <Wrapper t={20}>
                <Notice>{regFormJSXMessages.legal}</Notice>
            </Wrapper>
            <Wrapper t={20}>
                <Notice>{regFormJSXMessages.doYouHaveAccount}</Notice>
            </Wrapper>
        </>
    )
}