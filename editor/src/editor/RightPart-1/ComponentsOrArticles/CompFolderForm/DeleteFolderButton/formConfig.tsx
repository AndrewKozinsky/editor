import React from 'react'
import FCType from 'libs/FormConstructor/FCType'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import putCompFolderRequest from 'requests/editor/compFolders/putCompFolderRequest'
import CloseModalButton from './CloseModalButton'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'

/**
 * Функция возвращает конфигурацию формы входа в сервис
 * @param {Object} compFolderFormMsg — объект с текстами ошибок
 */
function getConfig(compFolderFormMsg: any) {
    const config: FCType.Config = {
        bottom: {
            submit: {
                text: compFolderFormMsg.deleteFolderBtnInModal,
            },
            elems: [<CloseModalButton key={2} />]
        },
        async requestFn(readyFieldValues) {
            const { currentCompItemId } = store.getState().sites.componentsSection
            const { compFolder, compFolderId } = store.getState().sites.compFolderSection

            // Удалить папку из Хранилища и возвратить новый массив
            const newFoldersArr = filesTreePublicMethods.deleteItem(compFolder, currentCompItemId)

            // Сохранить новые данные в Хранилище
            store.dispatch( actions.sites.setCompFolder({folders: newFoldersArr}) )

            // Обнулить свойство указывающее на uuid активного пункта в папках и шаблонах компонентах потому что папка удалена
            store.dispatch( actions.sites.setCurrentComp(null, null) )

            // Сохранить новый массив папок и файлов на сервере
            return await putCompFolderRequest(compFolderId, newFoldersArr)
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
