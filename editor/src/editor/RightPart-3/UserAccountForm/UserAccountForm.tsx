import React from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import Button from 'common/formElements/Button/Button'
import { userAccountSectionMessages } from 'messages/userAccountSectionMessages'
import useGetLogOut from './logOut'
import useGetShowModal from 'utils/hooksUtils'
import { ModalContent } from './deleteAccount'


export default function UserAccountForm() {

    // Хук возвращает функцию открывающую модальное окно
    // с подтверждением удаления учётной записи пользователя
    const deleteAccount = useGetShowModal(<ModalContent />)
    // Хук возвращает функцию выводящую пользователя из учётной записи
    const logOut = useGetLogOut()


    return (
        <Wrapper gap={10}>
            <Button
                text={userAccountSectionMessages.deleteBtn}
                icon='btnSignTrash'
                onClick={deleteAccount}
            />
            <Button
                text={userAccountSectionMessages.logOutBtn}
                icon='btnSignExit'
                onClick={logOut}
            />
        </Wrapper>
    )
}
