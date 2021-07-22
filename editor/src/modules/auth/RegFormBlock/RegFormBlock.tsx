import React from 'react'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
// import Button from 'common/formElements/Button/Button'
import Form from 'common/formElements/Form/Form'
import Wrapper from 'common/Wrapper/Wrapper'
// import TextInput from 'common/formElements/TextInput/TextInput'
import Notice from 'common/textBlocks/Notice/Notice'
import getFormConfig from './formResources'
import { getMenuItems } from '../menuItems'
import useFormHandler from 'libs/formHandler/useFormHandler'
// import CommonError from '../CommonError/CommonError'
import FHTypes from 'libs/formHandler/types'
import {
    regFormMessages,
    regFormJSXMessages,
    regFormJSXFnMessages
} from 'messages/regFormMessages'
// import { commonMessages } from 'messages/commonMessages'


/** Форма входа в сервис */
export default function RegFormBlock() {

    // FormHandler
    const fh = useFormHandler(getFormConfig(), 'reg')

    // Показывать или сообщение об успешной регистрации или форму
    const content = fh.form.letterWasSentTo
        ? <LetterWasSent email={fh.form.letterWasSentTo} />
        : <ThisForm fh={fh} />

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems()}/>
            </Wrapper>
            <Wrapper b={10}>
                {/*@ts-ignore*/}
                <Header text={regFormMessages.formHeader} type='h1' />
            </Wrapper>
            {content}
        </div>
    )
}


type ThisFormPropType = {
    fh?: FHTypes.ReturnObj // Объектами с данными и методами манипуляцией формой
}

/** Форма регистрации пользователя */
function ThisForm(props: ThisFormPropType) {
    const { fh } = props

    return (
        <>
            <Form name='reg' formHandlers={fh.formHandlers}>
                <Wrapper>
                    {/*<TextInput
                        label={ regFormMessages.emailField }
                        name='email'
                        value={fh.fields.email.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        autocomplete='username'
                        placeholder={commonMessages.emailPlaceholder}
                        error={fh.fields.email.data.error}
                        disabled={fh.fields.email.data.disabled}
                        autoFocus
                    />*/}
                </Wrapper>
                <Wrapper t={15}>
                    {/*<TextInput
                        label={ regFormMessages.passwordField }
                        name='password'
                        type='password'
                        value={fh.fields.password.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        autocomplete='new-password'
                        error={fh.fields.password.data.error}
                        disabled={fh.fields.password.data.disabled}
                    />*/}
                </Wrapper>
                <Wrapper t={15}>
                    {/*<TextInput
                        label={ regFormMessages.passwordConfirmField }
                        name='passwordConfirm'
                        type='password'
                        value={fh.fields.passwordConfirm.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        autocomplete='new-password'
                        error={fh.fields.passwordConfirm.data.error}
                        disabled={fh.fields.passwordConfirm.data.disabled}
                    />*/}
                </Wrapper>
                <Wrapper t={20} align={'right'}>
                    {/*<Button
                        type='submit'
                        text={regFormMessages.submitBtnText}
                        name='submit'
                        disabled={fh.fields.submit.data.disabled}
                        loading={fh.fields.submit.data.loading}
                    />*/}
                </Wrapper>
                {/*<CommonError error={fh.form.commonError} />*/}
            </Form>

            <Wrapper t={30}>
                <Notice>{regFormJSXMessages.legal}</Notice>
            </Wrapper>
            <Wrapper t={30}>
                <Notice>{regFormJSXMessages.doYouHaveAccount}</Notice>
            </Wrapper>
        </>
    )
}


type LetterWasSentPropType = {
    email: string // Почта пользователя, на которую регистрируется учётная запись
}

/** Сообщение с просьбой подтвердить почту перед входом в редактор */
function LetterWasSent(props: LetterWasSentPropType) {
    const { email } = props

    return (
        <Notice>
            {regFormJSXFnMessages.confirmRegistrationLetter(email)}
        </Notice>
    )
}
