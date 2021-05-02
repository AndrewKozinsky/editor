import {useDispatch, useSelector} from 'react-redux'
import React, {useEffect, useState} from 'react'
import {AppState} from 'store/rootReducer'
import actions from 'store/rootAction'
import {useDeleteAccount} from 'requests/authRequests'
import messages from '../messages'
import Wrapper from 'common/Wrapper/Wrapper'
import Hr from 'common/misc/Hr/Hr'
import Button from 'common/formElements/Button/Button'


// Хук возвращает функцию удаляющая учётную запись пользователя
export default function useGetDeleteAccount() {
    const dispatch = useDispatch()

    // Открыто ли модальное окно
    const isOpen = useSelector((store: AppState) => store.modal.isOpen)

    // Должно ли быть открыто модальное окно подтверждения изменения почты
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Следить за моментом когда был запрос на открытие окна
    useEffect(function () {
        if (isModalOpen) {
            // Открыть окно подтверждения изменения почтового адреса
            dispatch(actions.modal.openModal(
                <ModalContent />
            ))
        }

        // Если модальное окно закрыли, то и тут поменять статус
        // потому что без этого я не смогу его открыть более одного раза
        if (!isOpen && isModalOpen) setIsModalOpen(false)
    }, [isModalOpen])

    return () => setIsModalOpen(true)
}


function ModalContent() {
    const dispatch = useDispatch()

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Запрос на удаление учётной записи
    const {response, doFetch} = useDeleteAccount()

    useEffect(function () {
        // Ничего не делать если статус не равен success
        if (!response || response.status !== 'success') return

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())

        // Удалить куку авторизации
        document.cookie = 'authToken=logout; max-age=0'

        setTimeout(function () {
            // Поставить authTokenStatus в 1 чтобы выкинуть пользователя из редактора
            dispatch(actions.user.setAuthTokenStatus(1))
        }, 1000)
    }, [response])

    return (
        <>
            <p>{messages.UserAccountSection.confirmModalText[lang]}</p>
            <Wrapper t={10} align='right'>
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
                    onClick={doFetch}
                />
            </Wrapper>
        </>
    )
}
