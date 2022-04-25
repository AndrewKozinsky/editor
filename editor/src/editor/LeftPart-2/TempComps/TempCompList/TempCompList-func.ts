import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import StoreArticleTypes from 'store/article/articleTypes'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleManager from 'articleManager/articleManager'
import componentsPanelMsg from 'messages/componentsPanelMessages'
import articleActions from 'store/article/articleActions'
import useGetLocalStorageProxySelectors from 'store/localStorageProxy/localStorageProxySelectors'
import localStorageProxyActions from 'store/localStorageProxy/localStorageProxyActions'
import { updateDataInTextComp } from 'editor/RightPart-2/ArticleFrame/textTracking/manageUpdatingDTextComp'
import TempCompsTreeType from '../TempCompsTree/types'


export function useIsInsideButtonAllowed() {
    const { tempComps } = useGetArticleSelectors()
    const flashedElemCoords = articleManager.hooks.getFlashedElemCoords()
    const article = articleManager.hooks.getCurrentArticle()

    const [allowed, setAllowed] = useState(false)

    useEffect(function () {
        if (!article) {
            setAllowed(false)
            return
        }

        if (['element', 'rootElement'].includes(flashedElemCoords?.selectedElem?.tagType)) {
            // В качестве id вставляемого (перемещаемого) компонента задан 0 потому что в статье его ещё нет.
            const newCompCanPutInElem = articleManager.canComponentPutInElement(
                tempComps, article.dComps, flashedElemCoords.selectedElem, 0
            )
            setAllowed(!!newCompCanPutInElem)
            return
        }

        setAllowed(false)
    }, [flashedElemCoords])

    return allowed
}

/** The hook gets component template folders array from Store, add required properties to items
 *  and returns updated array */
export function useGetTempCompsFolders() {
    // Component templates folders and Component templates array
    const { tempCompsFolders, tempComps, siteId } = useGetArticleSelectors()

    // Массив объектов с данными о выделенных частях редактора в группах хранимые в LocalStorage.
    const localStorageProxyGroups = useGetLocalStorageProxySelectors().groups

    const currentHistoryItem = articleManager.hooks.getCurrentHistoryItem()

    // Returned folders and component templates structure
    const [folders, setFolders] = useState<TempCompsTreeType.Items>([])

    useEffect(function () {
        if (!tempCompsFolders) return

        // Массив объектов с данными о выделенных частях редактора в группах хранимые в LocalStorage.
        const localStorageProxyGroup = localStorageProxyGroups.find(group => {
            return group.groupId === siteId
        })

        // id открытых папок в панели компонентов
        const openFoldersIdsArr: TempCompsTreeType.FolderItemId[] = localStorageProxyGroup.tempCompsOpenFoldersIdsInArt || []

        // Update component template array items
        const updatedFolders = prepareFoldersAndItemsStructure(
            tempCompsFolders,
            openFoldersIdsArr,
            tempComps,
            currentHistoryItem
        )

        // Текстовый компонент
        const textCompTemp: TempCompsTreeType.Item = {
            id: 0, type: 'file', name: componentsPanelMsg.textComponent
        }

        // Добавление в массив текстовый компонент если его там нет
        if (updatedFolders[0]?.id !== 0) {
            updatedFolders.unshift(textCompTemp)
        }

        // Sat updated folders and component templates structure
        setFolders(updatedFolders)
    }, [tempCompsFolders])

    return folders
}

/**
 * The function pass through folders and component templates structure and adds required properties.
 * @param {Array} tempCompsFolders — component templates folders component templates structure
 * @param {Array} openIdArr — ids of the opened folders in
 * @param {Array} tempCompsArr — component templates array
 * @param {Object} currentHistoryItem — article history item
 */
