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
import React from 'react';
import * as yup from 'yup';
import { store } from 'store/rootReducer';
import sitesActions from 'store/site/sitesActions';
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods';
import putArtFolderRequest from 'requests/editor/artFolders/putArtFolderRequest';
import DeleteFolderButton from '../DeleteFolderButton/DeleteFolderButton';
/** Функция возвращает конфигурацию формы входа в сервис */
function getFormConfig(articleFolderFormMsg) {
    const config = {
        fields: {
            name: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(articleFolderFormMsg.formNameInputRequired)
                        .max(100, articleFolderFormMsg.emailToLong);
                },
                fieldData: {
                    label: articleFolderFormMsg.folderNameInput,
                    autoFocus: true
                }
            }
        },
        bottom: {
            submit: {
                text: articleFolderFormMsg.submitBtnTextSave,
                icon: 'btnSignSave' // Это значение должен изменять хук в зависимости от типа формы!!!
            },
            elems: [React.createElement(DeleteFolderButton, { key: 2 })],
            hr: true
        },
        requestFn(readyFieldValues, outerFns, formDetails) {
            return __awaiter(this, void 0, void 0, function* () {
                // Массив папок и файлов из Хранилища
                const folders = store.getState().sites.artFolderSection.artFolder;
                // id выбранной папки
                const { currentArtItemId } = store.getState().sites.articleSection;
                // Изменить название папки на введённое и обновить Хранилище папок
                const folderName = readyFieldValues.name.toString();
                const result = filesTreePublicMethods.changeItemName(folders, currentArtItemId, folderName);
                store.dispatch(sitesActions.setArtFolder({
                    folders: result.newItems
                }));
                // Подготовить массив папок и файлов для сохранения на сервере
                const preparedFolders = filesTreePublicMethods.prepareItemsToSaveInServer(result.newItems);
                // Сохранить данные на сервере
                const { artFolderId } = store.getState().sites.artFolderSection;
                return yield putArtFolderRequest(artFolderId, preparedFolders);
            });
        }
    };
    return config;
}
export default getFormConfig;
//# sourceMappingURL=formConfig.js.map
//# sourceMappingURL=formConfig.js.map