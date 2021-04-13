import React from 'react'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import Header from 'common/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Button from 'common/formElements/Button/Button'
import Wrapper from 'common/Wrapper/Wrapper'
import TextInput from 'common/formElements/TextInput/TextInput'
import Notice from 'common/Notice/Notice'
import messages from '../messages'
import messagesWithJSX from '../messagesWithJSX'
import getFormConfig from './formResources'
import { getMenuItems } from '../menuItems'
import useFormHandler from 'libs/formHandler/useFormHandler'
import CommonError from '../CommonError/CommonError'
import FHTypes from '../../../libs/formHandler/types'


/** Форма входа в сервис */
export default function EnterFormBlock() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // FormHandler
    const fh = useFormHandler(getFormConfig(lang), 'enter')

    // Показывать или сообщением подтвердить почту или форму
    const content = fh.form.showConfirmLetter
        ? <ConfirmLetterMessage visible email={fh.form.confirmEmail} />
        : <Form fh={fh} />

    return (
        <div>
            <Wrapper b={25}>
                <Menu items={getMenuItems(lang)}/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={messages.EnterForm.formHeader[lang]} type='h1' relativeSize={1}/>
            </Wrapper>
            {content}
        </div>
    )
}


type FormPropType = {
    fh?: FHTypes.ReturnObj // Видно ли сообщение
}

/** Форма входа пользователя */
function Form(props: FormPropType) {

    const {
        fh
    } = props
    // console.log(fh.form.isFormValid)

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    return (
        <>
            <form name='enter' {...fh.formHandlers} method='POST'>
                <Wrapper>
                    <TextInput
                        label={ messages.EnterForm.emailField[lang] }
                        name='email'
                        relativeSize={2}
                        value={fh.fields.email.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        autocomplete='username'
                        placeholder={messages.EnterForm.emailPlaceholder[lang]}
                        error={fh.fields.email.data.error}
                        autoFocus
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <TextInput
                        label={ messages.EnterForm.passwordField[lang] }
                        name='password'
                        relativeSize={2}
                        type='password'
                        value={fh.fields.password.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        autocomplete='current-password'
                        error={fh.fields.password.data.error}
                    />
                </Wrapper>
                <Wrapper t={20} align={'right'}>
                    <Button
                        type='submit'
                        text={messages.EnterForm.submitBtnText[lang]}
                        name='submit'
                        relativeSize={1}
                        disabled={!fh.form.isFormValid}
                    />
                </Wrapper>
                <CommonError error={fh.form.commonError} />
            </form>

            <Wrapper t={30}>
                {/*@ts-ignore*/}
                <Notice>{messagesWithJSX.EnterForm.newUser[lang]}</Notice>
            </Wrapper>
            <Wrapper t={10}>
                {/*@ts-ignore*/}
                <Notice>{messagesWithJSX.EnterForm.forgotPassword[lang]}</Notice>
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
        visible = false,
        email
    } = props

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    if (!visible) return null

    return (
        <>
            <Notice>
                {/*@ts-ignore*/}
                {messagesWithJSX.EnterForm.confirmRegistrationLetter(email)[lang]}
            </Notice>
            <Wrapper t={10}>
                <Button
                    text={messages.EnterForm.sendAnotherLetter[lang]}
                />
            </Wrapper>
        </>
    )
}