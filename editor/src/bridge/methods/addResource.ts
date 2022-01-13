import DragFilesTreeType from 'libs/DragFilesTree/types'
import putArtFolderRequest from 'requests/editor/artFolders/putArtFolderRequest'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import { store } from 'store/rootReducer'
import putCompFolderRequest from 'requests/editor/compFolders/putCompFolderRequest'
import bridge from '../bridge'
import { FolderType } from 'editor/RightPart-1/ComponentsOrArticles/types'

// TODO Что делает эта функция?
export async function addResource(
    this: typeof bridge,
    category: FolderType,
    folders: DragFilesTreeType.Items,
) {
    // Подготовить сохраняемый массив папок и файлов для сохранения на сервере
    const preparedFolders = filesTreePublicMethods.prepareItemsToSaveInServer(folders)

    // Сохранить данные на сервере
    if (category === 'components') {
        const { compFolderId } = store.getState().sites.compFolderSection
        await putCompFolderRequest(compFolderId, preparedFolders)

        // Обновить папки компонентов у редактируемой статьи если отредактировали
        // папки компонентов сайта, к которому принадлежит редактируемая статья.
        this.updateTempCompFolders()
    }
    else if (category === 'articles') {
        const { artFolderId } = store.getState().sites.artFolderSection
        await putArtFolderRequest(artFolderId, preparedFolders)
    }
}
