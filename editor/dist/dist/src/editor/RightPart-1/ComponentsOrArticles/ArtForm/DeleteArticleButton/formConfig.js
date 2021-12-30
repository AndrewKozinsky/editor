var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import actions from 'store/rootAction';
import { store } from 'store/rootReducer';
import bridge from '../../../../../bridge/bridge';
/**
 * Функция возвращает конфигурацию формы удаления статьи
 * @param {Object} articleFormMsg — объект с текстами ошибок
 */
function getConfig(articleFormMsg) {
    const config = {
        bottom: {
            submit: {
                text: articleFormMsg.deleteArticleBtnInModal,
            },
        },
        requestFn(readyFieldValues) {
            return __awaiter(this, void 0, void 0, function* () {
                const { currentArtItemId } = store.getState().sites.articleSection;
                yield bridge.deleteResource('articles', 'file', currentArtItemId);
                return true;
            });
        },
        afterSubmit(response, outerFns, formDetails) {
            if (response) {
                // Закрыть модальное окно
                store.dispatch(actions.modal.closeModal());
            }
        },
    };
    return config;
}
export default getConfig;
//# sourceMappingURL=formConfig.js.map
//# sourceMappingURL=formConfig.js.map