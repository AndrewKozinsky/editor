import { smoothMoveToEntrance } from 'entrance/EntrancePages/EntrancePages-func'
import FCType from 'libs/FormConstructor/FCType'
import { changeEmailRequest } from 'requests/user/changeEmailRequest'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import userDataSectionMsg from 'messages/userDataSectionMessages'


function getSubmitBtnFormConfig(): FCType.Config {
    return {
        bottom: {
            submit: {
                text: userDataSectionMsg.changeBtn,
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
                    store.dispatch(actions.user.setUserData('fail', null))
                }, 7000)

                setTimeout(function () {
                    smoothMoveToEntrance()
                }, 8000)
            }
        },
        showCommonSuccess: true,
        commonSuccess: userDataSectionMsg.emailSuccessfullyChanged
    }
}


export default getSubmitBtnFormConfig