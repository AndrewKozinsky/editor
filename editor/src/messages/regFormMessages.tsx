import React from 'react'
//@ts-ignore
import { getDomainFromEmail } from 'utils/StringUtils'
//@ts-ignore
import { Link } from 'react-router-dom'
import {
    getMessagesJSXFnObject,
    getMessagesJSXObject,
    getMessagesObject
} from 'messages/fn/getMessagesObject'
//@ts-ignore
import disclaimerPdfLink from 'modules/auth/RegFormBlock/docs/Disclaimer.pdf'
//@ts-ignore
import policyOnPersonalDataProcessingPdfLink from 'modules/auth/RegFormBlock/docs/Policy_on_personal_data_processing.pdf'
//@ts-ignore
import consentToTheNewsletterPdfLink from 'modules/auth/RegFormBlock/docs/Consent_to_the_newsletter.pdf'



// Форма RegFormBlock
const obj = {
    // Заголовок формы регистрации
    formHeader: {
        eng: 'Sign up',
        rus: 'Регистрация'
    },
    emailField: {
        eng: 'E-mail *',
        rus: 'Электронная почта *'
    },
    /*emailErrInvalid: {
        eng: 'Invalid email address',
        rus: 'Почта написана неправильно'
    },*/
    passwordField: {
        eng: 'Password *',
        rus: 'Пароль *'
    },
    passwordConfirmField: {
        eng: 'Repeat password *',
        rus: 'Повторите пароль *'
    },
    passwordsMustMatch: {
        eng: 'Passwords must match',
        rus: 'Пароли должны совпадать'
    },
    submitBtnText: {
        eng: 'Sign up',
        rus: 'Зарегистрироваться'
    },
    /*somethingWentWrong: {
        eng: 'Something went wrong',
        rus: 'Произошла непредвиденная ошибка. Регистрация не выполнена.'
    },*/
}

export const regFormMessages = getMessagesObject(obj)


// Форма RegFormBlock
const JSXObj = {
    doYouHaveAccount: {
        eng: <>Already have an account? <Link to='/enter'>Log in</Link>.</>,
        rus: <>Уже есть учётная запись? <Link to='/enter'>Войдите</Link>.</>
    },
    legal: {
        eng: <>By registering on this site, you acknowledge acceptance of <a href={disclaimerPdfLink} target='_blank'>the terms of the disclaimer</a>, <a href={policyOnPersonalDataProcessingPdfLink} target='_blank'>personal data processing policy</a>, and <a href={consentToTheNewsletterPdfLink} target='_blank'>consent to the mailing list</a>.</>,
        rus: <>Регистрируясь на этом сайте вы подтверждаете принятие условий <a href={disclaimerPdfLink} target='_blank'>отказа от ответственности</a>, <a href={policyOnPersonalDataProcessingPdfLink} target='_blank'>политики в отношении обработки персональных данных</a> и <a href={consentToTheNewsletterPdfLink} target='_blank'>согласие с рассылкой</a>.</>
    },
}

export const regFormJSXMessages = getMessagesJSXObject(JSXObj)


// Форма RegFormBlock
const JSXFnObj = {
    confirmRegistrationLetter: (email: string) => {
        const domain = 'https://' + getDomainFromEmail(email)

        return {
            eng: <>An email with a link to confirm your mailing address was sent to the specified <a href={domain}>email address</a>. Click on it to activate your account.</>,
            rus: <>На указанную <a href={domain}>почту</a> выслано письмо со ссылкой для подтверждения почтового адреса. Перейдите по ней чтобы активировать учётную запись.</>
        }
    },
}

export const regFormJSXFnMessages = getMessagesJSXFnObject(JSXFnObj)