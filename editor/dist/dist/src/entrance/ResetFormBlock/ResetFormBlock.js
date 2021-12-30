import React from 'react';
import Header from 'common/textBlocks/Header/Header';
import Menu from 'common/misc/Menu/Menu';
import Wrapper from 'common/Wrapper/Wrapper';
import { getMenuItems } from '../menuItems';
import FormConstructor from 'libs/FormConstructor/FormConstructor';
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState';
import getConfig from './formConfig';
import useGetMessages from 'messages/fn/useGetMessages';
import { regMenuMessages } from 'messages/regMenuMessages';
import { resetFormMessages } from 'messages/resetFormMessages';
import { commonMessages } from 'messages/commonMessages';
/** Форма сброса пароля */
export default function ResetFormBlock() {
    const commonMsg = useGetMessages(commonMessages);
    const resetFormMsg = useGetMessages(resetFormMessages);
    const regMenuMsg = useGetMessages(regMenuMessages);
    const config = getConfig(commonMsg, resetFormMsg);
    const formState = useFormConstructorState(config);
    return (React.createElement("div", null, React.createElement(Wrapper, { b: 25 }, React.createElement(Menu, { items: getMenuItems(regMenuMsg) })), React.createElement(Wrapper, { b: 10 }, React.createElement(Header, { text: resetFormMsg.formHeader, type: 'h1' })), React.createElement(FormConstructor, { config: config, state: formState })));
}
//# sourceMappingURL=ResetFormBlock.js.map
//# sourceMappingURL=ResetFormBlock.js.map