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
// import useFormHandler from 'libs/formHandler/useFormHandler'
/*import {
    changeResetPasswordFormMessages,
    changeResetPasswordFormJSXMessages
} from 'messages/changeResetPasswordFormMessages'*/
// import FHTypes from 'libs/formHandler/types'


/** Форма входа в сервис */
/*export default function ChangeResetPasswordFormBlock() {
    // FormHandler
    const fh = useFormHandler(getFormConfig(), 'changeResetPassword')

    // Показывать или сообщением что пароль изменён или форму
    const content = fh.form.passwordHasChangedMessage
        ? <PasswordChangedMessage />
        : <ThisForm fh={fh} />

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems()}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={changeResetPasswordFormMessages.formHeader} type='h1' />
            </Wrapper>
            {content}
        </div>
    )
}*/


/*type ThisFormPropType = {
    fh?: FHTypes.ReturnObj // Объектами с данными и методами манипуляцией формой
}*/

/** Форма ввода нового пароля пользователя */
/*function ThisForm(props: ThisFormPropType) {

    const {
        fh
    } = props

    return (
        <>
            <Form name='changeResetPassword' formHandlers={fh.formHandlers}>
                <Wrapper>
                    <TextInput
                        label={changeResetPasswordFormMessages.tokenField}
                        name='token'
                        value={fh.fields.token.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        error={fh.fields.token.data.error}
                        disabled={fh.fields.token.data.disabled}
                        autoFocus
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <TextInput
                        label={changeResetPasswordFormMessages.passwordField}
                        name='password'
                        type='password'
                        value={fh.fields.password.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        autocomplete='new-password'
                        error={fh.fields.password.data.error}
                        disabled={fh.fields.password.data.disabled}
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <TextInput
                        label={ changeResetPasswordFormMessages.passwordConfirmField }
                        name='passwordConfirm'
                        type='password'
                        value={fh.fields.passwordConfirm.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        autocomplete='new-password'
                        error={fh.fields.passwordConfirm.data.error}
                        disabled={fh.fields.passwordConfirm.data.disabled}
                    />
                </Wrapper>
                <Wrapper t={20} align={'right'}>
                    <Button
                        text={changeResetPasswordFormMessages.submitBtnText}
                        name='submit'
                        type='submit'
                        disabled={fh.fields.submit.data.disabled}
                        loading={fh.fields.submit.data.loading}
                    />
                </Wrapper>
            </Form>
        </>
    )
}*/


/** Сообщение об изменённом пароле */
/*function PasswordChangedMessage() {
    return (
        <Notice>
            {changeResetPasswordFormJSXMessages.passwordChanged}
        </Notice>
    )
}*/
