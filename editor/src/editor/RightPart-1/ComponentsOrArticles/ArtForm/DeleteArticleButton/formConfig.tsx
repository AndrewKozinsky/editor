import React from 'react'
import FCType from 'libs/FormConstructor/FCType'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import putArtFolderRequest from 'requests/editor/artFolders/putArtFolderRequest'
import deleteArticleRequest from 'requests/editor/article/deleteArticleRequest'
import CloseModalButton from './CloseModalButton'

/**
 * Функция возвращает конфигурацию формы входа в сервис
 * @param {Object} articleFormMsg — объект с текстами ошибок
 */
function getConfig(articleFormMsg: any) {
    const config: FCType.Config = {
        bottom: {
            submit: {
                text: articleFormMsg.deleteArticleBtnInModal,
            },
            elems: [<CloseModalButton key={2} />]
        },
        async requestFn(readyFieldValues) {
            const { artFolder, artFolderId } = store.getState().sites.artFolderSection
            const { currentArtItemId } = store.getState().sites.articleSection

            // Удалить компонент из Хранилища и возвратить новый массив
            const newFoldersArr = filesTreePublicMethods.deleteItem(artFolder, currentArtItemId)

            // Сохранить новые данные в Хранилище
            store.dispatch( actions.sites.setArtFolder({folders: newFoldersArr}) )

            // Обнулить свойство указывающее на id активного пункта в папках и шаблонах статей потому что статья удалена
            store.dispatch( actions.sites.setCurrentArt(null, null) )

            // Сохранить новый массив папок и файлов на сервере
            await putArtFolderRequest(artFolderId, newFoldersArr)

            // Удалить статью на сервере
            return await deleteArticleRequest(currentArtItemId)
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
