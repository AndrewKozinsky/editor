import { FolderType } from 'editor/RightPart-1/ComponentsOrArticles/types'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import putArtFolderRequest from 'requests/editor/artFolders/putArtFolderRequest'
import putCompFolderRequest from 'requests/editor/compFolders/putCompFolderRequest'
import { store } from 'store/rootReducer'
import FilesTreeType from '../../types/FilesTreeType'

/**
 * Функция сохраняет массив папок на сервере
 * @param {String} type — тип папок: компонентов или статей.
 * @param {Array} items — массив папок и файлов.
 */
export default async function saveFoldersOnServer(type: FolderType, items: FilesTreeType.Items) {
    // Подготовить сохраняемый массив папок и файлов
    const preparedItems = filesTreePublicMethods.prepareItemsToSaveInServer(items)

    // Сохранить данные на сервере
    if (type === 'components') {
        const { compFolderId } = store.getState().sites.compFolderSection
        await putCompFolderRequest(compFolderId, preparedItems)
    }
    else {
        const { artFolderId } = store.getState().sites.artFolderSection
        await putArtFolderRequest(artFolderId, preparedItems)
    }
}
