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
const JSON5 = require('json5');
import * as yup from 'yup';
import { store } from 'store/rootReducer';
import sitesActions from 'store/site/sitesActions';
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods';
import { updateComponentRequest } from 'requests/editor/components/updateComponentRequest';
import putCompFolderRequest from 'requests/editor/compFolders/putCompFolderRequest';
import bridge from '../../../../../bridge/bridge';
import checkComponentCode from '../CodeHelper/checkComponentCode';
import DeleteComponentButton from '../DeleteComponentButton/DeleteFolderButton';
/** Функция возвращает конфигурацию формы входа в сервис */
function getFormConfig(componentFormMsg) {
    const config = {
        fields: {
            content: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .test('check-code', componentFormMsg.componentContentInputIsWrong, function (code) {
                        return checkComponentCode(code).length === 0;
                    });
                },
                fieldData: {
                    inputType: 'textarea',
                    label: componentFormMsg.componentContentInput,
                    autoFocus: true
                }
            }
        },
        bottom: {
            submit: {
                text: componentFormMsg.submitBtnTextSave,
                icon: 'btnSignSave' // Это значение должен изменять хук в зависимости от типа формы!!!
            },
            elems: [React.createElement(DeleteComponentButton, { key: 2 })],
            hr: true
        },
        requestFn(readyFieldValues, outerFns, formDetails) {
            return __awaiter(this, void 0, void 0, function* () {
                // Массив папок и файлов из Хранилища
                const folders = store.getState().sites.compFolderSection.compFolder;
                // id выбранной папки
                const { currentCompItemId } = store.getState().sites.componentSection;
                // Изменить название компонента на введённое и обновить Хранилище папок
                const { name } = JSON5.parse(readyFieldValues.content.toString());
                const result = filesTreePublicMethods.changeItemName(folders, currentCompItemId, name);
                store.dispatch(sitesActions.setCompFolder({
                    folders: result.newItems
                }));
                // Подготовить массив папок и файлов для сохранения на сервере
                const preparedFolders = filesTreePublicMethods.prepareItemsToSaveInServer(result.newItems);
                // Сохранить данные на сервере
                const { compFolderId } = store.getState().sites.compFolderSection;
                yield putCompFolderRequest(compFolderId, preparedFolders);
                return yield updateComponentRequest(currentCompItemId, readyFieldValues.content.toString());
            });
        },
        afterSubmit() {
            // Обновить компоненты у редактируемой статьи если отредактировали
            // компонент сайта, к которому принадлежит редактируемая статья.
            bridge.updateTempComps();
        }
    };
    return config;
}
export default getFormConfig;
//# sourceMappingURL=formConfig.js.map
//# sourceMappingURL=formConfig.js.map