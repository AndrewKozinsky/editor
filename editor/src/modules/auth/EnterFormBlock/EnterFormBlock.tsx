import React from 'react'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import Header from 'modules/textBlocks/Header/Header'
import Menu from 'common/misc/Menu/Menu'
import Button from 'common/formElements/Button/Button'
import Wrapper from 'common/Wrapper/Wrapper'
import TextInput from 'common/formElements/TextInput/TextInput'
import Select from 'common/formElements/Select/Select'
import Notice from 'common/Notice/Notice'
import { OptionsType } from 'common/formElements/Select/SelectTypes'
import Checkbox from 'common/formElements/Checkbox/Checkbox'
import messages from '../messages'
import messagesWithJSX from '../messagesWithJSX'
// @ts-ignore
import { useFormik } from 'formik'
import {initialValues, validateForm, onFormSubmit, formValuesType} from './js/formResources'
// Удали если не потребуется
// import '../AuthFormStyles/AuthFormStyles.scss'


/** Форма входа в сервис */
function EnterFormBlock() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateForm(lang),
        validateOnBlur: false,
        onSubmit: onFormSubmit
    })

    const optionsSet: OptionsType = [
        { value: 'Выберите героя', disabled: true },
        { value: 'Чебурашка' },
        { value: 'Крокодил Гена' },
        { value: 'Шапокляк' },
        { value: 'Крыса Лариса' }
    ]

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
                        // type='email'
                        name="email"
                        value={formik.values.email}
                        autocomplete={'username'}
                        size='small'
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
                        // type='password'
                        name="password"
                        value={formik.values.password}
                        autocomplete={'current-password'}
                        size='middle'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.password}
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <TextInput
                        label={messages.enterForm.passwordField[lang]}
                        // type='password'
                        name="password"
                        value={formik.values.password}
                        autocomplete={'current-password'}
                        size='big'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.password}
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <Select
                        label='Герои'
                        name='heroes'
                        value={formik.values.password}
                        options={optionsSet}
                        size='small'
                        onChange={formik.handleChange}
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <Select
                        name="heroes"
                        value={formik.values.password}
                        options={optionsSet}
                        size='middle'
                        onChange={formik.handleChange}
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <Select
                        name="heroes"
                        value={formik.values.password}
                        options={optionsSet}
                        size='big'
                        onChange={formik.handleChange}
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <Checkbox
                        label='1'
                        name="numberOfGuests"
                        value={11}
                        onChange={formik.handleChange}
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <Checkbox
                        label='2'
                        name="numberOfGuests"
                        value={22}
                        size='middle'
                        onChange={formik.handleChange}
                    />
                </Wrapper>
                <Wrapper t={15}>
                    <Checkbox
                        label='3'
                        name="numberOfGuests"
                        value={33}
                        size='big'
                        onChange={formik.handleChange}
                    />
                </Wrapper>
                <Wrapper t={15}>
                    Переключатели
                </Wrapper>
                <Wrapper t={20} align={'right'}>
                    <Button
                        type='submit'
                        text={messages.enterForm.submitBtnText[lang]}
                    />
                </Wrapper>
                <Wrapper t={10}>
                    <Button size={'tiny'} text='Hello, Dolly' />
                </Wrapper>
                <Wrapper t={10}>
                    <Button size={'small'} text='Hello, Dolly' />
                </Wrapper>
                <Wrapper t={10}>
                    <Button size={'middle'} text='Hello, Dolly' />
                </Wrapper>
                <Wrapper t={10}>
                    <Button size={'big'} text='Hello, Dolly' />
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