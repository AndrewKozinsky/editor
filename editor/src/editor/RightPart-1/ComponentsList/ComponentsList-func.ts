import {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import store from 'store/store'
import {AppState} from 'store/rootReducer'
import actions from 'store/rootAction'
import FilesTreeType from 'libs/FilesTree/types'
import {makeFetch, useFetch} from 'requests/fetch'
import getApiUrl from 'requests/apiUrls'
import {getFromLocalStorage, setInLocalStorage} from 'utils/MiscUtils'
import {addOpenPropToFolders, selectItem, setItems} from 'libs/FilesTree/StoreManage/manageState'
import filesTreePublicMethods from 'libs/FilesTree/publicMethods'


// Тип данных присылаемый с сервера
type GetComponentsFoldersServerResponse = {
    data: {
        folders: {
            content: string
        }
    }
}

/** Хук скачивает с сервера порядок шаблонов компонентов и ставит в Хранилище */
export function useGetFoldersFromServerAndPutInEffector() {
    // id текущего сайта
    const {currentSiteId} = useSelector((store: AppState) => store.sites)

    // id папки или компонента, который должнен быть выделен
    const {currentCompItemId} = useSelector((store: AppState) => store.sites.componentsSection)

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    const {data: response, doFetch} =
        useFetch<GetComponentsFoldersServerResponse>(getApiUrl('componentsFolders', currentSiteId), { method: 'GET' })

    // При загрузке компонента и при изменении выбранного сайта...
    useEffect(function () {
        // Запрос на получение порядка шаблонов компонентов
        // Если не передан id сайта, то обнулить порядок шаблонов компонентов в Хранилище
        // потому что выбрали новый сайт
        if (!currentSiteId) {
            // Поставить в Эффектор нулевой порядок
            setItems(null)
            return
        }

        doFetch()
    }, [currentSiteId, currentCompItemId])

    useEffect(function () {
        if (!response?.data?.folders?.content) return

        // Превратить присланный JSON в массив
        let content = JSON.parse(response.data.folders.content)

        // Открыть папки, которые должны быть открытыми
        content = addOpenPropToFolders(content, getOpenedFoldersUuId())

        // Выделить элемент, который должен быть выделен
        content = selectItem(content, currentCompItemId).newItems

        // Поставить в Эффектор присланный порядок
        setItems(content)
    }, [response])
}


/**
 * Функция сохраняет массив папок и шаблонов компонентов на сервере
 * @param {Array} items — массив данных по папкам и файлам.
 */
export async function saveItemsOnServer(items: FilesTreeType.Items) {
    // Подготовить сохраняемый массив папок и файлов
    const preparedItems = filesTreePublicMethods.prepareItemsToSaveInServer(items)

    const jsonItems = JSON.stringify(preparedItems)

    // Параметры запроса
    const options = {
        method: 'PUT',
        body: JSON.stringify({content: jsonItems})
    }

    // id выбранного сайта и язык интерфейса
    const siteId = store.getState().sites.currentSiteId
    const lang = store.getState().settings.editorLanguage

    // Сохранить данные на сервере
    await makeFetch(
        getApiUrl('componentsFolders', siteId), options, lang
    )
}

/**
 * Функция запускаемая после добавления новой папки или шаблона компонента
 * @param {Object} item — данные нового шаблона компонента
 * @param {Array} items — массив данных по папкам и файлам.
 */
export async function afterAddingNewItem(items: FilesTreeType.Items, item: FilesTreeType.Item) {
    const siteId = store.getState().sites.currentSiteId
    const lang = store.getState().settings.editorLanguage

    // Параметры запроса
    const options = {
        method: 'POST',
        body: JSON.stringify({
            uuid: item.uuid,
            siteId: siteId,
            code: item.content
        })
    }

    // Сохранить данные на сервере
    await makeFetch(
        getApiUrl('component'), options, lang
    )
}

/**
 * Функция запускаемая после раскрытия/скрытия любой папки.
 * После этого массив uuid открытых папокзаписывается в localstorage
 * чтобы при следующем запуске страницы эти папки бы отрисовывались открытыми.
 * @param {Array} arrUuId — массив uuid раскрытых папок
 */
export function afterCollapseFolder(arrUuId: FilesTreeType.UuIdArr) {
    setInLocalStorage('editorComponentsOpenedFolders', arrUuId)
}

/** Функция получает из localStorage uuid открытых папок и возвращает
 *  чтобы при отрисовке компонента они были открытыми */
export function getOpenedFoldersUuId() {
    return getFromLocalStorage('editorComponentsOpenedFolders')
}

/** Хук возвращает обработчик щелчка по папке или файлу. */
export function useGetOnItemClick() {
    const dispatch = useDispatch()

    return useCallback(function (item: FilesTreeType.Item) {
        // Поставить uuid элемента и его тип (папка или файл) в качестве выбранного элемента в разделе шаблонов компонентов
        dispatch(actions.sites.setCurrentComp(item.uuid, item.type))
    }, [dispatch])
}