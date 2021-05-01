
type messagesType = {
    [key: string]: {
        [key: string]: {
            [key: string]: string
        }
    }
}

const messages: messagesType = {
    // Содержимое вкладки «Пользователь»
    UserTabContent: {
        header: {
            eng: 'User',
            rus: 'Пользователь'
        },
    },
    // Секция «Данные пользователя»
    UserDataSection: {
        header: {
            eng: 'User data',
            rus: 'Данные пользователя'
        },
        emailField: {
            eng: 'E-mail',
            rus: 'Почта'
        },
        emailPlaceholder: {
            eng: 'For example: john_smith@gmail.com',
            rus: 'Например: smirnov@gmail.com'
        },
        submitBtnText: {
            eng: 'Change',
            rus: 'Изменить'
        },
        requiredField: {
            eng: 'Required field',
            rus: 'Обязательное поле'
        },
        emailErrInvalid: {
            eng: 'Invalid email address',
            rus: 'Почта написана неправильно'
        },
        newEmailEqualToOldOne: {
            eng: 'This is the current mailing address. You must enter a different one to change it.',
            rus: 'Это текущий почтовый адрес. Для изменения нужно ввести другой.'
        },
        emailHasChanged: {
            eng: 'Your email has been successfully changed. A confirmation link has been sent to your email. Click on it to confirm your email.',
            rus: 'Почта успешно изменена. На вашу почту отправлена ссылка на подтверждение. Перейдите по ней чтобы подтвердить почту.'
        },
        confirmModalText: {
            eng: 'Once you have changed your email, you will need to confirm it. Without it, you won\'t be able to log in to your account. Change your email address?',
            rus: 'После изменения почты вам нужно будет её подтвердить. Без этого вы не сможете зайти в свою учётную запись. Изменить почтовый адрес?'
        },
        cancelBtn: {
            eng: 'Cancel',
            rus: 'Отменить'
        },
        changeBtn: {
            eng: 'Change',
            rus: 'Изменить'
        },
    },
    // Секция «Изменение пароля»
    ChangePasswordSection: {
        header: {
            eng: 'Change password',
            rus: 'Изменение пароля'
        },
    },
    // Секция «Учетная запись»
    UserAccountSection: {
        header: {
            eng: 'User account',
            rus: 'Учетная запись'
        },
    }
}

export default messages