import React from 'react';
import Wrapper from 'common/Wrapper/Wrapper';
import NameSection from 'editor/wrappers/NameSection/NameSection';
import UserDataForm from '../EmailForm/form/EmailForm';
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm';
import UserAccountForm from '../UserAccountForm/UserAccountForm';
import useGetMessages from 'messages/fn/useGetMessages';
import { userDataSectionMessages } from 'messages/userDataSectionMessages';
import { changePasswordSectionMessages } from 'messages/changePasswordSectionMessages';
import { userAccountSectionMessages } from 'messages/userAccountSectionMessages';
/* Вкладка с настройками пользователя */
export default function SettingsUserTabContent() {
    const userDataSectionMsg = useGetMessages(userDataSectionMessages);
    const changePasswordSectionMsg = useGetMessages(changePasswordSectionMessages);
    const userAccountSectionMsg = useGetMessages(userAccountSectionMessages);
    return (React.createElement("div", null, React.createElement(Wrapper, null, React.createElement(NameSection, { header: userDataSectionMsg.header, type: 2 }, React.createElement(UserDataForm, null))), React.createElement(Wrapper, { t: 25 }, React.createElement(NameSection, { header: changePasswordSectionMsg.header, type: 2 }, React.createElement(ChangePasswordForm, null))), React.createElement(Wrapper, { t: 25 }, React.createElement(NameSection, { header: userAccountSectionMsg.header, type: 2 }, React.createElement(UserAccountForm, null)))));
}
//# sourceMappingURL=SettingsUserTabContent.js.map
//# sourceMappingURL=SettingsUserTabContent.js.map
//# sourceMappingURL=SettingsUserTabContent.js.map