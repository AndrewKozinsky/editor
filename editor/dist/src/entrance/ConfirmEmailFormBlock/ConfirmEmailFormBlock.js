import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from 'common/textBlocks/Header/Header';
import Menu from 'common/misc/Menu/Menu';
import Wrapper from 'common/Wrapper/Wrapper';
import { getMenuItems } from '../menuItems';
import getConfig from './formConfig';
import FormConstructor from 'libs/FormConstructor/FormConstructor';
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState';
import useGetMessages from 'messages/fn/useGetMessages';
import { regMenuMessages } from 'messages/regMenuMessages';
import { confirmEmailMessages } from 'messages/confirmEmailMessages';
import { commonMessages } from 'messages/commonMessages';
/** Форма подтверждения почты */
export default function ConfirmEmailFormBlock() {
    const history = useHistory();
    const commonMsg = useGetMessages(commonMessages);
    const confirmEmailMsg = useGetMessages(confirmEmailMessages);
    const regMenuMsg = useGetMessages(regMenuMessages);
    const config = getConfig(commonMsg, confirmEmailMsg);
    const formState = useFormConstructorState(config, { history });
    return (React.createElement("div", null,
        React.createElement(Wrapper, { b: 25 },
            React.createElement(Menu, { items: getMenuItems(regMenuMsg) })),
        React.createElement(Wrapper, { b: 10 },
            React.createElement(Header, { text: confirmEmailMsg.formHeader, type: 'h1' })),
        React.createElement(FormConstructor, { config: config, state: formState })));
}
//# sourceMappingURL=ConfirmEmailFormBlock.js.map