import getMsgProxy from './fn/msgProxy'

// Секция «Изменение пароля»
const changePasswordSectionMessages = {
    header: {
        eng: 'Change password',
        rus: 'Изменение пароля'
    },
    currentPasswordField: {
        eng: 'Current password',
        rus: 'Текущий пароль'
    },
    newPasswordField: {
        eng: 'New password',
        rus: 'Новый пароль'
    },
    newPasswordAgainField: {
        eng: 'Retype new password',
        rus: 'Повторите новый пароль'
    },
    submitBtnText: {
        eng: 'Change password',
        rus: 'Изменить пароль'
    },
    passwordsMustMatch: {
        eng: 'Passwords must match',
        rus: 'Пароли должны совпадать'
    },
    passwordHasChanged: {
        eng: 'Password has changed.',
        rus: 'Пароль изменён.'
    },
}

const changePasswordSectionMsg = getMsgProxy<typeof changePasswordSectionMessages>(changePasswordSectionMessages)
export default changePasswordSectionMsg