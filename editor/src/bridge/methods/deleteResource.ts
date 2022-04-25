import DragFilesTreeType from 'libs/DragFilesTree/types'
import articleManager from 'articleManager/articleManager'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import { deleteItem } from 'libs/DragFilesTree/StoreManage/manageState'
import deleteArticleRequest from 'requests/editor/article/deleteArticleRequest'
import deleteComponentRequest from 'requests/editor/components/deleteComponentRequest'
import { store } from 'store/rootReducer'
import { getState } from 'utils/miscUtils'
import sitesActions from 'store/site/sitesActions'
import localStorageProxyActions from 'store/localStorageProxy/localStorageProxyActions'
import bridge from '../bridge'
import { FolderType } from 'editor/RightPart-1/FoldersList/types'

/**
 * Функция делает действия при удалении папки статей/компонентов или статью/компонент
 * @param {String} category — категория удаляемого ресурса: components или articles
 * @param {String} type — тип удаляемого ресурса: file или folder
 * @param {Number} resourceId — id удаляемого ресурса
 * @param {Array} originalFolders — массив папок/элементов до удаления папки/элемента
 * @param {Array} updatedFolders — обновлённый массив папок/элементов после удаления папки/элемента
 */
export async function deleteResource(
    this: typeof bridge,
    category: FolderType,
    type: 'file' | 'folder',
    resourceId: null | DragFilesTreeType.ItemId,
    originalFolders?: DragFilesTreeType.Items,
    updatedFolders?: DragFilesTreeType.Items,
) {
    if (!resourceId) return

    // Если originalFolders и updatedFolders не передали, то значит удаляют элемент из формы
    // папки/компонента/статьи или редактируемой статьи и этих массивов нет прямо там.
    // Поэтому получу их из Хранилища
    const { originalFolders2, updatedFolders2 } =
        getFolders(category, type, resourceId, originalFolders, updatedFolders)

    // Сохранить новые данные в Хранилище
    setFoldersInStore(category, updatedFolders2)

    // Поставить новый массив открытых папок в LocalStorage
    setOpenedFoldersIdInLS(category, type, updatedFolders2)

    // Обнулить id выделенной папки/файла в Хранилище
    clearDataFromStore(category)

    if (type == 'folder') {
        // Удалить все компоненты или статьи если удаляют папку
        await deleteFilesInFolder(category, originalFolders2, resourceId as DragFilesTreeType.FolderItemId)
    }
    else {
        // Удалить компонент или статью если удаляют не папку
        await deleteFile(category, resourceId as DragFilesTreeType.FileItemId)
    }

    // Сохранить массив папок на сервере
    await this.saveFoldersOnServer(category, updatedFolders2)

    // Тут ещё нужно заново скачать и поставить массив папок компонентов и массив компонентов если
    // это компоненты.
    if (category == 'components') {
        // Обновить папки компонентов и компоненты у редактируемой статьи если отредактировали
        // папки компонентов сайта, к которому принадлежит редактируемая статья.
        this.updateTempCompFolders()
        this.updateTempComps()
    }

    // Если удалили статью, которая является редактируемой, то очистить редактор
    if (category == 'articles' && type === 'file') {
        this.clearEditableArticle(resourceId as DragFilesTreeType.FileItemId)
    }
}

/**
 * Функция вычисляет и возвращает объект с двумя массивами папок: до удаления и после
 * @param {String} category
 * @param {String} type
 * @param {Number} resourceId
 * @param {Array} originalFolders
 * @param {Array} updatedFolders
 * @returns
 */
function getFolders(
    category: FolderType,
    type: 'file' | 'folder',
    resourceId: DragFilesTreeType.ItemId,
    originalFolders?: DragFilesTreeType.Items,
    updatedFolders?: DragFilesTreeType.Items
) {
    if (originalFolders && updatedFolders) {
        return { originalFolders2: originalFolders, updatedFolders2: updatedFolders }
    }

    let originalFolders2: DragFilesTreeType.Items
    if (category == 'components') {
        originalFolders2 = getState().sites.compFolderSection.compFolder
    }
    else if (category == 'articles') {
        originalFolders2 = getState().sites.artFolderSection.artFolder
    }

    let updatedFolders2 = deleteItem(originalFolders2, resourceId)

    return { originalFolders2, updatedFolders2 }
}

