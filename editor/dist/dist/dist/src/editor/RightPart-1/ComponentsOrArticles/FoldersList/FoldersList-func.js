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
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
const JSON5 = require('json5');
import actions from 'store/rootAction';
import { store } from 'store/rootReducer';
import sitesActions from 'store/site/sitesActions';
import useGetSitesSelectors from 'store/site/sitesSelectors';
import createArticleRequest from 'requests/editor/article/createArticleRequest';
import createComponentRequest from 'requests/editor/components/createComponentRequest';
import { getFromLocalStorage, setInLocalStorage } from 'utils/MiscUtils';
import config from 'utils/config';
import useGetMessages from 'messages/fn/useGetMessages';
import { compFoldersSectionMessages } from 'messages/compFoldersSectionMessages';
import { artFoldersSectionMessages } from 'messages/artFoldersSectionMessages';
import bridge from '../../../../bridge/bridge';
/**
 * Хук скачивает с сервера папки и ставит в Хранилище
 * @param {String} type — тип папок: с компонентами или со статьями
 */
export function useGetFoldersFromServerAndPutInStore(type) {
    const dispatch = useDispatch();
    // id текущего сайта
    const { currentSiteId } = useGetSitesSelectors();
    // При изменении выбранного сайта...
    useEffect(function () {
        // Если не передан id сайта, то обнулить папки в Хранилище
        if (!currentSiteId) {
            const payload = { id: null, folders: null };
            dispatch(actions.sites.setCompFolder(payload));
            dispatch(actions.sites.setArtFolder(payload));
            return;
        }
        // Скачать новый массив папок компонентов и статей
        if (type === 'components') {
            dispatch(actions.sites.requestCompFolder());
        }
        if (type === 'articles') {
            dispatch(actions.sites.requestArtFolder());
        }
    }, [currentSiteId]);
}
// TODO Что делает эта функция?
export function useGetFolders(type) {
    if (type === 'components') {
        return useGetSitesSelectors().compFolderSection.compFolder;
    }
    else if (type === 'articles') {
        return useGetSitesSelectors().artFolderSection.artFolder;
    }
}
// TODO Что делает эта функция?
export function useGetSetFolders(type) {
    const dispatch = useDispatch();
    const { compFolderId } = useGetSitesSelectors().compFolderSection;
    const { artFolderId } = useGetSitesSelectors().artFolderSection;
    return useCallback(function (newItems) {
        if (type === 'components') {
            return dispatch(sitesActions.setCompFolder({
                id: compFolderId,
                folders: newItems
            }));
        }
        else if (type == 'articles') {
            return dispatch(sitesActions.setArtFolder({
                id: artFolderId,
                folders: newItems
            }));
        }
    }, [compFolderId, artFolderId]);
}
/**
 * Хук возвращает тексты для кнопок создания нового файла и новой папки
 * @param type
 */
export function useGetNewItemsName(type) {
    const [newFileName, setNewFileName] = useState('newFileName');
    const [newFolderName, setFolderName] = useState('newFolderName');
    const compFoldersSectionMsg = useGetMessages(compFoldersSectionMessages);
    const artFoldersSectionMsg = useGetMessages(artFoldersSectionMessages);
    useEffect(function () {
        if (type === 'components') {
            setNewFileName(compFoldersSectionMsg.createNewFileBth.toString());
            setFolderName(compFoldersSectionMsg.createNewFolderBth.toString());
        }
        else {
            setNewFileName(artFoldersSectionMsg.createNewFileBth.toString());
            setFolderName(artFoldersSectionMsg.createNewFolderBth.toString());
        }
    }, [type]);
    return [newFileName, newFolderName];
}
/**
 * Функция запускается после добавления папки или файла в массив папок. При удалении функция не обрабатывает.
 * @param {String} category — категория папок: компонентов или статей.
 * @param {Array} items — массив папок и файлов.
 */
export function saveFoldersOnServer(category, items) {
    return __awaiter(this, void 0, void 0, function* () {
        yield bridge.addResource(category, items);
    });
}
/**
 * Функция запускаемая после удаления или папки или файла (статьми или компонента)
 * @param {String} category — тип папок: с компонентами или со статьями.
 * @param {Array} originalFolders — массив данных по папкам и файлам.
 * @param {Array} newFolders — массив данных по папкам и файлам.
 * @param {String} deletedItem — объект удаляемого элемента
 */
export function afterDeleteItem(category, originalFolders, newFolders, deletedItem) {
    bridge.deleteResource(category, deletedItem.type, deletedItem.id, originalFolders, newFolders);
}
/**
 * Функция запускаемая после добавления компонента или статьи.
 * При добавлении папки эта функция не отрабатывает.
 * @param {String} type — тип папок: с компонентами или со статьями
 * @param {String} newFileName — название компонента или статьи.
 */
export function afterAddingNewFile(type, newFileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const { currentSiteId } = store.getState().sites;
        // Сохранить данные на сервере
        if (type === 'components') {
            // Может создание нового компонента поместить в articleManager?
            const minCompContent = {
                name: newFileName,
                html: '<img src="https://st.depositphotos.com/2125603/2249/i/450/depositphotos_22490689-stock-photo-brown-baby-duck.jpg" alt="duck" />'
            };
            const serverResponse = yield createComponentRequest(currentSiteId, JSON5.stringify(minCompContent));
            if (serverResponse.status === 'success') {
                return serverResponse.data.components[0].id;
            }
        }
        else {
            const serverResponse = yield createArticleRequest(currentSiteId, newFileName);
            if (serverResponse.status === 'success') {
                return serverResponse.data.articles[0].id;
            }
        }
        // Функция должна вернуть число. Пусть в случае неудачного ответа будет возвращено такое значение:
        return 100000000;
    });
}
/**
 * Функция запускаемая после раскрытия/скрытия любой папки.
 * После этого массив id открытых папок записывается в localstorage
 * чтобы при следующем запуске страницы эти папки бы отрисовывались открытыми.
 * @param {String} type — тип папок: с компонентами или со статьями
 * @param {Array} idArr — массив id раскрытых папок
 */
export function afterCollapseFolder(type, idArr) {
    // Массив id открытых папок
    const ids = JSON.stringify(idArr);
    if (type === 'components') {
        setInLocalStorage(config.ls.editorCompOpenedFolders, ids);
    }
    else {
        setInLocalStorage(config.ls.editorArtOpenedFolders, ids);
    }
}
/** Функция получает из localStorage id открытых папок и возвращает
 *  чтобы при отрисовке компонента они были открытыми */
export function getOpenedFoldersIds(type) {
    if (type === 'components') {
        return getFromLocalStorage(config.ls.editorCompOpenedFolders);
    }
    else if (type === 'articles') {
        return getFromLocalStorage(config.ls.editorArtOpenedFolders);
    }
}
/** Хук возвращает обработчик щелчка по папке или файлу. */
export function useGetOnItemClick(type) {
    const dispatch = useDispatch();
    // Поставить id элемента и его тип (папка или файл) в качестве выбранного элемента
    return useCallback(function (item) {
        if (type === 'components') {
            dispatch(actions.sites.setCurrentComp(item.id, item.type));
        }
        else if (type === 'articles') {
            dispatch(actions.sites.setCurrentArt(item.id, item.type));
        }
    }, [dispatch]);
}
//# sourceMappingURL=FoldersList-func.js.map
//# sourceMappingURL=FoldersList-func.js.map
//# sourceMappingURL=FoldersList-func.js.map