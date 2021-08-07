import React, { useState } from 'react'
import Header from 'src/common/textBlocks/Header/Header'
import Menu from 'src/common/misc/Menu/Menu'
import Wrapper from 'src/common/Wrapper/Wrapper'
import { getMenuItems } from '../menuItems'
import {
    resetFormMessages,
    resetFormJSXFnMessages
} from 'src/messages/resetFormMessages'
import FormConstructor from '../../libs/FormConstructor/FormConstructor'
import useFormConstructorState from '../../libs/FormConstructor/state/useFormConstructorState'
import config from './formConfig'
import Notice from 'src/common/textBlocks/Notice/Notice'


/** Форма сброса пароля */
export default function ResetFormBlock() {
    const formState = useFormConstructorState(config)

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems()}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={resetFormMessages.formHeader} type='h1' />
            </Wrapper>
            <FormConstructor config={config} state={formState} />
            <EmailWasSentMessage email={formState.fields.email.value[0]} show={formState.formSentSuccessfully} />
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
