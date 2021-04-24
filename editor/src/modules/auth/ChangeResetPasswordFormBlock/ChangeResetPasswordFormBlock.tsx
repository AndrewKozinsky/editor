import React from 'react'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Button from 'common/formElements/Button/Button'
import Form from 'common/formElements/Form/Form'
import Wrapper from 'common/Wrapper/Wrapper'
import TextInput from 'common/formElements/TextInput/TextInput'
import Notice from 'common/Notice/Notice'
import messages from '../messages'
import getFormConfig from './formResources'
import { getMenuItems } from '../menuItems'
import useFormHandler from 'libs/formHandler/useFormHandler'
import CommonError from '../CommonError/CommonError'
import FHTypes from 'libs/formHandler/types'
import messagesWithJSX from '../messagesWithJSX'


/** Форма входа в сервис */
export default function ChangeResetPasswordFormBlock() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // FormHandler
    const fh = useFormHandler(getFormConfig(lang), 'changeResetPassword')

    // Показывать или сообщением что пароль изменён или форму
    const content = fh.form.passwordHasChangedMessage
        ? <PasswordChangedMessage />
        : <ThisForm fh={fh} />

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems(lang)}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={messages.ChangeResetPasswordForm.formHeader[lang]} type='h1' relativeSize={1}/>
            </Wrapper>
            {content}
        </div>
    )
}


type ThisFormPropType = {
    fh?: FHTypes.ReturnObj // Видно ли сообщение
}

/** Форма ввода нового пароля пользователя */
function ThisForm(props: ThisFormPropType) {

    const {
        fh
    } = props

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    return (
        <>
            <Form name='changeResetPassword' formHandlers={fh.formHandlers}>
                <Wrapper>
                    <TextInput
                        label={ messages.ChangeResetPasswordForm.tokenField[lang] }
                        name='token'
                        relativeSize={2}
                        value={fh.fields.token.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        error={fh.fields.token.data.error}
                        disabled={fh.fields.token.data.disabled}
                        autoFocus
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <TextInput
                        label={ messages.ChangeResetPasswordForm.passwordField[lang] }
                        name='password'
                        relativeSize={2}
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
                        label={ messages.ChangeResetPasswordForm.passwordConfirmField[lang] }
                        name='passwordConfirm'
                        relativeSize={2}
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
                        text={messages.ChangeResetPasswordForm.submitBtnText[lang]}
                        name='submit'
                        relativeSize={1}
                        type='submit'
                        disabled={fh.fields.submit.data.disabled}
                        loading={fh.fields.submit.data.loading}
                    />
                </Wrapper>
            </Form>
        </>
    )
}



/** Сообщение об изменённом пароле */
function PasswordChangedMessage() {
    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    return (
        <Notice>
            {/*@ts-ignore*/}
            {messagesWithJSX.ChangeResetPasswordForm.passwordChanged[lang]}
        </Notice>
    )
}
