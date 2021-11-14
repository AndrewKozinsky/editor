import { useCallback, useEffect } from 'react'
import {useDispatch} from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { store } from 'store/rootReducer'
// import {AppStateType} from 'store/rootReducer'
import actions from 'store/rootAction'
// import createArticleRequest from 'requests/editor/article/createArticleRequest'
// import createComponentRequest from 'requests/editor/components/createComponentRequest'
// import {getFromLocalStorage, setInLocalStorage} from 'utils/MiscUtils'
// import {addOpenPropToFolders, selectItem} from 'libs/DragFilesTree/StoreManage/manageState'
// import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods'
// import {setCompItems, setArtItems} from '../stores'
import { FolderType } from '../types'
// import putComponentsFoldersRequest from 'requests/editor/components/putComponentsFoldersRequest'
// import putArticlesFoldersRequest from 'requests/editor/article/putArticlesFoldersRequest'
import {
    // GetComponentsFoldersServerResponse,
    // useGetComponentsFoldersRequest
} from 'src/requests/editor/compFolders/getCompFolderRequest'
// import { useGetArticlesFoldersRequest } from 'requests/editor/article/getArticlesFoldersRequest'
// import deleteArticleRequest from 'requests/editor/article/deleteArticleRequest'
// import deleteComponentRequest from 'requests/editor/components/deleteComponentRequest'
// import articleManager from 'editor/RightPart-2/articleManager/articleManager'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import DragFilesTreeType from 'libs/DragFilesTree/types'
import sitesActions from 'store/site/sitesActions'


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
            return dispatch(sitesActions.setCompFolder(newItems))
        }
        else if (type === 'articles') {
            return dispatch()
        }
    }, [])
}


/**
 * Функция сохраняет массив папок или шаблонов компонентов на сервере
 * @param {String} type — тип папок: с компонентами или со статьями.
 * @param {Array} items — массив данных по папкам и файлам.
 */
/*export async function saveItemsOnServer(type: FolderType, items: DragFilesTreeType.Items) {
    // Подготовить сохраняемый массив папок и файлов
    const preparedItems = filesTreePublicMethods.prepareItemsToSaveInServer(items)

    // Сохранить данные на сервере
    if (type === 'components') {
        await putComponentsFoldersRequest(preparedItems)
    }
    else if (type === 'articles') {
        await putArticlesFoldersRequest(preparedItems)
    }
}*/

/**
 * Функция запускаемая после удаления папки с компонентами или статьями
 * @param {String} type — тип папок: с компонентами или со статьями.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {String} deletedItemUuid — uuid удалённого элемента
 */
/*export function afterDeleteItem(type: FolderType, items: DragFilesTreeType.Items, deletedItemUuid: DragFilesTreeType.UuId) {
    // Обнулить данные выделенного элемента в Хранилище
    if (type === 'components') {
        store.dispatch( actions.sites.setCurrentComp(null, null) )
    }
    else if (type === 'articles') {
        store.dispatch( actions.sites.setCurrentArt(null, null) )

        // If the opened article is not in new items array then it is in the deleted folder,
        // then clear article editor because the article will be deleted.
        if ( filesTreePublicMethods.getItemById(items, store.getState().article.articleUuId) ) {
            store.dispatch( actions.article.clearArticle() )
        }
    }

    // Обновить uuid открытых папок в LocalStorage
    const openedFoldersUuid = filesTreePublicMethods.getOpenedFoldersUuid(items)
    if (type === 'components') {
        setInLocalStorage('editorComponentsOpenedFolders', openedFoldersUuid)
    }
    else if (type === 'articles') {
        setInLocalStorage('editorArticlesOpenedFolders', openedFoldersUuid)
    }

    // Сохранить данные на сервере
    saveItemsOnServer(type, items)

    // Удалить компонент или статью на сервере
    if (type === 'components') {
        deleteComponentRequest(deletedItemUuid)
    }
    else if (type === 'articles') {
        deleteArticleRequest(deletedItemUuid)
    }
}*/


/**
 * Функция запускаемая после добавления новой папки или файла (компонента или статьи)
 * @param {String} type — тип папок: с компонентами или со статьями
 * @param {Object} item — данные нового файла.
 * @param {Array} items — массив данных по папкам и файлам.
 */
export async function afterAddingNewItem(type: FolderType, items: DragFilesTreeType.Items, item: DragFilesTreeType.Item) {
    // Параметры функции создания шаблона компонента или статьи
    const { id, name } = item

    // Сохранить данные на сервере
    if (type === 'components') {
        // const serverResponse = await createComponentRequest(id, name, 'null')
    }
    else if (type === 'articles') {
        // Create code of a new article
        // let code = JSON.stringify( articleManager.createArticle() )

        // await createArticleRequest(id, name, code)
    }
}

/**
 * Функция запускаемая после раскрытия/скрытия любой папки.
 * После этого массив uuid открытых папок записывается в localstorage
 * чтобы при следующем запуске страницы эти папки бы отрисовывались открытыми.
 * @param {String} type — тип папок: с компонентами или со статьями
 * @param {Array} arrUuId — массив uuid раскрытых папок
 */
/*export function afterCollapseFolder(type: FolderType, arrUuId: DragFilesTreeType.UuIdArr) {
    // Массив uuid открытых папок
    const uuids = JSON.stringify(arrUuId)

    if (type === 'components') {
        setInLocalStorage('editorComponentsOpenedFolders', uuids)
    }
    else if (type === 'articles') {
        setInLocalStorage('editorArticlesOpenedFolders', uuids)
    }
}*/

/** Функция получает из localStorage uuid открытых папок и возвращает
 *  чтобы при отрисовке компонента они были открытыми */
/*export function getOpenedFoldersUuId(type: FolderType) {
    if (type === 'components') {
        return getFromLocalStorage('editorComponentsOpenedFolders')
    }
    else if (type === 'articles') {
        return getFromLocalStorage('editorArticlesOpenedFolders')
    }
}*/

/** Хук возвращает обработчик щелчка по папке или файлу. */
/*export function useGetOnItemClick(type: FolderType) {
    const dispatch = useDispatch()

    // Поставить uuid элемента и его тип (папка или файл) в качестве выбранного элемента
    return useCallback(function (item: DragFilesTreeType.Item) {
        if (type === 'components') {
            dispatch(actions.sites.setCurrentComp(item.uuid, item.type))
        }
        else if (type === 'articles') {
            dispatch(actions.sites.setCurrentArt(item.uuid, item.type))
        }
    }, [dispatch])
}*/
