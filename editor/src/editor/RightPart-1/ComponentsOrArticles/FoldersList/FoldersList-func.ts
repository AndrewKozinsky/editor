import {useCallback, useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
const JSON5 = require('json5')
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import sitesActions from 'store/site/sitesActions'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import createArticleRequest from 'requests/editor/article/createArticleRequest'
import createComponentRequest from 'requests/editor/components/createComponentRequest'
import { getFromLocalStorage, setInLocalStorage } from 'utils/MiscUtils'
import config from 'utils/config'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
import DragFilesTreeType from 'libs/DragFilesTree/types'
import putCompFolderRequest from 'requests/editor/compFolders/putCompFolderRequest'
import deleteArticleRequest from 'requests/editor/article/deleteArticleRequest'
import deleteComponentRequest from 'requests/editor/components/deleteComponentRequest'
import putArtFolderRequest from 'requests/editor/artFolders/putArtFolderRequest'
import useGetMessages from 'messages/fn/useGetMessages'
import {compFoldersSectionMessages} from 'messages/compFoldersSectionMessages'
import {artFoldersSectionMessages} from 'messages/artFoldersSectionMessages'
import { FolderType } from '../types'


/**
 * Хук скачивает с сервера папки и ставит в Хранилище
 * @param {String} type — тип папок: с компонентами или со статьями
 */
export function useGetFoldersFromServerAndPutInStore(type: FolderType) {
    const dispatch = useDispatch()

    // id текущего сайта
    const { currentSiteId } = useGetSitesSelectors()

    // При изменении выбранного сайта...
    useEffect(function () {
        // Если не передан id сайта, то обнулить папки в Хранилище
        if (!currentSiteId) {
            dispatch(actions.sites.setCompFolder(null))
            dispatch(actions.sites.setArtFolder(null))
            return
        }

        // Скачать новый массив папок компонентов и статей
        if (type === 'components') {
            dispatch(actions.sites.requestCompFolder())
        }
        if (type === 'articles') {
            dispatch(actions.sites.requestArtFolder())
        }
    }, [currentSiteId])
}

export function useGetFolders(type: FolderType): null | DragFilesTreeType.Items {
    if (type === 'components') {
        return useGetSitesSelectors().compFolderSection.compFolder
    }
    else if (type === 'articles') {
        return useGetSitesSelectors().artFolderSection.artFolder
    }
}


export function useGetSetFolders(type: FolderType) {
    const dispatch = useDispatch()

    const { compFolderId } = useGetSitesSelectors().compFolderSection
    const { artFolderId } = useGetSitesSelectors().artFolderSection

    return useCallback(function (newItems: DragFilesTreeType.Items) {
        if (type === 'components') {
            return dispatch(sitesActions.setCompFolder({
                id: compFolderId,
                folders: newItems
            }))
        }
        else if (type == 'articles') {
            return dispatch(sitesActions.setArtFolder({
                id: artFolderId,
                folders: newItems
            }))
        }
    }, [compFolderId, artFolderId])
}

/**
 * Хук возвращает тексты для кнопок создания нового файла и новой папки
 * @param type
 */
export function useGetNewItemsName(type: FolderType) {
    const [newFileName, setNewFileName] = useState('newFileName')
    const [newFolderName, setFolderName] = useState('newFolderName')

    const compFoldersSectionMsg = useGetMessages(compFoldersSectionMessages)
    const artFoldersSectionMsg = useGetMessages(artFoldersSectionMessages)

    useEffect(function () {
        if (type === 'components') {
            setNewFileName(compFoldersSectionMsg.createNewFileBth.toString())
            setFolderName(compFoldersSectionMsg.createNewFolderBth.toString())
        }
        else {
            setNewFileName(artFoldersSectionMsg.createNewFileBth.toString())
            setFolderName(artFoldersSectionMsg.createNewFolderBth.toString())
        }
    }, [type])

    return [newFileName, newFolderName]
}


/**
 * Функция сохраняет массив папок на сервере
 * @param {String} type — тип папок: компонентов или статей.
 * @param {Array} items — массив папок и файлов.
 */
export async function saveFoldersOnServer(type: FolderType, items: DragFilesTreeType.Items) {
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

/**
 * Функция запускаемая после удаления или папки или файла (статьми или компонента)
 * @param {String} type — тип папок: с компонентами или со статьями.
 * @param {Array} originalItems — массив данных по папкам и файлам.
 * @param {Array} newItems — массив данных по папкам и файлам.
 * @param {String} deletedItem — объект удаляемого элемента
 */
export function afterDeleteItem(
    type: FolderType,
    originalItems: DragFilesTreeType.Items,
    newItems: DragFilesTreeType.Items,
    deletedItem: DragFilesTreeType.Item,
) {
    // Массив id открытых папок в LocalStorage
    const openedFoldersId = filesTreePublicMethods.getOpenedFoldersId(newItems)

    // Получить все id файлов внутри папки
    const filesIdsInside = filesTreePublicMethods.getFilesIdsInFolder(originalItems, deletedItem.id)

    // Обнулить данные выделенного элемента в Хранилище
    if (type === 'components') {
        // Убрать id выделенной папки или файла из Хранилища
        store.dispatch( actions.sites.setCurrentComp(null, null) )

        if (deletedItem.type === 'folder') {
            // Поставить новый массив открытых папок в LocalStorage
            setInLocalStorage(config.ls.editorCompOpenedFolders, openedFoldersId)

            filesIdsInside.forEach(innerFileId => {
                deleteComponentRequest(innerFileId)
            })
        }
        else {
            // Сделать запрос на удаление компонента
            deleteComponentRequest(deletedItem.id)
        }
    }
    else if (type === 'articles') {
        // Убрать id выделенной папки или файла из Хранилища
        store.dispatch( actions.sites.setCurrentArt(null, null) )

        if (deletedItem.type === 'folder') {
            // Поставить новый массив открытых папок в LocalStorage
            setInLocalStorage(config.ls.editorArtOpenedFolders, openedFoldersId)

            filesIdsInside.forEach(innerFileId => {
                deleteArticleRequest(innerFileId)
            })
        }
        else {
            // Сделать запрос на удаление компонента
            deleteArticleRequest(deletedItem.id)
        }

        // If the opened article is not in new items array then it is in the deleted folder,
        // then clear article editor because the article will be deleted.
        /*if ( filesTreePublicMethods.getItemById(items, store.getState().article.articleId) ) {
            store.dispatch( actions.article.clearArticle() )
        }*/
    }

    // Сохранить массив папок на сервере
    saveFoldersOnServer(type, newItems)
}


/**
 * Функция запускаемая после добавления новой папки или файла (компонента или статьи)
 * @param {String} type — тип папок: с компонентами или со статьями
 * @param {String} newFileName —
 */
export async function afterAddingNewFile(type: FolderType, newFileName: string): Promise<number> {
    const { currentSiteId } = store.getState().sites

    // Сохранить данные на сервере
    if (type === 'components') {
        const minCompContent: TempCompTypes.Content = {
            name: newFileName,
            html: '<p>Text...</p>'
        }
        const serverResponse = await createComponentRequest(
            currentSiteId, JSON5.stringify(minCompContent)
        )

        if (serverResponse.status === 'success') {
            return  serverResponse.data.components[0].id
        }
    }
    else {
        const serverResponse = await createArticleRequest(
            currentSiteId, newFileName
        )

        if (serverResponse.status === 'success') {
            return serverResponse.data.articles[0].id
        }
    }

    // Функция должна вернуть число. Пусть в случае неудачного ответа будет возвращено такое значение:
    return 100000000
}

/**
 * Функция запускаемая после раскрытия/скрытия любой папки.
 * После этого массив id открытых папок записывается в localstorage
 * чтобы при следующем запуске страницы эти папки бы отрисовывались открытыми.
 * @param {String} type — тип папок: с компонентами или со статьями
 * @param {Array} idArr — массив id раскрытых папок
 */
export function afterCollapseFolder(type: FolderType, idArr: DragFilesTreeType.IdArr) {
    // Массив id открытых папок
    const ids = JSON.stringify(idArr)

    if (type === 'components') {
        setInLocalStorage(config.ls.editorCompOpenedFolders, ids)
    }
    else {
        setInLocalStorage(config.ls.editorArtOpenedFolders, ids)
    }
}

/** Функция получает из localStorage id открытых папок и возвращает
 *  чтобы при отрисовке компонента они были открытыми */
export function getOpenedFoldersIds(type: FolderType) {
    if (type === 'components') {
        return getFromLocalStorage(config.ls.editorCompOpenedFolders)
    }
    else if (type === 'articles') {
        return getFromLocalStorage(config.ls.editorArtOpenedFolders)
    }
}

/** Хук возвращает обработчик щелчка по папке или файлу. */
export function useGetOnItemClick(type: FolderType) {
    const dispatch = useDispatch()

    // Поставить id элемента и его тип (папка или файл) в качестве выбранного элемента
    return useCallback(function (item: DragFilesTreeType.Item) {
        if (type === 'components') {
            dispatch(actions.sites.setCurrentComp(item.id, item.type))
        }
        else if (type === 'articles') {
            dispatch(actions.sites.setCurrentArt(item.id, item.type))
        }
    }, [dispatch])
}
