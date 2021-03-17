import React from 'react'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import Header from 'modules/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Button from 'common/formElements/Button/Button'
import Wrapper from 'common/Wrapper/Wrapper'
import TextInput from 'common/formElements/TextInput/TextInput'
import messages from '../messages'
import messagesWithJSX from '../messagesWithJSX'
import Notice from 'common/Notice/Notice'
// @ts-ignore
import {Formik, FormikHelpers, FormikProps, Form, Field, FieldProps, useFormik,} from 'formik'
import {initialValues, validateForm, onFormSubmit, formValuesType} from './js/formResources'
// import { GetFormikFormFuncType } from 'types/formikTypes'
// Удали если не потребуется
// import '../AuthFormStyles/AuthFormStyles.scss'


/** Форма входа в сервис */
function EnterFormBlock() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateForm(lang),
        onSubmit: onFormSubmit,
        isInitialValid: false,
    })
    console.log(formik)

    return (
        <div>
            <Wrapper b={25}>
                <Menu/>
            </Wrapper>
            <Wrapper b={10}>
                <Header text={messages.enterForm.formHeader[lang]} type='h1'/>
            </Wrapper>

            <form onSubmit={formik.handleSubmit}>
                <Wrapper>
                    <TextInput
                        label={messages.enterForm.emailField[lang]}
                        type='email'
                        name="email"
                        value={formik.values.email}
                        autocomplete={'username'}
                        size='middle'
                        placeholder={messages.enterForm.emailPlaceholder[lang]}
                        autoFocus
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.email}
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <TextInput
                        label={messages.enterForm.passwordField[lang]}
                        type='password'
                        name="password"
                        value={formik.values.password}
                        autocomplete={'current-password'}
                        size='middle'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.password}
                    />
                </Wrapper>
                <Wrapper t={20} align={'right'}>
                    <Button
                        type='submit'
                        text={messages.enterForm.submitBtnText[lang]}
                        isDisabled={true}
                    />
                </Wrapper>
            </form>

            <Wrapper t={30}>
                <Notice>{messagesWithJSX.enterForm.newUser[lang]}</Notice>
            </Wrapper>
            <Wrapper t={10}>
                <Notice>{messagesWithJSX.enterForm.forgotPassword[lang]}</Notice>
            </Wrapper>
        </div>
    )
}

export default EnterFormBlock