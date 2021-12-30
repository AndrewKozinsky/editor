var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { store } from 'store/rootReducer';
import actions from 'store/rootAction';
import { smoothMoveToEntrance } from 'entrance/EntrancePages/EntrancePages-func';
import deleteAccountRequest from 'requests/user/deleteAccountRequest';
/* Функция возвращает объект настройки формы-кнопки удаления учётной записи */
export default function getSubmitBtnFormConfig(userAccountSectionMsg) {
    const submitBtnFormConfig = {
        bottom: {
            submit: {
                text: userAccountSectionMsg.deleteBtn,
                block: true,
                align: 'center',
                color: 'accent'
            },
        },
        requestFn(readyFieldValues, outerFns) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield deleteAccountRequest();
            });
        },
        afterSubmit(response, outerFns) {
            if (response.status === 'success') {
                // Закрыть модальное окно
                store.dispatch(actions.modal.closeModal());
                // Удалить куку авторизации
                document.cookie = 'authToken=logout; max-age=0';
                setTimeout(function () {
                    // Smooth hide the editor and show entrance forms wrapper
                    smoothMoveToEntrance();
                    setTimeout(function () {
                        // Поставить authTokenStatus в 'fail' чтобы выкинуть пользователя из редактора
                        store.dispatch(actions.user.setUserData('fail', null));
                    }, 600);
                }, 1000);
            }
        },
        showCommonSuccess: true,
        commonSuccess: userAccountSectionMsg.emailSuccessfullyChanged
    };
    return submitBtnFormConfig;
}
//# sourceMappingURL=submitBtnFormConfig.js.map