import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import actions from 'store/rootAction'
import { AppState } from 'store/rootReducer'
import Wrapper from 'common/Wrapper/Wrapper'
import Button from 'common/formElements/Button/Button'
import Hr from 'common/misc/Hr/Hr'
import messages from '../messages'
import {useChangeEmail } from 'requests/authRequests'


/**
 * Хук регулирует показ модального окно подтверждения показа почты и изменяет почту на переданную
 * @param {Object} fh — объект отдаваемый FormHandler-ом.
 */
export default function useHandleConfirmChangingEmailModal(fh: any) {
    const dispatch = useDispatch()

    // Открыто ли модальное окно
    const isOpen = useSelector((store: AppState) => store.modal.isOpen)

    // Должно ли быть открыто модальное окно подтверждения изменения почты
    const [isModalOpen, setIsModalOpen] = useState(false)
    // Должно ли быть показано сообщение об успешном изменении почты
    const [isSuccessMessageOpen, setIsSuccessMessageOpen] = useState(false)

    // Если форму можно отправлять
    useEffect(function () {
        if (fh.form.formIsValid) {
            setIsModalOpen(true)
        }
    }, [fh.form.formIsValid])


    // Следить за моментом когда был запрос на открытие окна
    useEffect(function () {
        if (isModalOpen) {
            // Открыть окно подтверждения изменения почтового адреса
            dispatch(actions.modal.openModal(
                <ModalContent
                    newEmail={fh.fields.email.value[0]}
                    setIsSuccessMessageOpen={setIsSuccessMessageOpen}
                />
                )
            )
        }

        // Если модальное окно закрыли, то и тут поменять статус
        // потому что без этого я не смогу его открыть более одного раза
        if (!isOpen) setIsModalOpen(false)
    }, [isModalOpen])

    return {
        isSuccessMessageOpen
    }
}


type ModalContentPropType = {
    newEmail: string
    setIsSuccessMessageOpen: (isSuccessMessageOpen: boolean) => void
}

function ModalContent(props: ModalContentPropType) {
    const {
        newEmail,
        setIsSuccessMessageOpen
    } = props

    const dispatch = useDispatch()

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Запрос на изменение почты
    const { response, doFetch } = useChangeEmail(newEmail)

    useEffect(function () {
        // Ничего не делать если почта пока не изменена
        if (!response || response.status !== 'success') return

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())

        setTimeout(function () {
            // Поставить сообщение, что почта изменена
            setIsSuccessMessageOpen(true)
        }, 500)

        setTimeout(function () {
            // Поставить authTokenStatus в 1 чтобы выкинуть пользователя из редактора
            dispatch(actions.user.setAuthTokenStatus(1))
        }, 8000)
    }, [response])

    return (
        <>
            <p>{messages.UserDataSection.confirmModalText[lang]}</p>
            <Wrapper t={10} align='right'>
                <Hr />
            </Wrapper>
            <Wrapper t={10} align='right' gap={10}>
                <Button text={messages.UserDataSection.cancelBtn[lang]} />
                <Button
                    text={messages.UserDataSection.changeBtn[lang]}
                    color='accent'
                    onClick={doFetch}
                />
            </Wrapper>
        </>
    )
}