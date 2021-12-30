import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
const JSON5 = require('json5')
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import sitesActions from 'store/site/sitesActions'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import createArticleRequest from 'requests/editor/article/createArticleRequest'
import createComponentRequest from 'requests/editor/components/createComponentRequest'
import { getFromLocalStorage, setInLocalStorage } from 'src/utils/miscUtils'
import config from 'utils/config'
import DragFilesTreeType from 'libs/DragFilesTree/types'
import useGetMessages from 'messages/fn/useGetMessages'
import {compFoldersSectionMessages} from 'messages/compFoldersSectionMessages'
import {artFoldersSectionMessages} from 'messages/artFoldersSectionMessages'
import articleManager from '../../../../articleManager/articleManager'
import bridge from '../../../../bridge/bridge'
import StoreSitesTypes from 'store/site/sitesTypes'
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
            const payload: StoreSitesTypes.SetCompFolderActionPayload = { id: null, folders: null }

            dispatch(actions.sites.setCompFolder(payload))
            dispatch(actions.sites.setArtFolder(payload))

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

// TODO Что делает эта функция?
export function useGetFolders(type: FolderType): null | DragFilesTreeType.Items {
    if (type === 'components') {
        return useGetSitesSelectors().compFolderSection.compFolder
    }
    else if (type === 'articles') {
        return useGetSitesSelectors().artFolderSection.artFolder
    }
}

// TODO Что делает эта функция?
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
 * Функция запускается после добавления папки или файла в массив папок. При удалении функция не обрабатывает.
 * @param {String} category — категория папок: компонентов или статей.
 * @param {Array} items — массив папок и файлов.
 */
export async function saveFoldersOnServer(category: FolderType, items: DragFilesTreeType.Items) {
    await bridge.addResource(category, items)
}

/**
 * Функция запускаемая после удаления или папки или файла (статьми или компонента)
 * @param {String} category — тип папок: с компонентами или со статьями.
 * @param {Array} originalFolders — массив данных по папкам и файлам.
 * @param {Array} newFolders — массив данных по папкам и файлам.
 * @param {String} deletedItem — объект удаляемого элемента
 */
export function afterDeleteItem(
    category: FolderType,
    originalFolders: DragFilesTreeType.Items,
    newFolders: DragFilesTreeType.Items,
    deletedItem: DragFilesTreeType.Item,
) {
    bridge.deleteResource(category, deletedItem.type, deletedItem.id, originalFolders, newFolders)
}


/**
 * Функция запускаемая после добавления компонента или статьи.
 * При добавлении папки эта функция не отрабатывает.
 * @param {String} type — тип папок: с компонентами или со статьями
 * @param {String} newFileName — название компонента или статьи.
 */
export async function afterAddingNewFile(type: FolderType, newFileName: string): Promise<number> {
    const { currentSiteId } = store.getState().sites

    // Сохранить данные на сервере
    if (type === 'components') {
        // Может создание нового компонента поместить в articleManager?
        const minCompContent: TempCompTypes.Content = {
            name: newFileName,
            html: '<img src="https://st.depositphotos.com/2125603/2249/i/450/depositphotos_22490689-stock-photo-brown-baby-duck.jpg" alt="duck" />'
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
export function afterCollapseFolder(type: FolderType, idArr: DragFilesTreeType.ItemIdArr) {
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
