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
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods';
import putCompFolderRequest from 'requests/editor/compFolders/putCompFolderRequest';
import actions from 'store/rootAction';
import { store } from 'store/rootReducer';
import bridge from '../../../../../bridge/bridge';
/**
 * Функция возвращает конфигурацию формы входа в сервис
 * @param {Object} compFolderFormMsg — объект с текстами ошибок
 */
function getConfig(compFolderFormMsg) {
    const config = {
        bottom: {
            submit: {
                text: compFolderFormMsg.deleteFolderBtnInModal,
            },
        },
        requestFn(readyFieldValues) {
            return __awaiter(this, void 0, void 0, function* () {
                const { currentCompItemId } = store.getState().sites.componentSection;
                const { compFolder, compFolderId } = store.getState().sites.compFolderSection;
                // Удалить папку из Хранилища и возвратить новый массив
                const newFoldersArr = filesTreePublicMethods.deleteItem(compFolder, currentCompItemId);
                // Сохранить новые данные в Хранилище
                store.dispatch(actions.sites.setCompFolder({ folders: newFoldersArr }));
                // Обнулить свойство указывающее на id активного пункта в папках и шаблонах компонентах потому что папка удалена
                store.dispatch(actions.sites.setCurrentComp(null, null));
                // Сохранить новый массив папок и файлов на сервере
                return yield putCompFolderRequest(compFolderId, newFoldersArr);
            });
        },
        afterSubmit(response, outerFns, formDetails) {
            if (response.status === 'success') {
                // Закрыть модальное окно
                store.dispatch(actions.modal.closeModal());
                // Обновить папки компонентов у редактируемой статьи если отредактировали
                // папки компонентов сайта, к которому принадлежит редактируемая статья.
                bridge.updateTempCompFolders();
            }
        },
    };
    return config;
}
export default getConfig;
//# sourceMappingURL=formConfig.js.map
//# sourceMappingURL=formConfig.js.map