import React from 'react'
import {useSelector} from 'react-redux'
import Wrapper from 'common/Wrapper/Wrapper'
import Button from 'common/formElements/Button/Button'
import messages from '../messages'
import {AppState} from 'store/rootReducer'
import useGetDeleteAccount from './deleteAccount'
import useGetLogOut from './logOut'


export default function UserAccountForm() {
    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Хук возвращает функцию открывающую модальное окно
    // с подтверждением удаления учётной записи пользователя
    const deleteAccount = useGetDeleteAccount()
    // Хук возвращает функцию выводящую пользователя из учётной записи
    const logOut = useGetLogOut()


    return (
        <Wrapper gap={10}>
            <Button
                text={messages.UserAccountSection.deleteBtn[lang]}
                icon='btnSignTrash'
                onClick={deleteAccount}
            />
            <Button
                text={messages.UserAccountSection.logOutBtn[lang]}
                icon='btnSignExit'
                onClick={logOut}
            />
        </Wrapper>
    )
}