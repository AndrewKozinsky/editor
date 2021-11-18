import React from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import NameSection from '../../wrappers/NameSection/NameSection'
import UserDataForm from '../EmailForm/form/EmailForm'
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm'
import UserAccountForm from '../UserAccountForm/UserAccountForm'
import useGetMessages from 'messages/fn/useGetMessages'
import { userDataSectionMessages } from 'messages/userDataSectionMessages'
import { changePasswordSectionMessages } from 'messages/changePasswordSectionMessages'
import {userAccountSectionMessages} from 'messages/userAccountSectionMessages'


export default function SettingsUserTabContent() {

    const userDataSectionMsg = useGetMessages(userDataSectionMessages)
    const changePasswordSectionMsg = useGetMessages(changePasswordSectionMessages)
    const userAccountSectionMsg = useGetMessages(userAccountSectionMessages)

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
