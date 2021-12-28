import React from 'react'
import FCType from 'libs/FormConstructor/FCType'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import putArtFolderRequest from 'requests/editor/artFolders/putArtFolderRequest'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'

/**
 * Функция возвращает конфигурацию формы входа в сервис
 * @param {Object} artFolderFormMsg — объект с текстами ошибок
 */
function getConfig(artFolderFormMsg: any) {
    const config: FCType.Config = {
        bottom: {
            submit: {
                text: artFolderFormMsg.deleteFolderBtnInModal,
            },
        },
        async requestFn(readyFieldValues) {
            const { currentArtItemId } = store.getState().sites.articleSection
            const { artFolder, artFolderId } = store.getState().sites.artFolderSection

            // Удалить папку из Хранилища и возвратить новый массив
            const newFoldersArr = filesTreePublicMethods.deleteItem(artFolder, currentArtItemId)

            // Сохранить новые данные в Хранилище
            store.dispatch( actions.sites.setArtFolder({folders: newFoldersArr}) )

            // Обнулить свойство указывающее на id активного пункта в папках и шаблонах компонентах потому что папка удалена
            store.dispatch( actions.sites.setCurrentArt(null, null) )

            // Сохранить новый массив папок и файлов на сервере
            return await putArtFolderRequest(artFolderId, newFoldersArr)
        },
        afterSubmit(response, outerFns, formDetails) {
            if (response.status === 'success') {
                // Закрыть модальное окно
                store.dispatch(actions.modal.closeModal())
            }
        },
    }

    return config
}

export default getConfig
