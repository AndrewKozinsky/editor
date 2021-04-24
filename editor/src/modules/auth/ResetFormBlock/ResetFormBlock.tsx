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
export default function ResetFormBlock() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // FormHandler
    const fh = useFormHandler(getFormConfig(lang), 'reset')

    // Показывать или сообщением подтвердить почту или форму
    const content = fh.form.emailWasSent
        ? <EmailWasSentMessage email={fh.form.emailWasSent} />
        : <ThisForm fh={fh} />

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems(lang)}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={messages.ResetForm.formHeader[lang]} type='h1' relativeSize={1}/>
            </Wrapper>
            {content}
        </div>
    )
}


type ThisFormPropType = {
    fh?: FHTypes.ReturnObj // Видно ли сообщение
}

/** Форма входа пользователя */
function ThisForm(props: ThisFormPropType) {

    const {
        fh
    } = props

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    return (
        <>
            <Form name='reset' formHandlers={fh.formHandlers}>
                <Wrapper>
                    <TextInput
                        label={ messages.ResetForm.emailField[lang] }
                        name='email'
                        relativeSize={2}
                        value={fh.fields.email.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        autocomplete='email'
                        placeholder={messages.Common.emailPlaceholder[lang]}
                        error={fh.fields.email.data.error}
                        disabled={fh.fields.email.data.disabled}
                        autoFocus
                    />
                </Wrapper>
                <Wrapper t={20} align={'right'}>
                    <Button
                        type='submit'
                        text={messages.ResetForm.submitBtnText[lang]}
                        name='submit'
                        relativeSize={1}
                        disabled={fh.fields.submit.data.disabled}
                        loading={fh.fields.submit.data.loading}
                    />
                </Wrapper>
                <CommonError error={fh.form.commonError} />
            </Form>
        </>
    )
}


type EmailWasSentMessagePropType = {
    email: string // Почта пользователя, которую нужно подтвердить
}

/** Сообщение с просьбой перейти к письму и нажать на ссылку для ввода нового пароля */
function EmailWasSentMessage(props: EmailWasSentMessagePropType) {

    const {
        email
    } = props

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    return (
        <>
            <Notice>
                {/*@ts-ignore*/}
                {messagesWithJSX.ResetForm.retypePasswordLetter(email)[lang]}
            </Notice>
        </>
    )
}
