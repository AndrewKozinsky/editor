// import React from 'react'
// import Header from 'common/textBlocks/Header/Header'
// import Menu from 'common/misc/Menu/Menu'
// import Button from 'common/formElements/Button/Button'
// import Form from 'common/formElements/Form/Form'
// import Wrapper from 'common/Wrapper/Wrapper'
// import TextInput from 'common/formElements/TextInput/TextInput'
// import Notice from 'common/Notice/Notice'
// import getFormConfig from './formResources'
// import { getMenuItems } from '../menuItems'
/*import {
    resetFormMessages,
    resetFormJSXFnMessages
} from 'messages/resetFormMessages'*/
// import useFormHandler from 'libs/formHandler/useFormHandler'
// import CommonError from '../CommonError/CommonError'
// import FHTypes from 'libs/formHandler/types'
// import {commonMessages} from 'messages/commonMessages'


/** Форма входа в сервис */
/*export default function ResetFormBlock() {

    // FormHandler
    const fh = useFormHandler(getFormConfig(), 'reset')

    // Показывать или сообщением подтвердить почту или форму
    const content = fh.form.emailWasSent
        ? <EmailWasSentMessage email={fh.form.emailWasSent} />
        : <ThisForm fh={fh} />

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems()}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={resetFormMessages.formHeader} type='h1' />
            </Wrapper>
            {content}
        </div>
    )
}*/


/*type ThisFormPropType = {
    fh?: FHTypes.ReturnObj // Объектами с данными и методами манипуляцией формой
}*/

/** Форма входа пользователя */
/*function ThisForm(props: ThisFormPropType) {

    const {
        fh
    } = props

    return (
        <>
            <Form name='reset' formHandlers={fh.formHandlers}>
                <Wrapper>
                    <TextInput
                        label={resetFormMessages.emailField}
                        name='email'
                        value={fh.fields.email.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        autocomplete='email'
                        placeholder={commonMessages.emailPlaceholder}
                        error={fh.fields.email.data.error}
                        disabled={fh.fields.email.data.disabled}
                        autoFocus
                    />
                </Wrapper>
                <Wrapper t={20} align={'right'}>
                    <Button
                        type='submit'
                        text={resetFormMessages.submitBtnText}
                        name='submit'
                        disabled={fh.fields.submit.data.disabled}
                        loading={fh.fields.submit.data.loading}
                    />
                </Wrapper>
                <CommonError error={fh.form.commonError} />
            </Form>
        </>
    )
}*/


/*type EmailWasSentMessagePropType = {
    email: string // Почта пользователя, которую нужно подтвердить
}*/

/** Сообщение с просьбой перейти к письму и нажать на ссылку для ввода нового пароля */
/*function EmailWasSentMessage(props: EmailWasSentMessagePropType) {
    const {
        email
    } = props

    return (
        <>
            <Notice>
                {resetFormJSXFnMessages.retypePasswordLetter(email)}
            </Notice>
        </>
    )
}*/
