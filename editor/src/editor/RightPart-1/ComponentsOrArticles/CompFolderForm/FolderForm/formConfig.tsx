import React from 'react'
import * as yup from 'yup'
import { store } from 'store/rootReducer'
import sitesActions from 'store/site/sitesActions'
import FCType from 'libs/FormConstructor/FCType'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import putCompFolderRequest from 'requests/editor/compFolders/putCompFolderRequest'
import DeleteFolderButton from '../DeleteFolderButton/DeleteFolderButton'

/** Функция возвращает конфигурацию формы входа в сервис */
function getFormConfig(componentFolderFormMsg: any) {
    const config: FCType.Config = {
        fields: {
            name: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(componentFolderFormMsg.formNameInputRequired)
                        .max(100, componentFolderFormMsg.emailToLong)
                },
                fieldData: {
                    label: componentFolderFormMsg.folderNameInput,
                    autoFocus: true
                }
            }
        },
        bottom: {
            submit: {
                text: componentFolderFormMsg.submitBtnTextSave, // Это значение должен изменять хук в зависимости от типа формы!!!
                icon: 'btnSignSave' // Это значение должен изменять хук в зависимости от типа формы!!!
            },
            elems: [<DeleteFolderButton key={2} />],
            hr: true
        },
        async requestFn(readyFieldValues, outerFns, formDetails) {
            // Массив папок и файлов из Хранилища
            const folders = store.getState().sites.compFolderSection.compFolder
            // id выбранной папки
            const { currentCompItemId } = store.getState().sites.componentSection

            // Изменить название папки на введённое и обновить Хранилище папок
            const folderName = readyFieldValues.name.toString()
            const result = filesTreePublicMethods.changeItemName(
                folders, currentCompItemId, folderName
            )

            store.dispatch(sitesActions.setCompFolder({
                folders: result.newItems
            }))

            // Подготовить массив папок и файлов для сохранения на сервере
            const preparedFolders = filesTreePublicMethods.prepareItemsToSaveInServer(result.newItems)

            // Сохранить данные на сервере
            const { compFolderId } = store.getState().sites.compFolderSection
            return await putCompFolderRequest(compFolderId, preparedFolders)
        }
    }

    return config
}

export default getFormConfig
