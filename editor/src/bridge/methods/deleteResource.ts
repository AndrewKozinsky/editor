import DragFilesTreeType from 'libs/DragFilesTree/types'
import articleManager from 'articleManager/articleManager'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import { deleteItem } from 'libs/DragFilesTree/StoreManage/manageState'
import deleteArticleRequest from 'requests/editor/article/deleteArticleRequest'
import deleteComponentRequest from 'requests/editor/components/deleteComponentRequest'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import config from 'utils/config'
import { setInLocalStorage } from 'utils/MiscUtils'
import bridge from '../bridge'
import { FolderType } from 'editor/RightPart-1/ComponentsOrArticles/types'

// TODO Что делает эта функция?
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
        originalFolders2 = store.getState().sites.compFolderSection.compFolder
    }
    else if (category == 'articles') {
        originalFolders2 = store.getState().sites.artFolderSection.artFolder
    }

    let updatedFolders2 = deleteItem(originalFolders2, resourceId)

    return { originalFolders2, updatedFolders2 }
}

// TODO Что делает эта функция?
function setFoldersInStore(category: FolderType, updatedFolders2: DragFilesTreeType.Items) {
    if (category === 'components') {
        store.dispatch( actions.sites.setCompFolder({folders: updatedFolders2}) )
    }
    else if (category === 'articles') {
        store.dispatch( actions.sites.setArtFolder({folders: updatedFolders2}) )
    }
}

// TODO Что делает эта функция?
function clearDataFromStore(category: FolderType) {
    // Обнулить данные выделенного элемента в Хранилище
    if (category === 'components') {
        // Убрать id выделенной папки или файла из Хранилища
        store.dispatch( actions.sites.setCurrentComp(null, null) )
    }
    else if (category === 'articles') {
        // Убрать id выделенной папки или файла из Хранилища
        store.dispatch( actions.sites.setCurrentArt(null, null) )
    }
}

// TODO Что делает эта функция?
function setOpenedFoldersIdInLS(
    category: FolderType,
    type: 'file' | 'folder',
    updatedFolders2: DragFilesTreeType.Items
) {
    if (type == 'file') return

    // Массив id открытых папок в LocalStorage
    const openedFoldersId = filesTreePublicMethods.getOpenedFoldersId(updatedFolders2)

    // Поставить новый массив открытых папок в LocalStorage
    if (category === 'components') {
        setInLocalStorage(config.ls.editorCompOpenedFolders, openedFoldersId)
    }
    else if (category === 'articles') {
        setInLocalStorage(config.ls.editorArtOpenedFolders, openedFoldersId)
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
    // debugger

    // Обнулить данные выделенного элемента в Хранилище
    if (category === 'components') {
        const requests = filesIdsInside.map(innerFileId => {
            return deleteComponentRequest(innerFileId)
        })

        await Promise.all(requests)
    }
    else if (category === 'articles') {
        // id редактируемой статьи
        const editedArticleId = store.getState().article.articleId

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