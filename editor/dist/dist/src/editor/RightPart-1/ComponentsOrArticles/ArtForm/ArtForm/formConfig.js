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
import { updateArticleRequest } from 'requests/editor/article/updateArticleRequest';
import bridge from '../../../../../bridge/bridge';
import DeleteArticleButton from '../DeleteArticleButton/DeleteArticleButton';
/** Функция возвращает конфигурацию формы входа в сервис */
function getFormConfig(artFormMsg) {
    const config = {
        fields: {
            name: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(artFormMsg.articleNameRequired)
                        .max(100, artFormMsg.articleNameIsTooLong);
                },
                fieldData: {
                    label: artFormMsg.articleNameInput,
                    autoFocus: true
                }
            },
            siteTemplateId: {
                fieldType: 'select',
                fieldData: {
                    label: artFormMsg.defaultTemplateInput,
                    options: [],
                }
            },
        },
        bottom: {
            submit: {
                text: artFormMsg.submitBtnText,
                icon: 'btnSignSave' // Это значение должен изменять хук в зависимости от типа формы!!!
            },
            elems: [React.createElement(DeleteArticleButton, { key: 2 })],
            hr: true
        },
        requestFn(readyFieldValues, outerFns, formDetails) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                // Массив папок и файлов из Хранилища
                const folders = store.getState().sites.artFolderSection.artFolder;
                // id главной папки в базе данных
                const { artFolderId } = store.getState().sites.artFolderSection;
                // id выбранной папки
                const { currentArtItemId } = store.getState().sites.articleSection;
                // Название статьи и id выбранного шаблона сайта
                const articleName = readyFieldValues.name.toString();
                let articleTemplateId = readyFieldValues.siteTemplateId === null
                    ? null
                    : parseInt((_a = readyFieldValues.siteTemplateId) === null || _a === void 0 ? void 0 : _a.toString());
                // Изменить название статьи на введённое и обновить папки в Хранилище
                const { newItems } = filesTreePublicMethods.changeItemName(folders, currentArtItemId, articleName);
                store.dispatch(sitesActions.setArtFolder({
                    folders: newItems
                }));
                // Подготовить массив папок и файлов для сохранения на сервере
                const preparedFolders = filesTreePublicMethods.prepareItemsToSaveInServer(newItems);
                // Сохранить папки на сервере
                yield putArtFolderRequest(artFolderId, preparedFolders);
                // Обновить статью на сервере
                return yield updateArticleRequest(currentArtItemId, articleName, articleTemplateId);
            });
        },
        afterSubmit(response, outerFns, formDetails) {
            if (!formDetails.readyFieldValues.siteTemplateId)
                return;
            // Обновить id шаблона сайта у редактируемой статьи если указали другой.
            bridge.updateSiteTemp(formDetails.readyFieldValues.siteTemplateId.toString());
        }
    };
    return config;
}
export default getFormConfig;
//# sourceMappingURL=formConfig.js.map
//# sourceMappingURL=formConfig.js.map