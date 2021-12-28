import FCType from 'libs/FormConstructor/FCType'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import { smoothMoveToEntrance } from 'entrance/EntrancePages/EntrancePages-func'
import deleteAccountRequest from 'requests/user/deleteAccountRequest'

/* Функция возвращает объект настройки формы-кнопки удаления учётной записи */
export default function getSubmitBtnFormConfig(userAccountSectionMsg: any) {
    const submitBtnFormConfig: FCType.Config = {
        bottom: {
            submit: {
                text: userAccountSectionMsg.deleteBtn,
                block: true,
                align: 'center',
                color: 'accent'
            },
        },
        async requestFn(readyFieldValues, outerFns) {
            return await deleteAccountRequest()
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
                        // Поставить authTokenStatus в 'fail' чтобы выкинуть пользователя из редактора
                        store.dispatch(actions.user.setUserData('fail', null))
                    }, 600)
                }, 1000)
            }
        },
        showCommonSuccess: true,
        commonSuccess: userAccountSectionMsg.emailSuccessfullyChanged
    }

    return submitBtnFormConfig
}
