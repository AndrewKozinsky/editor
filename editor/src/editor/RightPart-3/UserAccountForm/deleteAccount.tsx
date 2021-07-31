// import React, { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import actions from 'store/rootAction'
// import Wrapper from 'common/Wrapper/Wrapper'
// import Hr from 'common/misc/Hr/Hr'
// import Button from 'common/formElements/Button/Button'
// import { userAccountSectionMessages } from 'messages/userAccountSectionMessages'
// import { useDeleteAccount } from 'requests/user/deleteAccountRequest'


/*export function ModalContent() {
    const dispatch = useDispatch()

    // Запрос на удаление пользователя
    const {response: deleteResponse, doFetch: deleteUser} = useDeleteAccount()

    useEffect(function () {
        // Ничего не делать если статус не равен success
        if (!deleteResponse || deleteResponse.status !== 'success') return

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())

        // Удалить куку авторизации
        document.cookie = 'authToken=logout; max-age=0'

        setTimeout(function () {
            // Smooth hide the editor and show entrance forms wrapper
            smoothMoveToEntrance()

            setTimeout(function() {
                // Поставить authTokenStatus в 1 чтобы выкинуть пользователя из редактора
                dispatch(actions.user.setAuthTokenStatus(1))
            }, 600)
        }, 1000)
    }, [deleteUser])

    return (
        <>
            <p>{userAccountSectionMessages.confirmModalText}</p>
            <Wrapper t={10}>
                <Hr/>
            </Wrapper>
            <Wrapper t={10} align='right' gap={10}>
                <Button
                    text={userAccountSectionMessages.cancelBtn}
                    onClick={() => dispatch(actions.modal.closeModal())}
                />
                <Button
                    text={userAccountSectionMessages.deleteBtn}
                    color='accent'
                    onClick={deleteUser}
                />
            </Wrapper>
        </>
    )
}*/