function prepareFoldersAndItemsStructure(
    tempCompsFolders: TempCompsTreeType.Items,
    openIdArr: TempCompsTreeType.FolderItemId[],
    tempCompsArr: TempCompTypes.TempComps,
    currentHistoryItem: StoreArticleTypes.HistoryItem
): TempCompsTreeType.Items {
    return tempCompsFolders.map((item: TempCompsTreeType.Item) => {
        // If it is folder, and it must be open, then add open property
        if (item.type === 'folder') {
            // Если id этой папки есть в массиве с идентификаторами открытых папок, то открыть её.
            if (openIdArr.find(id => id === item.id)) {
                item.open = true
            }

            if (item.content?.length) {
                item.content = prepareFoldersAndItemsStructure(
                    item.content, openIdArr, tempCompsArr, currentHistoryItem
                )
            }
        }

        return  item
    })
}


/** The hook returns a function runs after component template folder was threw opened or collapsed */
export function useGetAfterCollapseFolder() {
    const { siteId } = useGetArticleSelectors()
    const dispatch = useDispatch()

    return useCallback(function (folders: TempCompsTreeType.Items, openIdArr: TempCompsTreeType.FolderItemId[]) {
        // Set a new folders structure list in the Store
        dispatch(articleActions.setTempCompFolders(folders))

        // Save array of folder's id in the LocalStorage proxy
        dispatch( localStorageProxyActions.setGroup({groupId: siteId, propName: 'tempCompsOpenFoldersIdsInArt', propValue: openIdArr}) )
    }, [siteId])
}


/** Хук возвращает обработчики для кнопок вставки нового компонента до или после выделенного  */
export function useGetOnClickBeforeBtn(direction: 'before' | 'after') {
    const dispatch = useDispatch()

    // Current article
    const historyItem = articleManager.hooks.getCurrentHistoryItem()

    // Selected and hovered components/elements coordinates object
    const flashedElemCoords = articleManager.hooks.getFlashedElemCoords()

    // Component templates array
    const { tempComps } = useGetArticleSelectors()

    // Поставить id элемента и его тип (папка или файл) в качестве выбранного элемента
    return useCallback(function (tempCompId: TempCompsTreeType.FileItemId) {

        // Обновить данные в текстовом компоненте если это требуется
        updateDataInTextComp('common')

        // Если число больше нуля, то хотят вставить обычный компонент, если 0, то текстовый
        const tempCompIdUpdated = tempCompId > 0 ? tempCompId : 'text'

        const selectedCompId = flashedElemCoords.selectedElem.dataCompId

        let compsAndMaxCompId: StoreArticleTypes.CreateNewHistoryItem
        if (selectedCompId) {
            compsAndMaxCompId = articleManager.createCompAndSetItNearComp(
                direction, historyItem.article, tempComps, tempCompIdUpdated, selectedCompId
            )
        }
        else {
            compsAndMaxCompId = articleManager.createCompAndSetInRootOfArticle(
                direction, historyItem.article, tempComps, tempCompIdUpdated
            )
        }

        dispatch(articleActions.createAndSetHistoryItem(
            compsAndMaxCompId
        ))
    }, [flashedElemCoords, historyItem, tempComps])
}


/** The hook returns Inside btn click handler  */
export function useGetOnClickInsideBtn() {
    const dispatch = useDispatch()

    // Current article
    const historyItem = articleManager.hooks.getCurrentHistoryItem()

    // Selected and hovered components/elements coordinates object
    const flashedElemCoords = articleManager.hooks.getFlashedElemCoords()

    // Component template array
    const { tempComps } = useGetArticleSelectors()

    // Поставить id элемента и его тип (папка или файл) в качестве выбранного элемента
    return useCallback(function (tempCompId: TempCompsTreeType.FileItemId) {
        // Обновить данные в текстовом компоненте если это требуется
        updateDataInTextComp('common')

        // Если число больше нуля, то хотят вставить обычный компонент, если 0, то текстовый
        const tempCompIdUpdated = tempCompId > 0 ? tempCompId : 'text'

        const { selectedElem } = flashedElemCoords

        const componentsAndMaxCompId = articleManager.createCompAndSetInElem(
            historyItem.article, tempComps, tempCompIdUpdated, selectedElem
        )

        dispatch(articleActions.createAndSetHistoryItem(
            componentsAndMaxCompId
        ))
    }, [dispatch, historyItem, flashedElemCoords, tempComps])
}
