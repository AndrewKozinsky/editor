import React from 'react'
import { useSelector } from 'react-redux'
import Header from 'src/common/textBlocks/Header/Header'
import Wrapper from 'src/common/Wrapper/Wrapper'
import { AppState } from 'src/store/rootReducer'
import NameSection from '../../wrappers/NameSection/NameSection';
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm'
import messages from '../messages'
import UserDataForm from '../EmailForm/EmailForm'
import UserAccountForm from '../UserAccountForm/UserAccountForm';


export default function SettingsUserTabContent() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    return (
        <div>
            <Header text={messages.UserTabContent.header[lang]} type='h2' />

            <Wrapper t={10}>
                <NameSection header={messages.UserDataSection.header[lang]} type={2}>
                    <UserDataForm />
                </NameSection>
            </Wrapper>

            <Wrapper t={30}>
                <NameSection header={messages.ChangePasswordSection.header[lang]} type={2}>
                    <ChangePasswordForm />
                </NameSection>
            </Wrapper>

            <Wrapper t={30}>
                <NameSection header={messages.UserAccountSection.header[lang]} type={2}>
                    <UserAccountForm />
                </NameSection>
            </Wrapper>
        </div>
    )
}
