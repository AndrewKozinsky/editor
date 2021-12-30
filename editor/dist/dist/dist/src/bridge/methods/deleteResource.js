var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            }
        }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import articleManager from 'articleManager/articleManager';
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods';
import { deleteItem } from 'libs/DragFilesTree/StoreManage/manageState';
import deleteArticleRequest from 'requests/editor/article/deleteArticleRequest';
import deleteComponentRequest from 'requests/editor/components/deleteComponentRequest';
import actions from 'store/rootAction';
import { store } from 'store/rootReducer';
import config from 'utils/config';
import { setInLocalStorage } from 'utils/MiscUtils';
// TODO Что делает эта функция?
export function deleteResource(category, type, resourceId, originalFolders, updatedFolders) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!resourceId)
            return;
        // Если originalFolders и updatedFolders не передали, то значит удаляют элемент из формы
        // папки/компонента/статьи или редактируемой статьи и этих массивов нет прямо там.
        // Поэтому получу их из Хранилища
        const { originalFolders2, updatedFolders2 } = getFolders(category, type, resourceId, originalFolders, updatedFolders);
        // Сохранить новые данные в Хранилище
        setFoldersInStore(category, updatedFolders2);
        // Поставить новый массив открытых папок в LocalStorage
        setOpenedFoldersIdInLS(category, type, updatedFolders2);
        // Обнулить id выделенной папки/файла в Хранилище
        clearDataFromStore(category);
        if (type == 'folder') {
            // Удалить все компоненты или статьи если удаляют папку
            yield deleteFilesInFolder(category, originalFolders2, resourceId);
        }
        else {
            // Удалить компонент или статью если удаляют не папку
            yield deleteFile(category, resourceId);
        }
        // Сохранить массив папок на сервере
        yield this.saveFoldersOnServer(category, updatedFolders2);
        // Тут ещё нужно заново скачать и поставить массив папок компонентов и массив компонентов если
        // это компоненты.
        if (category == 'components') {
            // Обновить папки компонентов и компоненты у редактируемой статьи если отредактировали
            // папки компонентов сайта, к которому принадлежит редактируемая статья.
            this.updateTempCompFolders();
            this.updateTempComps();
        }
        // Если удалили статью, которая является редактируемой, то очистить редактор
        if (category == 'articles' && type === 'file') {
            this.clearEditableArticle(resourceId);
        }
    });
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
function getFolders(category, type, resourceId, originalFolders, updatedFolders) {
    if (originalFolders && updatedFolders) {
        return { originalFolders2: originalFolders, updatedFolders2: updatedFolders };
    }
    let originalFolders2;
    if (category == 'components') {
        originalFolders2 = store.getState().sites.compFolderSection.compFolder;
    }
    else if (category == 'articles') {
        originalFolders2 = store.getState().sites.artFolderSection.artFolder;
    }
    let updatedFolders2 = deleteItem(originalFolders2, resourceId);
    return { originalFolders2, updatedFolders2 };
}
// TODO Что делает эта функция?
function setFoldersInStore(category, updatedFolders2) {
    if (category === 'components') {
        store.dispatch(actions.sites.setCompFolder({ folders: updatedFolders2 }));
    }
    else if (category === 'articles') {
        store.dispatch(actions.sites.setArtFolder({ folders: updatedFolders2 }));
    }
}
// TODO Что делает эта функция?
function clearDataFromStore(category) {
    // Обнулить данные выделенного элемента в Хранилище
    if (category === 'components') {
        // Убрать id выделенной папки или файла из Хранилища
        store.dispatch(actions.sites.setCurrentComp(null, null));
    }
    else if (category === 'articles') {
        // Убрать id выделенной папки или файла из Хранилища
        store.dispatch(actions.sites.setCurrentArt(null, null));
    }
}
// TODO Что делает эта функция?
function setOpenedFoldersIdInLS(category, type, updatedFolders2) {
    if (type == 'file')
        return;
    // Массив id открытых папок в LocalStorage
    const openedFoldersId = filesTreePublicMethods.getOpenedFoldersId(updatedFolders2);
    // Поставить новый массив открытых папок в LocalStorage
    if (category === 'components') {
        setInLocalStorage(config.ls.editorCompOpenedFolders, openedFoldersId);
    }
    else if (category === 'articles') {
        setInLocalStorage(config.ls.editorArtOpenedFolders, openedFoldersId);
    }
}
// TODO Что делает эта функция?
function deleteFilesInFolder(category, originalFolders, resourceId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Получить все id файлов внутри папки
        const filesIdsInside = filesTreePublicMethods.getFilesIdsInFolder(originalFolders, resourceId);
        // debugger
        // Обнулить данные выделенного элемента в Хранилище
        if (category === 'components') {
            const requests = filesIdsInside.map(innerFileId => {
                return deleteComponentRequest(innerFileId);
            });
            yield Promise.all(requests);
        }
        else if (category === 'articles') {
            // id редактируемой статьи
            const editedArticleId = store.getState().article.articleId;
            // Проход по массиву идентификаторов удаляемых статей
            filesIdsInside.forEach(articleId => {
                // Если удаляемая статья равна редактируемой статье, то удалить её через articleManager
                if (articleId === editedArticleId) {
                    articleManager.deleteArticle(articleId);
                }
                // В противном случае удалить через запрос на сервер
                else {
                    deleteFile('articles', articleId);
                }
            });
        }
    });
}
// TODO Что делает эта функция?
function deleteFile(category, resourceId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (category === 'components') {
            // Сделать запрос на удаление компонента
            yield deleteComponentRequest(resourceId);
        }
        else if (category === 'articles') {
            // Сделать запрос на удаление статьи
            yield deleteArticleRequest(resourceId);
        }
    });
}
//# sourceMappingURL=deleteResource.js.map
//# sourceMappingURL=deleteResource.js.map
//# sourceMappingURL=deleteResource.js.map