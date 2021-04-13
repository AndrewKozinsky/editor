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
            eng: <>Can't remember your password? <Link to='/reset-password'>Reset it</Link>.</>,
            rus: <>Не помните пароль? <Link to='/reset-password'>Сбросьте</Link>.</>
        },
        confirmRegistrationLetter: (email: string) => {
            const domain = 'https://' + getDomainFromEmail(email)

            return {
                eng: <><a href={domain}>An email</a> was sent earlier with a link to confirm your mailing address. Without email confirmation the service will not work.</>,
                rus: <>Ранее было выслано <a href={domain}>письмо со ссылкой</a> для подтверждения почтового адреса. Без подтверждения почты сервис работать не будет.</>
            }
        },
    }
}

export default messagesWithJSX