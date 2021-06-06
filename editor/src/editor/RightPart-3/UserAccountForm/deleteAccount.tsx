import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import actions from 'store/rootAction'
import {useDeleteAccount} from 'requests/authRequests'
import messages from '../messages'
import Wrapper from 'common/Wrapper/Wrapper'
import Hr from 'common/misc/Hr/Hr'
import Button from 'common/formElements/Button/Button'


export function ModalContent() {
    const dispatch = useDispatch()

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

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
            // Поставить authTokenStatus в 1 чтобы выкинуть пользователя из редактора
            dispatch(actions.user.setAuthTokenStatus(1))
        }, 1000)
    }, [deleteUser])

    return (
        <>
            <p>{messages.UserAccountSection.confirmModalText[lang]}</p>
            <Wrapper t={10}>
                <Hr/>
            </Wrapper>
            <Wrapper t={10} align='right' gap={10}>
                <Button
                    text={messages.UserAccountSection.cancelBtn[lang]}
                    onClick={() => dispatch(actions.modal.closeModal())}
                />
                <Button
                    text={messages.UserAccountSection.deleteBtn[lang]}
                    color='accent'
                    onClick={deleteUser}
                />
            </Wrapper>
        </>
    )
}
