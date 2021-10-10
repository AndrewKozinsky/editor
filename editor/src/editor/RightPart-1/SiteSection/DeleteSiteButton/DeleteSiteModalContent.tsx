import React from 'react'
import { useDispatch } from 'react-redux'
import Wrapper from 'common/Wrapper/Wrapper'
import Hr from 'common/misc/Hr/Hr'
import Button from 'common/formElements/Button/Button'
import { siteSectionMessages } from 'messages/siteSectionMessages'
import useGetMessages from 'messages/fn/useGetMessages'
import {useGetCloseModal, useGetDeleteSite} from './DeleteSiteButton-func'


/** Содержимое модального окна с вопросом удалить ли сайт и кнопками отмены и удаления */
export function ModalContent() {
    const dispatch = useDispatch()

    // Сообщения формы
    const siteSectionMsg = useGetMessages(siteSectionMessages)

    // Обработчики нажатия на кнопки закрытия окна и удаления сайта
    const closeModal = useGetCloseModal()
    const deleteSite = useGetDeleteSite()

    return (
        <>
            <p>{siteSectionMsg.deleteSiteConfirmationTextInModal}</p>
            <Wrapper t={10}>
                <Hr/>
            </Wrapper>
            <Wrapper t={10} align='right' gap={10}>
                <Button
                    text={siteSectionMsg.closeDeleteSiteModalBtn}
                    onClick={closeModal}
                />
                <Button
                    text={siteSectionMsg.deleteSiteBtnInModal}
                    color='accent'
                    onClick={deleteSite}
                />
            </Wrapper>
        </>
    )
}
