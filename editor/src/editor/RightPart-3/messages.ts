
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
            eng: 'Change email',
            rus: 'Изменить почту'
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
        cancelBtn: {
            eng: 'Cancel',
            rus: 'Отменить'
        },
        changeBtn: {
            eng: 'Delete',
            rus: 'Удалить'
        },
    },
    // Секция «Учетная запись»
    UserAccountSection: {
        header: {
            eng: 'User account',
            rus: 'Учетная запись'
        },
        cancelBtn: {
            eng: 'Cancel',
            rus: 'Отменить'
        },
        deleteBtn: {
            eng: 'Delete',
            rus: 'Удалить'
        },
        logOutBtn: {
            eng: 'Log Out',
            rus: 'Выйти'
        },
        confirmModalText: {
            eng: 'If you delete your account, all articles created in the editor will also be deleted. Articles on your site will not be affected. Delete this account?',
            rus: 'С удалением учётной записи будут удалены и все статьи созданные в редакторе. Статьи на вашем сайте затронуты не будут. Удалить учётную запись?'
        },
    },
    Common: {
        requiredField: {
            eng: 'Required field',
            rus: 'Обязательное поле'
        },
        passwordToShort: {
            eng: 'Must be 6 characters or more',
            rus: 'Минимально нужно ввести 6 символов'
        },
        passwordToLong: {
            eng: 'Must be 50 characters or less',
            rus: 'Максимум можно ввести 50 символов'
        },
    }
}

export default messages