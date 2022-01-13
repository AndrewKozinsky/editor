import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Button from 'common/formElements/Button/Button'
import Wrapper from 'common/Wrapper/Wrapper'
import enterFormMsg from 'messages/enterFormMessages'
import { getMenuItems } from '../menuItems'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import getEnterFormConfig from './formConfig'
import Notice from 'common/textBlocks/Notice/Notice'
import { useGetSendConfirmLetter } from 'requests/user/sendConfirmLetterRequest'


/** Форма входа в сервис */
export default function EnterFormBlock() {
    const history = useHistory()
    const config = getEnterFormConfig()

    const [showConfirmEmailMessage, setShowConfirmEmailMessage] = useState(false)
    const formState = useFormConstructorState(config, {history, setShowConfirmEmailMessage})

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems()}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={enterFormMsg.formHeader} type='h1' />
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
                <p>{enterFormMsg.confirmRegistrationLetter}</p>
                <Wrapper t={10} b={5}>
                    <Button
                        text={enterFormMsg.sendAnotherLetter}
                        loading={isLoading}
                        onClick={doFetch}
                    />
                </Wrapper>
            </Notice>
            {error && <Wrapper t={10}>
                <Notice icon='error' bg>
                    {enterFormMsg.failedToSendAnotherConfirmationLetter}
                </Notice>
            </Wrapper>}
            {success && <Wrapper t={10}>
                <Notice icon='success' bg>
                    {enterFormMsg.confirmationLetterWasSent}
                </Notice>
            </Wrapper>}
        </>
    )
}
