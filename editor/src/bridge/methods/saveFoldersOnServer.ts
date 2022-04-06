import { FolderType } from 'src/editor/RightPart-1/FoldersList/types'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import putArtFolderRequest from 'requests/editor/artFolders/putArtFolderRequest'
import putCompFolderRequest from 'requests/editor/compFolders/putCompFolderRequest'
import FilesTreeType from 'types/FilesTreeType'
import { getState } from 'utils/miscUtils'

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
        const { compFolderId } = getState().sites.compFolderSection
        await putCompFolderRequest(compFolderId, preparedItems)
    }
    else {
        const { artFolderId } = getState().sites.artFolderSection
        await putArtFolderRequest(artFolderId, preparedItems)
    }
}