// TODO Что делает эта функция?
function setFoldersInStore(category: FolderType, updatedFolders2: DragFilesTreeType.Items) {
    if (category === 'components') {
        store.dispatch( sitesActions.setCompFolder({folders: updatedFolders2}) )
    }
    else if (category === 'articles') {
        store.dispatch( sitesActions.setArtFolder({folders: updatedFolders2}) )
    }
}

// TODO Что делает эта функция?
function clearDataFromStore(category: FolderType) {
    const { currentSiteId } = getState().sites

    // Обнулить данные выделенного элемента в Хранилище
    if (category === 'components') {
        // Убрать id выделенной папки или файла из Хранилища
        store.dispatch( sitesActions.setCurrentCompOuter(currentSiteId, null, null) )
    }
    else if (category === 'articles') {
        // Убрать id выделенной папки или файла из Хранилища
        store.dispatch( sitesActions.setCurrentArtOuter(currentSiteId, null, null) )
    }
}

/**
 * Функция сохраняет идентификаторы открытых папок в Хранилище чтобы затем сохранить в LocalStorage
 * @param {String} category — категория: компоненты или статьи
 * @param {String} type — тип: папка или файл
 * @param {Array} updatedFolders — массив папок и файлов
 */
function setOpenedFoldersIdInLS(
    category: FolderType,
    type: 'file' | 'folder',
    updatedFolders: DragFilesTreeType.Items
) {
    if (type == 'file') return

    const { currentSiteId } = getState().sites

    // Массив id открытых папок в LocalStorage
    const openedFoldersId = filesTreePublicMethods.getOpenedFoldersId(updatedFolders)

    // Поставить новый массив открытых папок в LocalStorage
    if (category === 'components') {
        store.dispatch(
            localStorageProxyActions.setGroup(
                {groupId: currentSiteId, propName: 'compOpenedFolders', propValue: openedFoldersId}
            )
        )
    }
    else if (category === 'articles') {
        store.dispatch(
            localStorageProxyActions.setGroup(
                {groupId: currentSiteId, propName: 'artOpenedFolders', propValue: openedFoldersId}
            )
        )
    }
}

// TODO Что делает эта функция?
async function deleteFilesInFolder(
    category: FolderType,
    originalFolders: DragFilesTreeType.Items,
    resourceId: DragFilesTreeType.FolderItemId
) {
    // Получить все id файлов внутри папки
    const filesIdsInside = filesTreePublicMethods.getFilesIdsInFolder(originalFolders, resourceId)

    // Обнулить данные выделенного элемента в Хранилище
    if (category === 'components') {
        const requests = filesIdsInside.map(innerFileId => {
            return deleteComponentRequest(innerFileId)
        })

        await Promise.all(requests)
    }
    else if (category === 'articles') {
        // id редактируемой статьи
        const editedArticleId = getState().article.articleId

        // Проход по массиву идентификаторов удаляемых статей
        filesIdsInside.forEach(articleId => {
            // Если удаляемая статья равна редактируемой статье, то удалить её через articleManager
            if (articleId === editedArticleId) {
                articleManager.deleteArticle(articleId)
            }
            // В противном случае удалить через запрос на сервер
            else {
                deleteFile('articles', articleId)
            }
        })
    }
}

// TODO Что делает эта функция?
async function deleteFile(category: FolderType, resourceId: number) {
    if (category === 'components') {
        // Сделать запрос на удаление компонента
        await deleteComponentRequest(resourceId)
    }
    else if (category === 'articles') {
        // Сделать запрос на удаление статьи
        await deleteArticleRequest(resourceId)
    }
}
