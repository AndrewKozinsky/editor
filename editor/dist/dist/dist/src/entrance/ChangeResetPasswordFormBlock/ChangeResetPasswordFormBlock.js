import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Header from 'common/textBlocks/Header/Header';
import Menu from 'common/misc/Menu/Menu';
import Wrapper from 'common/Wrapper/Wrapper';
import { getMenuItems } from '../menuItems';
import FormConstructor from 'libs/FormConstructor/FormConstructor';
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState';
import Notice from 'common/textBlocks/Notice/Notice';
import Button from 'common/formElements/Button/Button';
import { smoothMoveToEditor } from '../EntrancePages/EntrancePages-func';
import getConfig from './formConfig';
import { changeResetPasswordFormMessages } from 'messages/changeResetPasswordFormMessages';
import { commonMessages } from 'messages/commonMessages';
import useGetMessages from 'messages/fn/useGetMessages';
import { regMenuMessages } from 'messages/regMenuMessages';
/** Форма входа в сервис */
export default function ChangeResetPasswordFormBlock() {
    const commonMsg = useGetMessages(commonMessages);
    const changeResetPasswordFormMsg = useGetMessages(changeResetPasswordFormMessages);
    const regMenuMsg = useGetMessages(regMenuMessages);
    const config = getConfig(commonMsg, changeResetPasswordFormMsg);
    const formState = useFormConstructorState(config, changeResetPasswordFormMsg);
    return (React.createElement("div", null, React.createElement(Wrapper, { b: 25 }, React.createElement(Menu, { items: getMenuItems(regMenuMsg) })), React.createElement(Wrapper, { b: 10 }, React.createElement(Header, { text: changeResetPasswordFormMsg.formHeader, type: 'h1' })), React.createElement(FormConstructor, { config: config, state: formState }), formState.formSentSuccessfully && React.createElement(PasswordChangedMessage, null)));
}
/** Сообщение об изменённом пароле */
function PasswordChangedMessage() {
    let history = useHistory();
    const changeResetPasswordFormMsg = useGetMessages(changeResetPasswordFormMessages);
    const switchToEditor = useCallback(function () {
        // Smooth hide entrance forms wrapper and show the editor
        smoothMoveToEditor();
        setTimeout(function () {
            history.push('/');
        }, 600);
    }, []);
    return (React.createElement(Notice, { bg: true, icon: 'success' }, React.createElement("p", null, changeResetPasswordFormMsg.passwordChanged), React.createElement(Wrapper, { t: 10 }, React.createElement(Button, { text: changeResetPasswordFormMsg.toEditor, onClick: switchToEditor }))));
}
//# sourceMappingURL=ChangeResetPasswordFormBlock.js.map
//# sourceMappingURL=ChangeResetPasswordFormBlock.js.map
//# sourceMappingURL=ChangeResetPasswordFormBlock.js.map