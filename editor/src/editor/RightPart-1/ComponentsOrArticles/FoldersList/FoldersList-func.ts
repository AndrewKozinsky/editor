import {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import store from 'store/store'
import {AppState} from 'store/rootReducer'
import actions from 'store/rootAction'
import FilesTreeType from 'libs/FilesTree/types'
import {makeFetch, useFetch} from 'requests/fetch'
import getApiUrl from 'requests/apiUrls'
import {getFromLocalStorage, setInLocalStorage} from 'utils/MiscUtils'
import {addOpenPropToFolders, selectItem} from 'libs/FilesTree/StoreManage/manageState'
import filesTreePublicMethods from 'libs/FilesTree/publicMethods'
import {setCompItems, setArtItems} from '../stores'
import { FolderType } from '../types'

// Тип данных по папкам присылаемый с сервера
type FoldersServerResponse = {
    data: {
        folders: {
            content: string
        }
    }
}

/**
 * Хук скачивает с сервера папки и ставит в Хранилище
 * @param {String} type — тип папок: с компонентами или со статьями
 */
export function useGetFoldersFromServerAndPutInEffector(type: FolderType) {
    // id текущего сайта
    const {currentSiteId} = useSelector((store: AppState) => store.sites)

    // id папки или компонента, который должнен быть выделен
    const {currentCompItemId} = useSelector((store: AppState) => store.sites.componentsSection)
    const {currentArtItemId} = useSelector((store: AppState) => store.sites.articlesSection)

    // Хук делающий запрос данных с сервера на получение папок с компонентами
    const {data: componentsResponse, doFetch: doComponentsFetch} =
        useFetch<FoldersServerResponse>(getApiUrl('componentsFolders', currentSiteId), { method: 'GET' })

    // Хук делающий запрос данных с сервера на получение папок со статьями
    const {data: articlesResponse, doFetch: doArticlesFetch} =
        useFetch<FoldersServerResponse>(getApiUrl('articlesFolders', currentSiteId), { method: 'GET' })


    // При загрузке компонента и при изменении выбранного сайта...
    useEffect(function () {
        // Если не передан id сайта, то обнулить папки в Хранилище
        if (!currentSiteId) {
            // Поставить в Эффектор пустые значения по папкам компонентов и статей
            setCompItems(null)
            setArtItems(null)
            return
        }

        if (type === 'components') doComponentsFetch()
        if (type === 'articles') doArticlesFetch()
    }, [currentSiteId, currentCompItemId])

    useEffect(function () {
        // При получении данных по папкам поставить их в Эффектор
        setItemsToEffector(componentsResponse, type, currentCompItemId, setCompItems)
    }, [componentsResponse])

    useEffect(function () {
        // При получении данных по папкам поставить их в Эффектор
        setItemsToEffector(articlesResponse, type, currentArtItemId, setArtItems)
    }, [articlesResponse])
}

/**
 *
 * @param {Object} response — объект ответа от сервера
 * @param {String} type — тип папок: с компонентами или со статьями
 * @param {String} currentItemId — uuid элемента, который должен быть выделен
 * @param {Function} setItems — функция устанавливающая новый массив папок и файлов в Хранилище
 */
function setItemsToEffector(
    response: FoldersServerResponse,
    type: FolderType,
    currentItemId: FilesTreeType.UuId,
    setItems: (items: FilesTreeType.Items) => void
) {
    if (!response?.data?.folders?.content) return

    // Превратить присланный JSON в массив
    let content = JSON.parse(response.data.folders.content)

    // Открыть папки, которые должны быть открытыми
    const openedFoldersUuIds = getOpenedFoldersUuId(type)
    if (openedFoldersUuIds) {
        content = addOpenPropToFolders(content, openedFoldersUuIds)
    }

    // Выделить элемент, который должен быть выделен
    content = selectItem(content, currentItemId).newItems

    // Поставить в Эффектор присланный порядок
    setItems(content)
}


/**
 * Функция сохраняет массив папок и шаблонов компонентов на сервере
 * @param {String} type — тип папок: с компонентами или со статьями.
 * @param {Array} items — массив данных по папкам и файлам.
 */
export async function saveItemsOnServer(type: FolderType, items: FilesTreeType.Items) {
    // Подготовить сохраняемый массив папок и файлов
    const preparedItems = filesTreePublicMethods.prepareItemsToSaveInServer(items)

    const jsonItems = JSON.stringify(preparedItems)

    // Параметры запроса
    const options = {
        method: 'PUT',
        body: JSON.stringify({content: jsonItems})
    }

    // id выбранного сайта
    const siteId = store.getState().sites.currentSiteId

    // Сохранить данные на сервере
    if (type === 'components') {
        await makeFetch(getApiUrl('componentsFolders', siteId), options)
    }
    else if (type === 'articles') {
        await makeFetch(getApiUrl('articlesFolders', siteId), options)
    }
}

/**
 * Функция запускаемая после удаления папки или компонента
 * @param {String} type — тип папок: с компонентами или со статьями.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {String} deletedItemUuid — uuid удалённого элемента
 */
export function afterDeleteItem(type: FolderType, items: FilesTreeType.Items, deletedItemUuid: FilesTreeType.UuId) {
    // Обнулить данные выделенного элемента в Хранилище
    if (type === 'components') {
        store.dispatch( actions.sites.setCurrentComp(null, null) )
    }
    else if (type === 'articles') {
        store.dispatch( actions.sites.setCurrentArt(null, null) )
    }

    // Сохранить данные на сервере
    saveItemsOnServer(type, items)
}

/**
 * Функция запускаемая после добавления новой папки или файла (компонента или статьи)
 * @param {String} type — тип папок: с компонентами или со статьями
 * @param {Object} item — данные нового файла.
 * @param {Array} items — массив данных по папкам и файлам.
 */
export async function afterAddingNewItem(type: FolderType, items: FilesTreeType.Items, item: FilesTreeType.Item) {
    const siteId = store.getState().sites.currentSiteId

    // Параметры запроса
    const options = {
        method: 'POST',
        body: JSON.stringify({
            uuid: item.uuid,
            siteId: siteId,
            name: item.name,
            code: item.content
        })
    }

    // Сохранить данные на сервере
    if (type === 'components') {
        await makeFetch(getApiUrl('component'), options)
    }
    else if (type === 'articles') {
        await makeFetch(getApiUrl('article'), options)
    }
}

/**
 * Функция запускаемая после раскрытия/скрытия любой папки.
 * После этого массив uuid открытых папок записывается в localstorage
 * чтобы при следующем запуске страницы эти папки бы отрисовывались открытыми.
 * @param {String} type — тип папок: с компонентами или со статьями
 * @param {Array} arrUuId — массив uuid раскрытых папок
 */
export function afterCollapseFolder(type: FolderType, arrUuId: FilesTreeType.UuIdArr) {
    if (type === 'components') {
        setInLocalStorage('editorComponentsOpenedFolders', arrUuId)
    }
    else if (type === 'articles') {
        setInLocalStorage('editorArticlesOpenedFolders', arrUuId)
    }
}

/** Функция получает из localStorage uuid открытых папок и возвращает
 *  чтобы при отрисовке компонента они были открытыми */
export function getOpenedFoldersUuId(type: FolderType) {
    if (type === 'components') {
        return getFromLocalStorage('editorComponentsOpenedFolders')
    }
    else if (type === 'articles') {
        return getFromLocalStorage('editorArticlesOpenedFolders')
    }
}

/** Хук возвращает обработчик щелчка по папке или файлу. */
export function useGetOnItemClick(type: FolderType) {
    const dispatch = useDispatch()

    // Поставить uuid элемента и его тип (папка или файл) в качестве выбранного элемента
    return useCallback(function (item: FilesTreeType.Item) {
        if (type === 'components') {
            dispatch(actions.sites.setCurrentComp(item.uuid, item.type))
        }
        else if (type === 'articles') {
            dispatch(actions.sites.setCurrentArt(item.uuid, item.type))
        }
    }, [dispatch])
}
