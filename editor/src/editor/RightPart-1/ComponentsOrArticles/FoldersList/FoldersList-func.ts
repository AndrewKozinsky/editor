import {useCallback, useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import JSON5 from 'json5'
// import { store } from 'store/rootReducer'
// import {AppStateType} from 'store/rootReducer'
import actions from 'store/rootAction'
// import createArticleRequest from 'requests/editor/article/createArticleRequest'
import createComponentRequest from 'requests/editor/components/createComponentRequest'
import { getFromLocalStorage, setInLocalStorage } from 'utils/MiscUtils'
// import {addOpenPropToFolders, selectItem} from 'libs/DragFilesTree/StoreManage/manageState'
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
// import {setCompItems, setArtItems} from '../stores'
import { FolderType } from '../types'
import putCompFolderRequest from 'src/requests/editor/compFolders/putCompFolderRequest'
// import putArticlesFoldersRequest from 'requests/editor/article/putArticlesFoldersRequest'
import {
    // GetComponentsFoldersServerResponse,
} from 'src/requests/editor/compFolders/getCompFolderRequest'
// import { useGetArticlesFoldersRequest } from 'requests/editor/article/getArticlesFoldersRequest'
// import deleteArticleRequest from 'requests/editor/article/deleteArticleRequest'
import deleteComponentRequest from 'requests/editor/components/deleteComponentRequest'
// import articleManager from 'editor/RightPart-2/articleManager/articleManager'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import DragFilesTreeType from 'libs/DragFilesTree/types'
import sitesActions from 'store/site/sitesActions'
import { store } from 'store/rootReducer'
import useGetMessages from '../../../../messages/fn/useGetMessages'
import {compFoldersSectionMessages} from '../../../../messages/compFoldersSectionMessages'
import useGetSettingsSelectors from '../../../../store/settings/settingsSelectors'
import {artFoldersSectionMessages} from '../../../../messages/artFoldersSectionMessages'


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
            // *** Тут напиши обнуление статей ***
            return
        }

        // Скачать новый массив папок компонентов и статей
        if (type === 'components') {
            dispatch(actions.sites.requestCompFolder())
        }
        if (type === 'articles') {
            // *** Тут напиши загрузку статей ***
        }
    }, [currentSiteId])
}

export function useGetFolders(type: FolderType): null | DragFilesTreeType.Items {
    if (type === 'components') {
        return useGetSitesSelectors().compFolderSection.compFolder
    }
    else if (type === 'articles') {
        return useGetSitesSelectors().compFolderSection.compFolder
    }
}


export function useGetSetFolders(type: FolderType) {
    const dispatch = useDispatch()

    return useCallback(function (newItems: DragFilesTreeType.Items) {
        if (type === 'components') {
            return dispatch(sitesActions.setCompFolder({compFolder: newItems}))
        }
        else if (type === 'articles') {
            return dispatch()
        }
    }, [])
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
 * Функция сохраняет массив папок или шаблонов компонентов на сервере
 * @param {String} type — тип папок: с компонентами или со статьями.
 * @param {Array} items — массив данных по папкам и файлам.
 */
export async function saveFoldersOnServer(type: FolderType, items: DragFilesTreeType.Items) {
    // id папки с компонентами текущего сайта
    const compFolderId = store.getState().sites.compFolderSection.compFolderId

    // Подготовить сохраняемый массив папок и файлов
    const preparedItems = filesTreePublicMethods.prepareItemsToSaveInServer(items)

    // Сохранить данные на сервере
    if (type === 'components') {
        await putCompFolderRequest(compFolderId, preparedItems)
    }
    else {
        // await putArticlesFoldersRequest(..., preparedItems)
    }
}

/**
 * Функция запускаемая после удаления или папки или файла (статьми или компонента)
 * @param {String} type — тип папок: с компонентами или со статьями.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {String} deletedItemId — uuid удалённого элемента
 */
export function afterDeleteItem(
    type: FolderType, items: DragFilesTreeType.Items, deletedItemId: DragFilesTreeType.Id
) {
    // Обнулить данные выделенного элемента в Хранилище
    if (type === 'components') {
        store.dispatch( actions.sites.setCurrentComp(null, null) )
    }
    else if (type === 'articles') {
        // store.dispatch( actions.sites.setCurrentArt(null, null) )

        // If the opened article is not in new items array then it is in the deleted folder,
        // then clear article editor because the article will be deleted.
        /*if ( filesTreePublicMethods.getItemById(items, store.getState().article.articleUuId) ) {
            store.dispatch( actions.article.clearArticle() )
        }*/
    }

    // Обновить id открытых папок в LocalStorage
    const openedFoldersId = filesTreePublicMethods.getOpenedFoldersId(items)
    if (type === 'components') {
        setInLocalStorage('editorCompOpenedFolders', openedFoldersId)
    }
    /*else if (type === 'articles') {
        setInLocalStorage('editorArticlesOpenedFolders', openedFoldersId)
    }*/

    // Сохранить массив папок на сервере
    saveFoldersOnServer(type, items)

    // Удалить компонент или статью на сервере
    if (type === 'components') {
        deleteComponentRequest(deletedItemId)
    }
    /*else if (type === 'articles') {
        deleteArticleRequest(deletedItemId)
    }*/
}


/**
 * Функция запускаемая после добавления новой папки или файла (компонента или статьи)
 * @param {String} type — тип папок: с компонентами или со статьями
 */
export async function afterAddingNewFile(type: FolderType): Promise<number> {
    const { currentSiteId } = store.getState().sites

    // Сохранить данные на сервере
    if (type === 'components') {
        const serverResponse = await createComponentRequest(
            currentSiteId, JSON5.stringify(null)
        )

        let newCompId = 100000000
        if (serverResponse.status === 'success') {
            newCompId = serverResponse.data.components[0].id
        }
        return newCompId
    }
    else {
        // Тут будет код по аналогии с компонентом
        return 123
    }
}

/**
 * Функция запускаемая после раскрытия/скрытия любой папки.
 * После этого массив uuid открытых папок записывается в localstorage
 * чтобы при следующем запуске страницы эти папки бы отрисовывались открытыми.
 * @param {String} type — тип папок: с компонентами или со статьями
 * @param {Array} idArr — массив uuid раскрытых папок
 */
export function afterCollapseFolder(type: FolderType, idArr: DragFilesTreeType.IdArr) {
    // Массив uuid открытых папок
    const ids = JSON.stringify(idArr)

    if (type === 'components') {
        setInLocalStorage('editorCompOpenedFolders', ids)
    }
    else {
        setInLocalStorage('editorArticlesOpenedFolders', ids)
    }
}

/** Функция получает из localStorage uuid открытых папок и возвращает
 *  чтобы при отрисовке компонента они были открытыми */
export function getOpenedFoldersIds(type: FolderType) {
    if (type === 'components') {
        return getFromLocalStorage('editorCompOpenedFolders')
    }
    else if (type === 'articles') {
        return getFromLocalStorage('editorArticlesOpenedFolders')
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
        /*else if (type === 'articles') {
            dispatch(actions.sites.setCurrentArt(item.uuid, item.type))
        }*/
    }, [dispatch])
}
