import getMsgProxy from './fn/msgProxy'

const regMenuMessages = {
    // Пункт «Регистрация»
    reg: {
        eng: 'Sign up',
        rus: 'Регистрация'
    },
    // Пункт «Вход»
    enter: {
        eng: 'Log in',
        rus: 'Вход'
    },
    // Пункт «Сброс пароля»
    reset: {
        eng: 'Reset password',
        rus: 'Сброс пароля'
    }
}

const regMenuMsg = getMsgProxy<typeof regMenuMessages>(regMenuMessages)
export default regMenuMsg