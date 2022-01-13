import getMsgProxy from './fn/msgProxy'

// Форма ConfirmEmailFormBlock
const confirmEmailMessages = {
    formHeader: {
        eng: 'Email confirm',
        rus: 'Подтверждение почты'
    },
    tokenField: {
        eng: 'Token',
        rus: 'Токен'
    },
    submitBtnText: {
        eng: 'Confirm email',
        rus: 'Подтвердить почту'
    },
}

const confirmEmailMsg = getMsgProxy<typeof confirmEmailMessages>(confirmEmailMessages)
export default confirmEmailMsg