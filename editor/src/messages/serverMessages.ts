import { getMessagesObject } from 'messages/fn/getMessagesObject'

// Сообщения не привязанные к конкретному месту
const obj = {
    user_getTokenData_tokenIsNotPassed: {
        eng: 'Token was not passed or it is wrong.',
        rus: 'Токен не был передан в запросе.'
    },
    user_createUser_alreadyRegistered: {
        eng: 'The user with this email is signed up already.',
        rus: 'Пользователь с такой почтой уже зарегистрирован.'
    },
    user_login_userDoesNotExist: {
        eng: 'User is not exist or password is wrong.',
        rus: 'Пользователь не зарегистрирован или передан неправильный пароль.'
    },
    user_login_userDoesNotConfirmEmail: {
        eng: 'You must confirm your email. A confirmation link was sent to your email when you registered.',
        rus: 'Вы должны подтвердить свою почту. Ссылка на подтверждение была отправлена на почту при регистрации.'
    },
    user_CreateUserDto_emailTooLong: {
        eng: 'The string must not be longer than 100 characters.',
        rus: 'Строка не должна быть длиннее 100 символов.'
    },
    user_CreateUserDto_itIsNotEmail: {
        eng: 'It is not look like email.',
        rus: 'Это не похоже на почту.'
    },
    user_CreateUserDto_EmptyEmail: {
        eng: 'You must specify the email.',
        rus: 'Почта должна быть указана.'
    },
    user_CreateUserDto_passwordIsOutOfRange: {
        eng: 'Password must be 5 to 20 characters long.',
        rus: 'Пароль должен быть длиной от 5 до 20 символов.'
    },
    user_CreateUserDto_passwordIsEmpty: {
        eng: 'You must specify the password.',
        rus: 'Пароль должен быть указан.'
    },
}

export const serverMessages = getMessagesObject(obj)
