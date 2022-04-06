import React from 'react'
import * as yup from 'yup'
import { store } from 'store/rootReducer'
import sitesActions from 'store/site/sitesActions'
import FCType from 'libs/FormConstructor/FCType'
import articleFolderFormMsg from 'messages/articleFolderFormMessages'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import putArtFolderRequest from 'requests/editor/artFolders/putArtFolderRequest'
import { getState } from 'utils/miscUtils'
import DeleteFolderButton from '../DeleteFolderButton/DeleteFolderButton'

/** Функция возвращает конфигурацию формы входа в сервис */
const artFolderFormConfig: FCType.Config = {
    fields: {
        name: {
            fieldType: 'text',
            schema: (fields) => {
                return yup.string()
                    .required(articleFolderFormMsg.formNameInputRequired)
                    .max(100, articleFolderFormMsg.emailToLong)
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
            icon: 'btnSignSave'
        },
        elems: [<DeleteFolderButton key={2} />],
        hr: true
    },
    async requestFn(readyFieldValues, outerFns, formDetails) {
        // Массив папок и файлов из Хранилища
        const folders = getState().sites.artFolderSection.artFolder
        // id выбранной папки
        const { currentArtItemId } = getState().sites.articleSection

        // Изменить название папки на введённое и обновить Хранилище папок
        const folderName = readyFieldValues.name.toString()
        const result = filesTreePublicMethods.changeItemName(
            folders, currentArtItemId, folderName
        )

        store.dispatch(sitesActions.setArtFolder({
            folders: result.newItems
        }))

        // Подготовить массив папок и файлов для сохранения на сервере
        const preparedFolders = filesTreePublicMethods.prepareItemsToSaveInServer(result.newItems)

        // Сохранить данные на сервере
        const { artFolderId } = getState().sites.artFolderSection
        return await putArtFolderRequest(artFolderId, preparedFolders)
    }
}

export default artFolderFormConfig
