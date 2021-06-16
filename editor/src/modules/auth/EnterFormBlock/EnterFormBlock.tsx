import React from 'react'
// @ts-ignore
import { useHistory } from 'react-router-dom'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Button from 'common/formElements/Button/Button'
import Form from 'common/formElements/Form/Form'
import Wrapper from 'common/Wrapper/Wrapper'
import TextInput from 'common/formElements/TextInput/TextInput'
import Notice from 'common/Notice/Notice'
import getFormConfig from './formResources'
import { getMenuItems } from '../menuItems'
import {
    enterFormMessages,
    enterFormJSXMessages,
    enterFormJSXFnMessages
} from 'messages/enterFormMessages'
import useFormHandler from 'libs/formHandler/useFormHandler'
import CommonError from '../CommonError/CommonError'
import FHTypes from 'libs/formHandler/types'
import {commonMessages} from 'messages/commonMessages'
import { useGetSendConfirmLetter } from 'requests/user/sendConfirmLetterRequest'


/** Форма входа в сервис */
export default function EnterFormBlock() {
    const history = useHistory()

    // FormHandler
    const fh = useFormHandler(getFormConfig(history), 'enter')

    // Показывать или сообщением подтвердить почту или форму
    const content = fh.form.confirmEmail
        ? <ConfirmLetterMessage email={fh.form.confirmEmail} />
        : <ThisForm fh={fh} />

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems()}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={enterFormMessages.formHeader} type='h1' />
            </Wrapper>
            {content}
        </div>
    )
}


type ThisFormPropType = {
    fh?: FHTypes.ReturnObj // Объектами с данными и методами манипуляцией формой
}

/** Форма входа пользователя */
function ThisForm(props: ThisFormPropType) {
    const { fh } = props

    return (
        <>
            <Form name='enter' formHandlers={fh.formHandlers}>
                <Wrapper>
                    <TextInput
                        label={ enterFormMessages.emailField }
                        name='email'
                        value={fh.fields.email.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        autocomplete='email'
                        placeholder={commonMessages.emailPlaceholder}
                        error={fh.fields.email.data.error}
                        disabled={fh.fields.email.data.disabled}
                        autoFocus={500}
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <TextInput
                        label={ enterFormMessages.passwordField }
                        name='password'
                        type='password'
                        value={fh.fields.password.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        autocomplete='current-password'
                        error={fh.fields.password.data.error}
                        disabled={fh.fields.password.data.disabled}
                    />
                </Wrapper>
                <Wrapper t={20} align={'right'}>
                    <Button
                        type='submit'
                        text={enterFormMessages.submitBtnText}
                        name='submit'
                        disabled={fh.fields.submit.data.disabled}
                        loading={fh.fields.submit.data.loading}
                    />
                </Wrapper>
                <CommonError error={fh.form.commonError} />
            </Form>

            <Wrapper t={30}>
                <Notice>{enterFormJSXMessages.newUser}</Notice>
            </Wrapper>
            <Wrapper t={10}>
                <Notice>{enterFormJSXMessages.forgotPassword}</Notice>
            </Wrapper>
        </>
    )
}


type ConfirmLetterMessagePropType = {
    visible?: boolean // Видно ли сообщение
    email: string // Почта пользователя, которую нужно подтвердить
}

/** Сообщение с просьбой подтвердить почту перед входом в редактор */
function ConfirmLetterMessage(props: ConfirmLetterMessagePropType) {
    const {
        email
    } = props

    // Обработчик щелчка по кнопке
    const { isLoading, success, error, doFetch } = useGetSendConfirmLetter(email)

    return (
        <>
            <Notice>
                {/*@ts-ignore*/}
                {enterFormJSXFnMessages.confirmRegistrationLetter(email)}
            </Notice>
            {!success && <Wrapper t={10}>
                <Button
                    text={enterFormMessages.sendAnotherLetter}
                    loading={isLoading}
                    onClick={doFetch}
                />
            </Wrapper>}
            {error && <Wrapper t={10}>
                <Notice type='error'>
                    {enterFormMessages.failedToSendAnotherConfirmationLetter}
                </Notice>
            </Wrapper>}
            {success && <Wrapper t={10}>
                <Notice type='success'>
                    {enterFormMessages.confirmationLetterWasSent}
                </Notice>
            </Wrapper>}
        </>
    )
}
