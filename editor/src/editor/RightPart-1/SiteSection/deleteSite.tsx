// import React, {useEffect, useState} from 'react'
// import {useDispatch, useSelector} from 'react-redux'
// import {AppState} from 'store/rootReducer'
// import actions from 'store/rootAction'
// import store from 'store/store'
// import messages from '../messages';
// import {useDeleteSite} from 'requests/authRequests'
// import Wrapper from 'common/Wrapper/Wrapper'
// import Hr from 'common/misc/Hr/Hr'
// import Button from 'common/formElements/Button/Button'



/** Содержимое модального окна */
/*export function ModalContent() {
    const dispatch = useDispatch()

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Запрос на удаление пользователя
    const {response: deleteResponse, doFetch: deleteSite} = useDeleteSite()

    useEffect(function () {
        // Ничего не делать если статус не равен success
        if (!deleteResponse || deleteResponse.status !== 'success') return

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())

        // Скачать новый список сайтов и поставить в Хранилище
        store.dispatch(actions.sites.requestSites())

        // Обнулить id выбранного сайта
        store.dispatch(actions.sites.setCurrentSiteId(null))
    }, [deleteSite])

    return (
        <>
            <p>{messages.SiteSection.deleteSiteConfirmationTextInModal[lang]}</p>
            <Wrapper t={10}>
                <Hr/>
            </Wrapper>
            <Wrapper t={10} align='right' gap={10}>
                <Button
                    text={messages.SiteSection.closeDeleteSiteModalBtn[lang]}
                    onClick={() => dispatch(actions.modal.closeModal())}
                />
                <Button
                    text={messages.SiteSection.deleteSiteBtnInModal[lang]}
                    color='accent'
                    onClick={deleteSite}
                />
            </Wrapper>
        </>
    )
}*/
