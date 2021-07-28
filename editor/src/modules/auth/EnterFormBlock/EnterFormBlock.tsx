import React, { useState } from 'react'
// @ts-ignore
import { useHistory } from 'react-router-dom'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Button from 'common/formElements/Button/Button'
import Wrapper from 'common/Wrapper/Wrapper'
import { getMenuItems } from '../menuItems'
import createFormConfig from './formConfig'
import {
    enterFormMessages,
    enterFormJSXFnMessages
} from 'messages/enterFormMessages'
import UniversalAuthForm from '../UniversalAuthForm/UniversalAuthForm'
import Notice from 'common/textBlocks/Notice/Notice'
import CommonError from '../CommonError/CommonError'
import { useGetSendConfirmLetter } from 'requests/user/sendConfirmLetterRequest'


/** Форма входа в сервис */
export default function EnterFormBlock() {
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [showCommonError, setShowCommonError] = useState(true)
    const [commonError, setCommonError] = useState('')
    const [showForm, setShowForm] = useState(true)
    const [showConfirmEmailMessage, setShowConfirmEmailMessage] = useState(false)

    const formConfig = createFormConfig(
        setEmail, setShowCommonError, setCommonError, setShowForm, setShowConfirmEmailMessage, history
    )

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems()}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={enterFormMessages.formHeader} type='h1' />
            </Wrapper>
            {showForm && <UniversalAuthForm config={formConfig} />}
            {showConfirmEmailMessage && <ConfirmLetterMessage email={email} />}
            {showCommonError && <CommonError error={commonError} />}
        </div>
    )
}


type ConfirmLetterMessagePropType = {
    email: string // Почта пользователя, которую нужно подтвердить
}

/** Сообщение с просьбой подтвердить почту перед входом в редактор */
function ConfirmLetterMessage(props: ConfirmLetterMessagePropType) {
    const { email } = props

    // Обработчик щелчка по кнопке
    const { isLoading, success, error, doFetch } = useGetSendConfirmLetter(email)

    return (
        <>
            <Notice icon='error' bg>
                <p>{enterFormJSXFnMessages.confirmRegistrationLetter(email)}</p>
                <Wrapper t={10} b={5}>
                    <Button
                        text={enterFormMessages.sendAnotherLetter}
                        loading={isLoading}
                        onClick={doFetch}
                    />
                </Wrapper>
            </Notice>
            {error && <Wrapper t={10}>
                <Notice icon='error' bg>
                    {enterFormMessages.failedToSendAnotherConfirmationLetter}
                </Notice>
            </Wrapper>}
            {success && <Wrapper t={10}>
                <Notice icon='success' bg>
                    {enterFormMessages.confirmationLetterWasSent}
                </Notice>
            </Wrapper>}
        </>
    )
}
