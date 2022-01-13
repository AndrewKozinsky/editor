import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import actions from 'store/rootAction'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import StoreArticleTypes from 'store/article/articleTypes'
import useGetArticleSelectors from 'store/article/articleSelectors'
import TempCompFilesTreeType from '../TempCompFilesTree/types'
import articleManager from 'articleManager/articleManager'
import { getFromLocalStorage, setInLocalStorage } from 'src/utils/miscUtils'
import config from 'utils/config'


/** The hook gets component template folders array from Store, add required properties to items
 *  and returns updated array */
export function useGetTempCompsFolders() {
    // Component templates folders and Component templates array
    const { tempCompsFolders, tempComps } = useGetArticleSelectors()

    // Selected and hovered components/elements coordinates object
    const flashedElemCoords = articleManager.hooks.getFlashedElemCoords()
    const currentHistoryItem = articleManager.hooks.getCurrentHistoryItem()

    // Координаты выделенного элемента и его тип
    const [selectedElem, setSelectedElem] = useState<StoreArticleTypes.FlashedElem>(null)

    // Returned folders and component templates structure
    const [folders, setFolders] = useState<TempCompFilesTreeType.Items>([])

    useEffect(function () {
        if (!tempCompsFolders || !flashedElemCoords) return
        setSelectedElem(flashedElemCoords.selectedElem)
    }, [
        tempCompsFolders, tempComps,
        flashedElemCoords, currentHistoryItem
    ])

    useEffect(function () {
        if (!flashedElemCoords || !selectedElem) return

        if(tempCompsFolders) {
            // Get opened component template folders id array to open these folders
            const openFoldersIdsArr: TempCompFilesTreeType.FolderItemId[] =
                getFromLocalStorage(config.ls.editOpenCompFoldersIds) || []

            // Update component template array items
            const updatedFolders = prepareFoldersAndItemsStructure(
                //@ts-ignore
                tempCompsFolders,
                openFoldersIdsArr,
                selectedElem,
                tempComps,
                currentHistoryItem
            )

            // Sat updated folders and component templates structure
            setFolders(updatedFolders)
        }
        else {
            setFolders(null)
        }
    }, [selectedElem, tempCompsFolders])

    return folders
}

/**
 * The function pass through folders and component templates structure and adds required properties.
 * @param {Array} tempCompsFolders — component templates folders component templates structure
 * @param {Array} openIdArr — ids of the opened folders in
 * @param {Object} selectedElem — object with coordinates of the selected component/element
 * @param {Array} tempCompsArr — component templates array
 * @param {Object} currentHistoryItem — article history item
 */
function prepareFoldersAndItemsStructure(
    tempCompsFolders: TempCompFilesTreeType.Items,
    openIdArr: TempCompFilesTreeType.FolderItemId[],
    selectedElem: StoreArticleTypes.FlashedElem,
    tempCompsArr: TempCompTypes.TempComps,
    currentHistoryItem: StoreArticleTypes.HistoryItem
): TempCompFilesTreeType.Items {
    return tempCompsFolders.map((item: TempCompFilesTreeType.Item) => {
        // If it is folder, and it must be open, then add open property
        if (item.type === 'folder') {
            // Если id этой папки есть в массиве с идентификаторами открытых папок, то открыть её.
            if (openIdArr.find(id => id === item.id)) {
                item.open = true
            }

            if (item.content?.length) {
                item.content = prepareFoldersAndItemsStructure(
                    item.content, openIdArr, selectedElem, tempCompsArr, currentHistoryItem
                )
            }

            return item
        }
        // If it is a component template calculate can I insert it in selected element...
        else {
            let afterButtonAllowed = false
            let insideButtonAllowed = false

            // If a no component selected I can insert a new component in the root of an article
            if (!selectedElem.tagType) {
                afterButtonAllowed = true
            }
            // Если выделен компонент или корневой элемент, то разрешить вставлять новый компонент до или после
            if (['component', 'rootElement'].includes(selectedElem.tagType)) {
                afterButtonAllowed = true
            }
            // Если выделен элемент...
            if (selectedElem.tagType === 'element') {
                // Получить его шаблон, чтобы узнать, принимает ли он только текстовый компонент или обычные компоненты

                const thisTempComp = articleManager.getTempElemByDataCompIdAndDataElemId(
                    currentHistoryItem.article.dComps, selectedElem.dataCompId, selectedElem.dataElemId, tempCompsArr
                )
                if (thisTempComp && !thisTempComp.elemTextInside) {
                    insideButtonAllowed = true
                }
            }

            item.afterButtonAllowed = afterButtonAllowed
            item.insideButtonAllowed = insideButtonAllowed

            return  item
        }
    })
}


/** The hook returns a function runs after component template folder was threw opened or collapsed */
export function useGetAfterCollapseFolder() {
    const dispatch = useDispatch()

    return useCallback(function (folders: TempCompFilesTreeType.Items, openIdArr: TempCompFilesTreeType.FolderItemId[]) {
        // Set a new folders structure list in the Store
        dispatch(actions.article.setTempCompFolders(folders))

        // Save array of folder's id in the Local storage
        setInLocalStorage(config.ls.editOpenCompFoldersIds, openIdArr)
    }, [])
}


/** The hook returns Next btn click handler  */
export function useGetOnClickBeforeBtn(direction: 'before' | 'after') {
    const dispatch = useDispatch()

    // Current article
    const historyItem = articleManager.hooks.getCurrentHistoryItem()

    // Selected and hovered components/elements coordinates object
    const flashedElemCoords = articleManager.hooks.getFlashedElemCoords()

    // Component templates array
    const { tempComps } = useGetArticleSelectors()

    // Поставить id элемента и его тип (папка или файл) в качестве выбранного элемента
    return useCallback(function (tempCompId: TempCompFilesTreeType.FileItemId) {
        const selectedCompId = flashedElemCoords.selectedElem.dataCompId

        let compsAndMaxCompId: StoreArticleTypes.CreateNewHistoryItem
        if (selectedCompId) {
            compsAndMaxCompId = articleManager.createCompAndSetItNearComp(
                direction, historyItem.article, tempComps, tempCompId, selectedCompId
            )
        }
        else {
            let place: 'begin' | 'end' =
                direction === 'before'
                    ? 'begin' : 'end'

            compsAndMaxCompId = articleManager.createCompAndSetInRootOfArticle(
                place, historyItem.article, tempComps, tempCompId
            )
        }

        dispatch(actions.article.createAndSetHistoryItem(
            compsAndMaxCompId
        ))
    }, [dispatch, historyItem, flashedElemCoords, tempComps])
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
    return useCallback(function (tempCompId: TempCompFilesTreeType.FileItemId) {
        const {selectedElem} = flashedElemCoords

        const componentsAndMaxCompId = articleManager.createCompAndSetInElem(
            historyItem.article, tempComps, tempCompId, selectedElem
        )

        dispatch(actions.article.createAndSetHistoryItem(
            componentsAndMaxCompId
        ))
    }, [dispatch, historyItem, flashedElemCoords, tempComps])
}
