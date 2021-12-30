import React from 'react';
import Header from 'common/textBlocks/Header/Header';
import Menu from 'common/misc/Menu/Menu';
import Wrapper from 'common/Wrapper/Wrapper';
import Notice from 'common/textBlocks/Notice/Notice';
import { getMenuItems } from '../menuItems';
import { regFormMessages } from 'messages/regFormMessages';
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState';
import FormConstructor from 'libs/FormConstructor/FormConstructor';
import useGetMessages from 'messages/fn/useGetMessages';
import getConfig from './formConfig';
import { commonMessages } from 'messages/commonMessages';
import { regMenuMessages } from 'messages/regMenuMessages';
/** User Sign up form */
export default function RegFormBlock() {
    // Объекты с текстами интерфейса
    const commonMsg = useGetMessages(commonMessages);
    const regFormMsg = useGetMessages(regFormMessages);
    const regMenuMsg = useGetMessages(regMenuMessages);
    const config = getConfig(commonMsg, regFormMsg);
    const formState = useFormConstructorState(config);
    return (React.createElement("div", null, React.createElement(Wrapper, { b: 25 }, React.createElement(Menu, { items: getMenuItems(regMenuMsg) })), React.createElement(Wrapper, { b: 10 }, React.createElement(Header, { text: regFormMsg.formHeader, type: 'h1' })), React.createElement(FormConstructor, { config: config, state: formState }), React.createElement(Info, { hide: formState.formSentSuccessfully })));
}
// Сообщение со ссылками на документы с правилами использования сервиса и ссылкой на страницу входа.
function Info(props) {
    const regFormMsg = useGetMessages(regFormMessages);
    if (props.hide)
        return null;
    return (React.createElement(React.Fragment, null, React.createElement(Wrapper, { t: 20 }, React.createElement(Notice, null, regFormMsg.legal)), React.createElement(Wrapper, { t: 20 }, React.createElement(Notice, null, regFormMsg.doYouHaveAccount))));
}
//# sourceMappingURL=RegFormBlock.js.map
//# sourceMappingURL=RegFormBlock.js.map
//# sourceMappingURL=RegFormBlock.js.map