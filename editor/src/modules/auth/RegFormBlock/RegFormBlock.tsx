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
import messagesWithJSX from '../messagesWithJSX'
import getFormConfig from './formResources'
import { getMenuItems } from '../menuItems'
import useFormHandler from 'libs/formHandler/useFormHandler'
import CommonError from '../CommonError/CommonError'
import FHTypes from 'libs/formHandler/types'


/** Форма входа в сервис */
export default function RegFormBlock() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // FormHandler
    const fh = useFormHandler(getFormConfig(lang), 'reg')

    // Показывать или сообщение об успешной регистрации или форму
    const content = fh.form.letterWasSentTo
        ? <LetterWasSent email={fh.form.letterWasSentTo} />
        : <ThisForm fh={fh} />

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems(lang)}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={messages.RegForm.formHeader[lang]} type='h1' relativeSize={1}/>
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
            <Form name='reg' formHandlers={fh.formHandlers}>
                <Wrapper>
                    <TextInput
                        label={ messages.RegForm.emailField[lang] }
                        name='email'
                        relativeSize={2}
                        value={fh.fields.email.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        autocomplete='username'
                        placeholder={messages.RegForm.emailPlaceholder[lang]}
                        error={fh.fields.email.data.error}
                        disabled={fh.fields.email.data.disabled}
                        autoFocus
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <TextInput
                        label={ messages.RegForm.passwordField[lang] }
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
                        label={ messages.RegForm.passwordConfirmField[lang] }
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
                        type='submit'
                        text={messages.RegForm.submitBtnText[lang]}
                        name='submit'
                        relativeSize={1}
                        disabled={fh.fields.submit.data.disabled}
                        loading={fh.fields.submit.data.loading}
                    />
                </Wrapper>
                <CommonError error={fh.form.commonError} />
            </Form>

            <Wrapper t={30}>
                {/*@ts-ignore*/}
                <Notice>{messagesWithJSX.RegForm.legal[lang]}</Notice>
            </Wrapper>
            <Wrapper t={30}>
                {/*@ts-ignore*/}
                <Notice>{messagesWithJSX.RegForm.doYouHaveAccount[lang]}</Notice>
            </Wrapper>
        </>
    )
}


type LetterWasSentPropType = {
    email: string // Почта пользователя, которую нужно подтвердить
}

/** Сообщение с просьбой подтвердить почту перед входом в редактор */
function LetterWasSent(props: LetterWasSentPropType) {

    const {
        email
    } = props

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    return (
        <>
            <Notice>
                {/*@ts-ignore*/}
                {messagesWithJSX.RegForm.confirmRegistrationLetter(email)[lang]}
            </Notice>
        </>
    )
}
