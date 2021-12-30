import React from 'react';
import { Link } from 'react-router-dom';
// Форма EnterFormBlock
export const enterFormMessages = {
    // Заголовок формы входа
    formHeader: {
        eng: 'Log in',
        rus: 'Вход'
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
    submitBtnText: {
        eng: 'Log in',
        rus: 'Войти'
    },
    sendAnotherLetter: {
        eng: 'Send another letter',
        rus: 'Отправить письмо еще раз'
    },
    /*sentWrongData: {
        eng: 'Incorrect email or password',
        rus: 'Неправильная почта и пароль.'
    },*/
    failedToSendAnotherConfirmationLetter: {
        eng: 'Failed to send another email with a mail confirmation link. Try again after a while.',
        rus: 'Не удалось отправить еще одно письмо со ссылкой на подтверждение почты. Попробуйте еще раз через некоторое время.'
    },
    confirmationLetterWasSent: {
        eng: 'An email has been sent to you with a link to confirm your email. Confirm your email and then log in again.',
        rus: 'На вашу почту отправлено письмо со ссылкой на подтверждение почты. Подтвердите почту и затем зайдите в систему еще раз.'
    },
    confirmRegistrationLetter: {
        eng: 'An email was sent earlier with a link to confirm your mailing address. Without email confirmation the service will not work.',
        rus: 'Ранее было выслано письмо со ссылкой для подтверждения почтового адреса. Без подтверждения почты сервис работать не будет.'
    },
    newUser: {
        eng: React.createElement(React.Fragment, null, "New User? ", React.createElement(Link, { to: '/reg' }, "Sign up"), "."),
        rus: React.createElement(React.Fragment, null, "\u041D\u043E\u0432\u044B\u0439 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C? ", React.createElement(Link, { to: '/reg' }, "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044C"), ".")
    },
    forgotPassword: {
        eng: React.createElement(React.Fragment, null, "Can't remember your password? ", React.createElement(Link, { to: 'reset-password' }, "Reset it"), "."),
        rus: React.createElement(React.Fragment, null, "\u041D\u0435 \u043F\u043E\u043C\u043D\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C? ", React.createElement(Link, { to: 'reset-password' }, "\u0421\u0431\u0440\u043E\u0441\u044C\u0442\u0435"), ".")
    }
};
//# sourceMappingURL=enterFormMessages.js.map
//# sourceMappingURL=enterFormMessages.js.map
//# sourceMappingURL=enterFormMessages.js.map