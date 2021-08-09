import React from 'react'
//@ts-ignore
import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import { userDataSectionMessages } from 'src/messages/userDataSectionMessages'
import { changeEmailRequest } from 'src/requests/user/changeEmailRequest'
import store from 'store/store'
import actions from 'store/rootAction'
import { smoothMoveToEntrance } from 'entrance/EntrancePages/EntrancePages-func'


const submitBtnFormConfig: FCType.Config = {
    bottom: {
        submit: {
            text: userDataSectionMessages.changeBtn,
            block: true,
            align: 'center',
            color: 'accent'
        },
    },
    async requestFn(readyFieldValues, outerFns) {
        return await changeEmailRequest(outerFns.newEmail)
    },
    afterSubmit(response, outerFns) {
        if (response.status === 'success') {
            setTimeout(function () {
                // Закрыть модальное окно
                store.dispatch(actions.modal.closeModal())
            }, 6000)

            setTimeout(function () {
                // Выкинуть пользователя из редактора
                store.dispatch(actions.user.setAuthTokenStatus(1))
            }, 7000)

            setTimeout(function () {
                smoothMoveToEntrance()
            }, 8000)
        }
    },
    showCommonSuccess: true,
    commonSuccess: userDataSectionMessages.emailSuccessfullyChanged
}


export default submitBtnFormConfig