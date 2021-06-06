import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from 'src/store/rootReducer'
import actions from 'src/store/rootAction'
import messages from '../messages'
import {useDeleteIncFilesTemplate} from 'src/requests/authRequests'
import Wrapper from 'src/common/Wrapper/Wrapper'
import Hr from 'src/common/misc/Hr/Hr'
import Button from 'src/common/formElements/Button/Button'
import store from 'src/store/store'


export function ModalContent() {
    const dispatch = useDispatch()

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Запрос на удаление пользователя
    const {response: deleteResponse, doFetch: deleteTemplate} = useDeleteIncFilesTemplate()

    useEffect(function () {
        // Ничего не делать если статус не равен success
        if (!deleteResponse || deleteResponse.status !== 'success') return

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())

        // Скачать новый список шаблонов и поставить в Хранилище
        store.dispatch(actions.sites.requestIncFilesTemplates())

        // Обнулить id выбранного шаблона
        store.dispatch(actions.sites.setCurrentIncFilesTemplateId(null))
    }, [deleteTemplate])

    return (
        <>
            <p>{messages.IncFilesTemplateSection.deletePluginConfirmationTextInModal[lang]}</p>
            <Wrapper>
                <Hr/>
            </Wrapper>
            <Wrapper t={10} align='right' gap={10}>
                <Button
                    text={messages.IncFilesTemplateSection.closeDeletePluginModalBtn[lang]}
                    onClick={() => dispatch(actions.modal.closeModal())}
                />
                <Button
                    text={messages.IncFilesTemplateSection.deletePluginBtnInModal[lang]}
                    color='accent'
                    onClick={deleteTemplate}
                />
            </Wrapper>
        </>
    )
}
