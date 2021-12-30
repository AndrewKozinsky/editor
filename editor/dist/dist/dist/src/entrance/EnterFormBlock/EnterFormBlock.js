import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from 'common/textBlocks/Header/Header';
import Menu from 'common/misc/Menu/Menu';
import Button from 'common/formElements/Button/Button';
import Wrapper from 'common/Wrapper/Wrapper';
import { getMenuItems } from '../menuItems';
import FormConstructor from 'libs/FormConstructor/FormConstructor';
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState';
import getConfig from './formConfig';
import Notice from 'common/textBlocks/Notice/Notice';
import { useGetSendConfirmLetter } from 'requests/user/sendConfirmLetterRequest';
import useGetMessages from 'messages/fn/useGetMessages';
import { regMenuMessages } from 'messages/regMenuMessages';
import { enterFormMessages } from 'messages/enterFormMessages';
import { commonMessages } from 'messages/commonMessages';
/** Форма входа в сервис */
export default function EnterFormBlock() {
    const history = useHistory();
    const commonMsg = useGetMessages(commonMessages);
    const enterFormMsg = useGetMessages(enterFormMessages);
    const regMenuMsg = useGetMessages(regMenuMessages);
    const config = getConfig(commonMsg, enterFormMsg);
    const [showConfirmEmailMessage, setShowConfirmEmailMessage] = useState(false);
    const formState = useFormConstructorState(config, { history, setShowConfirmEmailMessage });
    return (React.createElement("div", null, React.createElement(Wrapper, { b: 25 }, React.createElement(Menu, { items: getMenuItems(regMenuMsg) })), React.createElement(Wrapper, { b: 10 }, React.createElement(Header, { text: enterFormMsg.formHeader, type: 'h1' })), React.createElement(FormConstructor, { config: config, state: formState }), showConfirmEmailMessage && React.createElement(ConfirmLetterMessage, { email: formState.fields.email.value[0] })));
}
/** Сообщение с просьбой подтвердить почту перед входом в редактор */
function ConfirmLetterMessage(props) {
    const { email } = props;
    const enterFormMsg = useGetMessages(enterFormMessages);
    // Обработчик щелчка по кнопке
    const { isLoading, success, error, doFetch } = useGetSendConfirmLetter(email);
    return (React.createElement(React.Fragment, null, React.createElement(Notice, { icon: 'error', bg: true }, React.createElement("p", null, enterFormMsg.confirmRegistrationLetter), React.createElement(Wrapper, { t: 10, b: 5 }, React.createElement(Button, { text: enterFormMsg.sendAnotherLetter, loading: isLoading, onClick: doFetch }))), error && React.createElement(Wrapper, { t: 10 }, React.createElement(Notice, { icon: 'error', bg: true }, enterFormMsg.failedToSendAnotherConfirmationLetter)), success && React.createElement(Wrapper, { t: 10 }, React.createElement(Notice, { icon: 'success', bg: true }, enterFormMsg.confirmationLetterWasSent))));
}
//# sourceMappingURL=EnterFormBlock.js.map
//# sourceMappingURL=EnterFormBlock.js.map
//# sourceMappingURL=EnterFormBlock.js.map