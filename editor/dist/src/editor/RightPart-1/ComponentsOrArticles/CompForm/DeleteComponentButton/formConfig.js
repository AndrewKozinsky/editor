var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods';
import actions from 'store/rootAction';
import { store } from 'store/rootReducer';
import putCompFolderRequest from 'requests/editor/compFolders/putCompFolderRequest';
import deleteComponentRequest from 'requests/editor/components/deleteComponentRequest';
import bridge from '../../../../../bridge/bridge';
/**
 * Функция возвращает конфигурацию формы входа в сервис
 * @param {Object} componentFormMsg — объект с текстами ошибок
 */
function getConfig(componentFormMsg) {
    const config = {
        bottom: {
            submit: {
                text: componentFormMsg.deleteComponentBtnInModal,
            },
        },
        requestFn(readyFieldValues) {
            return __awaiter(this, void 0, void 0, function* () {
                const { compFolder, compFolderId } = store.getState().sites.compFolderSection;
                const { currentCompItemId } = store.getState().sites.componentSection;
                // Удалить компонент из Хранилища и возвратить новый массив
                const newFoldersArr = filesTreePublicMethods.deleteItem(compFolder, currentCompItemId);
                // Сохранить новые данные в Хранилище
                store.dispatch(actions.sites.setCompFolder({ folders: newFoldersArr }));
                // Обнулить свойство указывающее на id активного пункта в папках и шаблонах компонентах потому что компонент удален
                store.dispatch(actions.sites.setCurrentComp(null, null));
                // Сохранить новый массив папок и файлов на сервере
                yield putCompFolderRequest(compFolderId, newFoldersArr);
                // Удалить компонент на сервере
                return yield deleteComponentRequest(currentCompItemId);
            });
        },
        afterSubmit(response, outerFns, formDetails) {
            if (response.status === 'success') {
                // Закрыть модальное окно
                store.dispatch(actions.modal.closeModal());
                // Обновить компоненты у редактируемой статьи если удалили
                // компонент сайта, к которому принадлежит редактируемая статья.
                bridge.updateTempComps();
            }
        },
    };
    return config;
}
export default getConfig;
//# sourceMappingURL=formConfig.js.map