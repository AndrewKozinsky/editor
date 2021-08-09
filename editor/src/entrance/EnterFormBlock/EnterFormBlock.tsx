import React, { useState } from 'react'
// @ts-ignore
import { useHistory } from 'react-router-dom'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Button from 'common/formElements/Button/Button'
import Wrapper from 'common/Wrapper/Wrapper'
import { getMenuItems } from '../menuItems'
import {
    enterFormMessages,
    enterFormJSXFnMessages
} from 'src/messages/enterFormMessages'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import config from './formConfig'
import Notice from 'common/textBlocks/Notice/Notice'
import { useGetSendConfirmLetter } from 'src/requests/user/sendConfirmLetterRequest'


/** Форма входа в сервис */
export default function EnterFormBlock() {
    const history = useHistory()

    const [showConfirmEmailMessage, setShowConfirmEmailMessage] = useState(false)
    const formState = useFormConstructorState(config, {history, setShowConfirmEmailMessage})

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems()}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={enterFormMessages.formHeader} type='h1' />
            </Wrapper>
            <FormConstructor config={config} state={formState} />
            {showConfirmEmailMessage && <ConfirmLetterMessage email={formState.fields.email.value[0]} />}
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
