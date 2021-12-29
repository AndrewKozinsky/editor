import React from 'react'
import FCType from 'libs/FormConstructor/FCType'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import putArtFolderRequest from 'requests/editor/artFolders/putArtFolderRequest'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import bridge from '../../../../../bridge/bridge'

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

            await bridge.deleteResource('articles', 'folder', currentArtItemId)
            return true
        },
        afterSubmit(response, outerFns, formDetails) {
            if (response) {
                // Закрыть модальное окно
                store.dispatch(actions.modal.closeModal())
            }
        },
    }

    return config
}

export default getConfig
