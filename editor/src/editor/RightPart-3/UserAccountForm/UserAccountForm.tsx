import React from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import Button from 'common/formElements/Button/Button'
import userAccountSectionMsg from 'messages/userAccountSectionMessages'
import useGetLogOut from './logOut'
import useGetShowModal from 'utils/hooksUtils'
import DeleteAccountModalContent from './deleteAccount'


/* Кнопки выхода и удаления учётной записи */
export default function UserAccountForm() {
    // Хук возвращает функцию открывающую модальное окно
    // с подтверждением удаления учётной записи пользователя
    const deleteAccount = useGetShowModal(<DeleteAccountModalContent />)
    // Хук возвращает функцию выводящую пользователя из учётной записи
    const logOut = useGetLogOut()

    return (
        <Wrapper gap={10}>
            <Button
                text={userAccountSectionMsg.deleteBtn}
                icon='btnSignTrash'
                onClick={deleteAccount}
            />
            <Button
                text={userAccountSectionMsg.logOutBtn}
                icon='btnSignExit'
                onClick={logOut}
            />
        </Wrapper>
    )
}
