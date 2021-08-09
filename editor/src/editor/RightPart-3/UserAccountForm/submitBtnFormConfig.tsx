import React from 'react'
//@ts-ignore
import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import { userDataSectionMessages } from 'src/messages/userDataSectionMessages'
import { changeEmailRequest } from 'src/requests/user/changeEmailRequest'
import store from 'store/store'
import actions from 'store/rootAction'
import { smoothMoveToEntrance } from 'entrance/EntrancePages/EntrancePages-func'
import { userAccountSectionMessages } from 'messages/userAccountSectionMessages'
import regRequest from '../../../requests/user/deleteAccountRequest'


const submitBtnFormConfig: FCType.Config = {
    bottom: {
        submit: {
            text: userAccountSectionMessages.deleteBtn,
            block: true,
            align: 'center',
            color: 'accent'
        },
    },
    async requestFn(readyFieldValues, outerFns) {
        return await regRequest()
    },
    afterSubmit(response, outerFns) {
        if (response.status === 'success') {
            // Закрыть модальное окно
            store.dispatch(actions.modal.closeModal())

            // Удалить куку авторизации
            document.cookie = 'authToken=logout; max-age=0'

            setTimeout(function () {
                // Smooth hide the editor and show entrance forms wrapper
                smoothMoveToEntrance()

                setTimeout(function() {
                    // Поставить authTokenStatus в 1 чтобы выкинуть пользователя из редактора
                    store.dispatch(actions.user.setAuthTokenStatus(1))
                }, 600)
            }, 1000)
        }
    },
    showCommonSuccess: true,
    commonSuccess: userDataSectionMessages.emailSuccessfullyChanged
}


export default submitBtnFormConfig


// Запрос на удаление пользователя
// const {response: deleteResponse, doFetch: deleteUser} = useDeleteAccount()