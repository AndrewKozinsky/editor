import React, { ReactElement } from 'react'
// @ts-ignore
import { Link } from 'react-router-dom'
import { getDomainFromEmail } from '../../utils/StringUtils'


type messagesWithJSXType = {
    [key: string]: {
        [key: string]: ObjectValueType | MethodValueType
    }
}

type ObjectValueType = { eng: ReactElement, rus: ReactElement }
type MethodValueType = (...args: any[]) => ObjectValueType


const messagesWithJSX: messagesWithJSXType = {

    // Форма вход пользователя (EnterFormBlock)
    EnterForm: {
        newUser: {
            eng: <>New User? <Link to='/reg'>Sign up</Link>.</>,
            rus: <>Новый пользователь? <Link to='/reg'>Зарегистрируйтесь</Link>.</>
        },
        forgotPassword: {
            eng: <>Can't remember your password? <Link to='reset-password'>Reset it</Link>.</>,
            rus: <>Не помните пароль? <Link to='reset-password'>Сбросьте</Link>.</>
        },
        confirmRegistrationLetter: (email: string) => {
            const domain = 'https://' + getDomainFromEmail(email)

            return {
                eng: <><a href={domain}>An email</a> was sent earlier with a link to confirm your mailing address. Without email confirmation the service will not work.</>,
                rus: <>Ранее было выслано <a href={domain}>письмо со ссылкой</a> для подтверждения почтового адреса. Без подтверждения почты сервис работать не будет.</>
            }
        },
    },
    // Форма RegFormBlock
    RegForm: {
        confirmRegistrationLetter: (email: string) => {
            const domain = 'https://' + getDomainFromEmail(email)

            return {
                eng: <>An email with a link to confirm your mailing address was sent to the specified <a href={domain}>email address</a>. Click on it to activate your account.</>,
                rus: <>На указанную <a href={domain}>почту</a> выслано письмо со ссылкой для подтверждения почтового адреса. Перейдите по ней чтобы активировать учётную запись.</>
            }
        },
        doYouHaveAccount: {
            eng: <>Already have an account? <Link to='/enter'>Sign in</Link>.</>,
            rus: <>Уже есть учётная запись? <Link to='/enter'>Войдите</Link>.</>
        },
        legal: {
            eng: <>By registering on this site I accept <a href='https://google.com' target='_blank'>the terms of use</a> and consent to the newsletter, the <a href='https://google.com' target='_blank'>processing of personal data</a> and agree to <a href='https://google.com' target='_blank'>the privacy policy</a>.</>,
            rus: <>Регистрируясь на этом сайте я принимаю <a href='https://google.com' target='_blank'>условия использования</a> и даю согласие на рассылку, <a href='https://google.com' target='_blank'>обработку персональных данных</a> и соглашаюсь c <a href='https://google.com' target='_blank'>политикой конфиденциальности</a>.</>
        },
    },
    // Форма ResetFormBlock
    ResetForm: {
        retypePasswordLetter: (email: string) => {
            const domain = 'https://' + getDomainFromEmail(email)

            return {
                eng: <>An <a href={domain}>email</a> was sent to you with a link to reset your password.</>,
                rus: <>На <a href={domain}>почту</a> выслано письмо со ссылкой на страницу сброса пароля.</>
            }
        },
    },
    // Форма ChangeResetPasswordFormBlock
    ChangeResetPasswordForm: {
        passwordChanged: {
            eng: <>Password has been changed. Log in to <Link to='/'>the editor</Link>.</>,
            rus: <>Пароль изменён. Войти <Link to='/'>в редактор</Link>.</>
        },
    }
}

export default messagesWithJSX