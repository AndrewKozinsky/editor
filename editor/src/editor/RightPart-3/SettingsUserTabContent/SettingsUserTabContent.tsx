import React from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import NameSection from 'editor/wrappers/NameSection/NameSection'
import userDataSectionMsg from 'messages/userDataSectionMessages'
import changePasswordSectionMsg from 'messages/changePasswordSectionMessages'
import userAccountSectionMsg from 'messages/userAccountSectionMessages'
import UserDataForm from '../EmailForm/form/EmailForm'
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm'
import UserAccountForm from '../UserAccountForm/UserAccountForm'

/* Вкладка с настройками пользователя */
export default function SettingsUserTabContent() {
    return (
        <div>
            <Wrapper>
                <NameSection header={userDataSectionMsg.header} type={2}>
                    <UserDataForm />
                </NameSection>
            </Wrapper>

            <Wrapper t={25}>
                <NameSection header={changePasswordSectionMsg.header} type={2}>
                    <ChangePasswordForm />
                </NameSection>
            </Wrapper>

            <Wrapper t={25}>
                <NameSection header={userAccountSectionMsg.header} type={2}>
                    <UserAccountForm />
                </NameSection>
            </Wrapper>
        </div>
    )
}
