import React from 'react';
import { Link } from 'react-router-dom';
// Тексты страницы Not Found
export const notFoundMessages = {
    header: {
        eng: 'Page not found',
        rus: 'Страница не найдена'
    },
    p1: {
        eng: React.createElement(React.Fragment, null,
            "If you think this page should be, write about the problem to ",
            React.createElement("a", { href: 'mailto:andkozinsky@gmail.com' }, "andkozinsky@gmail.com"),
            "."),
        rus: React.createElement(React.Fragment, null,
            "\u0415\u0441\u043B\u0438 \u0432\u044B \u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0435, \u0447\u0442\u043E \u044D\u0442\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C, \u0442\u043E \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043E \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0435 \u043D\u0430  ",
            React.createElement("a", { href: 'mailto:andkozinsky@gmail.com' }, "andkozinsky@gmail.com"),
            ".")
    },
    p2: {
        eng: React.createElement(React.Fragment, null,
            "Or go to ",
            React.createElement(Link, { to: '/' }, "the editor page"),
            "."),
        rus: React.createElement(React.Fragment, null,
            "\u0418\u043B\u0438 \u043F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u043D\u0430 ",
            React.createElement(Link, { to: '/' }, "\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0430"),
            ".")
    },
};
//# sourceMappingURL=notFoundMessages.js.map