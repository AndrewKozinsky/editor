var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import * as yup from 'yup';
import { store } from 'store/rootReducer';
import sitesActions from 'store/site/sitesActions';
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods';
import putCompFolderRequest from 'requests/editor/compFolders/putCompFolderRequest';
import bridge from '../../../../../bridge/bridge';
import DeleteFolderButton from '../DeleteFolderButton/DeleteFolderButton';
/** Функция возвращает конфигурацию формы входа в сервис */
function getFormConfig(componentFolderFormMsg) {
    const config = {
        fields: {
            name: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(componentFolderFormMsg.formNameInputRequired)
                        .max(100, componentFolderFormMsg.emailToLong);
                },
                fieldData: {
                    label: componentFolderFormMsg.folderNameInput,
                    autoFocus: true
                }
            }
        },
        bottom: {
            submit: {
                text: componentFolderFormMsg.submitBtnTextSave,
                icon: 'btnSignSave' // Это значение должен изменять хук в зависимости от типа формы!!!
            },
            elems: [React.createElement(DeleteFolderButton, { key: 2 })],
            hr: true
        },
        requestFn(readyFieldValues, outerFns, formDetails) {
            return __awaiter(this, void 0, void 0, function* () {
                // Массив папок и файлов из Хранилища
                const folders = store.getState().sites.compFolderSection.compFolder;
                // id выбранной папки
                const { currentCompItemId } = store.getState().sites.componentSection;
                // Изменить название папки на введённое и обновить Хранилище папок
                const folderName = readyFieldValues.name.toString();
                const result = filesTreePublicMethods.changeItemName(folders, currentCompItemId, folderName);
                store.dispatch(sitesActions.setCompFolder({
                    folders: result.newItems
                }));
                // Подготовить массив папок и файлов для сохранения на сервере
                const preparedFolders = filesTreePublicMethods.prepareItemsToSaveInServer(result.newItems);
                // Сохранить данные на сервере
                const { compFolderId } = store.getState().sites.compFolderSection;
                return yield putCompFolderRequest(compFolderId, preparedFolders);
            });
        },
        afterSubmit() {
            // Обновить папки компонентов у редактируемой статьи если отредактировали
            // папки компонентов сайта, к которому принадлежит редактируемая статья.
            bridge.updateTempCompFolders();
        }
    };
    return config;
}
export default getFormConfig;
//# sourceMappingURL=formConfig.js.map