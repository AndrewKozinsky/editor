import React from 'react';
import useMakeClasses from './EntrancePages-classes';
import { useIsComponentVisible } from './EntrancePages-func';
import { Switch, Route } from 'react-router-dom';
import EnterFormBlock from 'entrance/EnterFormBlock/EnterFormBlock';
import AuthFormWrapper from 'entrance/AuthFormWrapper/AuthFormWrapper';
import RegFormBlock from 'entrance/RegFormBlock/RegFormBlock';
import ConfirmEmailFormBlock from 'entrance/ConfirmEmailFormBlock/ConfirmEmailFormBlock';
import ResetFormBlock from 'entrance/ResetFormBlock/ResetFormBlock';
import ChangeResetPasswordFormBlock from 'entrance/ChangeResetPasswordFormBlock/ChangeResetPasswordFormBlock';
import { useViewStateChanger } from './EntrancePages-func';
/** Обёртка для страниц входа */
export default function EntrancePages() {
    // Переставлять свойство entryAndEditorViewState в зависимости от текущей страницы
    useViewStateChanger();
    // Классы компонента
    const CN = useMakeClasses();
    // Компонент видим?
    if (!useIsComponentVisible())
        return null;
    return (React.createElement("div", { className: CN.root }, React.createElement(AuthFormWrapper, null, React.createElement(Switch, null, React.createElement(Route, { path: '/reg' }, React.createElement(RegFormBlock, null)), React.createElement(Route, { path: '/confirm-email' }, React.createElement(ConfirmEmailFormBlock, null)), React.createElement(Route, { path: '/reset-password' }, React.createElement(ResetFormBlock, null)), React.createElement(Route, { path: '/change-reset-password' }, React.createElement(ChangeResetPasswordFormBlock, null)), React.createElement(Route, { path: '*' }, React.createElement(EnterFormBlock, null))))));
}
//# sourceMappingURL=EntrancePages.js.map
//# sourceMappingURL=EntrancePages.js.map