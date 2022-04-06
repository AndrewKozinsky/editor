import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
const JSON5 = require('json5')
import sitesActions from 'store/site/sitesActions'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import createArticleRequest from 'requests/editor/article/createArticleRequest'
import createComponentRequest from 'requests/editor/components/createComponentRequest'
import { getFromLocalStorage, getState, setInLocalStorage } from 'utils/miscUtils'
import config from 'utils/config'
import DragFilesTreeType from 'src/libs/DragFilesTree/types'
import bridge from '../../../bridge/bridge'
import StoreSitesTypes from 'store/site/sitesTypes'
import { FolderType } from './types'
import FilesTreeType from 'types/FilesTreeType'
import compFoldersSectionMsg from 'messages/compFoldersSectionMessages'
import artFoldersSectionMsg from 'messages/artFoldersSectionMessages'
import {selectItem} from '../../../libs/DragFilesTree/StoreManage/manageState'
import { store } from '../../../store/rootReducer'


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

            dispatch(sitesActions.setCompFolder(payload))
            dispatch(sitesActions.setArtFolder(payload))

            return
        }

        // Скачать новый массив папок компонентов и статей
        if (type === 'components') {
            dispatch(sitesActions.requestCompFolder())
        }
        if (type === 'articles') {
            dispatch(sitesActions.requestArtFolder())
        }
    }, [currentSiteId])
}

/**
 * Хук возвращает скачанные папки или компонентов или статей
 * @param {String} type — тип папок: компоненты или папки
 * @returns {FilesTreeType.Items | null}
 */
export function useGetFolders(type: FolderType): null | FilesTreeType.Items {
    if (type === 'components') {
        return useGetSitesSelectors().compFolderSection.compFolder
    }
    else if (type === 'articles') {
        return useGetSitesSelectors().artFolderSection.artFolder
    }
}

/**
 * Хук возвращает функцию обновления папок компонентов или статей
 * @param {String} type — тип папок: компоненты или папки
 */
export function useGetSetFolders(type: FolderType) {
    const dispatch = useDispatch()

    const { compFolderId } = useGetSitesSelectors().compFolderSection
    const { artFolderId } = useGetSitesSelectors().artFolderSection

    return useCallback(function (newItems: FilesTreeType.Items) {
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
 * @param {String} type — тип папок: компоненты или папки
 */
export function useGetNewItemsName(type: FolderType) {
    const [newFileName, setNewFileName] = useState('newFileName')
    const [newFolderName, setFolderName] = useState('newFolderName')

    useEffect(function () {
        if (type === 'components') {
            setNewFileName(compFoldersSectionMsg.createNewFileBth)
            setFolderName(compFoldersSectionMsg.createNewFolderBth)
        }
        else {
            setNewFileName(artFoldersSectionMsg.createNewFileBth)
            setFolderName(artFoldersSectionMsg.createNewFolderBth)
        }
    }, [type])

    return [newFileName, newFolderName]
}


/**
 * Функция запускается после добавления папки или файла в массив папок.
 * После добавления выделяется
 * При удалении функция не обрабатывает.
 * @param {String} category — категория папок: компонентов или статей.
 * @param {Array} items — массив папок и файлов.
 */
export async function saveFoldersOnServer(category: FolderType, items: DragFilesTreeType.Items) {
    await bridge.addResource(category, items)

    // После получения нового списка папок и файлов нужно выделить текущую папку или файл

    if (category === 'components') {
        const itemId = getState().sites.componentSection.currentCompItemId
        // Выделить текущую папку и получить обновлённый массив папок
        const updatedFolders = selectItem(items, itemId).newItems
        // Сохранить новый массив в Хранилище.
        store.dispatch(sitesActions.setCompFolder({folders: updatedFolders}))
    }
    else if (category === 'articles') {
        const itemId = getState().sites.articleSection.currentArtItemId
        // Выделить текущую папку и получить обновлённый массив папок
        const updatedFolders = selectItem(items, itemId).newItems
        // Сохранить новый массив в Хранилище.
        store.dispatch(sitesActions.setArtFolder({folders: updatedFolders}))
    }
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
 * @param {String} newArticleName — название статьи.
 */
export async function afterAddingNewFile(type: FolderType, newArticleName?: string): Promise<number> {
    const { currentSiteId } = getState().sites
    const currentSite = getState().sites.sites.find(site => site.id === currentSiteId)

    // Сохранить данные на сервере
    if (type === 'components') {
        // Может создание нового компонента поместить в articleManager?
        const minCompContent: TempCompTypes.Content = {
            html: '<img src="/misc/example-image.jpg" alt="image" data-em-id="image" />',
            elems: [
                {
                    elemId: 'image',
                    elemName: 'Image'
                }
            ]
        }
        const serverResponse = await createComponentRequest(
            currentSiteId, JSON5.stringify(minCompContent)
        )

        if (serverResponse.status !== 'success') return

        const addedCompId = serverResponse.data.components[0].id
        // Выделить добавленный компонент
        store.dispatch(sitesActions.setCurrentComp(addedCompId, 'file'))

        return addedCompId
    }
    else if (type === 'articles') {
        const serverResponse = await createArticleRequest(
            currentSiteId, newArticleName, currentSite.defaultSiteTemplateId,
            currentSite.defaultMetaTemplateId
        )

        if (serverResponse.status !== 'success') return

        const addedArtId = serverResponse.data.articles[0].id
        // Выделить добавленную статью
        store.dispatch(sitesActions.setCurrentArt(addedArtId, 'file'))

        return addedArtId
    }

    // Функция должна вернуть число. Пусть в случае неудачного ответа будет возвращено такое значение:
    return Math.round(100000000 * Math.random())
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
    return useCallback(function (item: FilesTreeType.Item) {
        if (type === 'components') {
            dispatch(sitesActions.setCurrentComp(item.id, item.type))
        }
        else if (type === 'articles') {
            dispatch(sitesActions.setCurrentArt(item.id, item.type))
        }
    }, [dispatch])
}
