import React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import disclaimerPdfLink from 'entrance/RegFormBlock/docs/Disclaimer.pdf';
// @ts-ignore
import policyOnPersonalDataProcessingPdfLink from 'entrance/RegFormBlock/docs/Policy_on_personal_data_processing.pdf';
// @ts-ignore
import consentToTheNewsletterPdfLink from 'entrance/RegFormBlock/docs/Consent_to_the_newsletter.pdf';
// Форма RegFormBlock
export const regFormMessages = {
    // Заголовок формы регистрации
    formHeader: {
        eng: 'Sign up',
        rus: 'Регистрация'
    },
    emailField: {
        eng: 'E-mail *',
        rus: 'Электронная почта *'
    },
    emailErrInvalid: {
        eng: 'Invalid email address',
        rus: 'Почта написана неправильно'
    },
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
    confirmRegistrationLetter: {
        eng: 'An email with a link to confirm your mailing address was sent to the specified email address. Click on it to activate your account.',
        rus: 'На указанную почту выслано письмо со ссылкой для подтверждения почтового адреса. Перейдите по ней чтобы активировать учётную запись.'
    },
    doYouHaveAccount: {
        eng: React.createElement(React.Fragment, null, "Already have an account? ", React.createElement(Link, { to: '/enter' }, "Log in"), "."),
        rus: React.createElement(React.Fragment, null, "\u0423\u0436\u0435 \u0435\u0441\u0442\u044C \u0443\u0447\u0451\u0442\u043D\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C? ", React.createElement(Link, { to: '/enter' }, "\u0412\u043E\u0439\u0434\u0438\u0442\u0435"), ".")
    },
    legal: {
        eng: React.createElement(React.Fragment, null, "By registering on this site, you acknowledge acceptance of ", React.createElement("a", { href: disclaimerPdfLink, target: '_blank' }, "the terms of the disclaimer"), ", ", React.createElement("a", { href: policyOnPersonalDataProcessingPdfLink, target: '_blank' }, "personal data processing policy"), ", and ", React.createElement("a", { href: consentToTheNewsletterPdfLink, target: '_blank' }, "consent to the mailing list"), "."),
        rus: React.createElement(React.Fragment, null, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u044F\u0441\u044C \u043D\u0430 \u044D\u0442\u043E\u043C \u0441\u0430\u0439\u0442\u0435 \u0432\u044B \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0435\u0442\u0435 \u043F\u0440\u0438\u043D\u044F\u0442\u0438\u0435 \u0443\u0441\u043B\u043E\u0432\u0438\u0439 ", React.createElement("a", { href: disclaimerPdfLink, target: '_blank' }, "\u043E\u0442\u043A\u0430\u0437\u0430 \u043E\u0442 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438"), ", ", React.createElement("a", { href: policyOnPersonalDataProcessingPdfLink, target: '_blank' }, "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0438 \u0432 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445"), " \u0438 ", React.createElement("a", { href: consentToTheNewsletterPdfLink, target: '_blank' }, "\u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u0441 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u043E\u0439"), ".")
    },
};
//# sourceMappingURL=regFormMessages.js.map
//# sourceMappingURL=regFormMessages.js.map