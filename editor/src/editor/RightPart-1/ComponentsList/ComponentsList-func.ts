import {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import actions from 'store/rootAction'
import FilesTreeType from 'libs/FilesTree/types'
import { prepareItemsToSaveInServer } from 'libs/FilesTree/FilesTree/manageStateDataFunc'
import {makeFetch} from 'requests/fetch'
import getApiUrl from 'requests/apiUrls'
import store from 'store/store'
import {getFromLocalStorage, setInLocalStorage} from 'utils/MiscUtils'


/** Хук скачивает с сервера порядок шаблонов компонентов и ставит в Хранилище */
export function useFetchComponentsOrder() {
    const dispatch = useDispatch()
    // id текущего сайта
    const {currentSiteId} = useSelector((store: AppState) => store.sites)

    // При загрузке компонента и при изменении выбранного сайта...
    useEffect(function () {
        // Запрос на получение порядка шаблонов компонентов и установка в Хранилище
        dispatch( actions.sites.requestComponentsOrder() )
    }, [currentSiteId])
}

/**
 * При изменении дерева папок и файлов сохранить данные на сервере
 * @param {Array} items — массив данных по папкам и файлам.
 */
export async function changeTreeHandler(items: FilesTreeType.Items) {

    // Подготовить сохраняемый массив папок и файлов
    const preparedItems = prepareItemsToSaveInServer(items)

    // Параметры запроса
    const options = {
        method: 'PATCH',
        body: JSON.stringify({content: preparedItems})
    }

    const siteId = store.getState().sites.currentSiteId
    const lang = store.getState().settings.editorLanguage

    // Сохранить данные на сервере
    await makeFetch(
        getApiUrl('componentsOrder', siteId), options, lang
    )
}

/**
 * Функция запускаемая после добавления нового шаблона компонента
 * @param {Object} file — данные нового шаблона компонента
 */
export async function addNewFile(file: FilesTreeType.Item) {
    const siteId = store.getState().sites.currentSiteId
    const lang = store.getState().settings.editorLanguage

    // Параметры запроса
    const options = {
        method: 'POST',
        body: JSON.stringify({
            uuid: file.uuid,
            siteId: siteId,
            code: file.content
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
export function collapseFolder(arrUuId: FilesTreeType.UuIdArr) {
    setInLocalStorage('editorComponentsOpenedFolders', arrUuId)
}

/**
 * Функция получает из localStorage uuid открытых папок и возвращает
 * чтобы при отрисовке компонента они были открытыми
 */
export function getOpenedFoldersUuId() {
    return getFromLocalStorage('editorComponentsOpenedFolders')
}

/** Хук возвращает обработчик щелчка по папке или файлу. */
export function useGetOnItemClick() {
    const dispatch = useDispatch()

    return useCallback(function (item: FilesTreeType.Item) {
        // Поставить uuid элемента в качестве текущего
        dispatch(actions.sites.setCurrentComponentId(item.uuid))
    }, [dispatch])
}