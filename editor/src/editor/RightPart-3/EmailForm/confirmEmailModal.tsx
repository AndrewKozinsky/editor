import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import actions from 'store/rootAction'
import { AppState } from 'store/rootReducer'
import Wrapper from 'common/Wrapper/Wrapper'
import Button from 'common/formElements/Button/Button'
import Hr from 'common/misc/Hr/Hr'
import messages from '../messages'
import {useGetUserToken} from '../../../requests/authRequests';


export default function useHandleConfirmChangingEmailModal() {
    const dispatch = useDispatch()

    // Открыто ли модальное окно
    const isOpen = useSelector((store: AppState) => store.modal.isOpen)

    // Должно ли быть открыто модальное окно подтверждения изменения почты
    const [isModalOpen, setIsModalOpen] = useState(false)
    // Должно ли быть показано сообщение об успешном изменении почты
    const [isSuccessMessageOpen, setIsSuccessMessageOpen] = useState(false)

    // Следить за моментом когда был запрос на открытие окна
    useEffect(function () {
        if (isModalOpen) {
            // Открыть окно
            dispatch(actions.modal.openModal(<ModalContent />))
        }

        // Если модальное окно закрыли, то и тут поменять статус
        // потому что без этого я не смогу его открыть более одного раза
        if (!isOpen) setIsModalOpen(false)
    }, [isModalOpen])

    return {
        setIsModalOpen,
        isSuccessMessageOpen
    }
}


function ModalContent() {
    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Токен пользователя и функция для его запроса
    const { userToken, doFetch } = useGetUserToken()

    return (
        <>
            <p>{messages.UserDataSection.confirmModalText[lang]}</p>
            <Wrapper t={10} align='right'>
                <Hr />
            </Wrapper>
            <Wrapper t={10} align='right' gap={10}>
                <Button text={messages.UserDataSection.cancelBtn[lang]} />
                <Button text={messages.UserDataSection.changeBtn[lang]} color='accent' />
            </Wrapper>
        </>
    )
}