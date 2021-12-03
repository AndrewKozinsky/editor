import {useCallback, useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import actions from 'store/rootAction'
// import ArticleTypes from 'store/article/codeType/articleCodeType'
// import TempCompTypes from 'store/article/codeType/tempCompCodeType'
// import StoreArticleTypes from 'store/article/articleTypes'
import TempCompFilesTreeType from '../TempCompFilesTree/types'
import articleManager from 'editor/articleManager/articleManager'
import {getFromLocalStorage, setInLocalStorage} from 'utils/MiscUtils'
import FilesTreeType from 'types/filesTree'
// import { CreateCompFnReturnType } from 'editor/RightPart-2/articleManager/insert'
import useGetArticleSelectors from 'store/article/articleSelectors'
import config from 'utils/config'


/** The hooks gets component template folders array from Store, add required properties to items
 *  and returns updated array */
export function useGetTempCompsFolders() {
    // Component templates folders and Component templates array
    const { tempCompsFolders, tempComps } = useGetArticleSelectors()

    // Selected and hovered components/elements coordinates object
    // const flashedElemCoords = articleManager.hooks.getFlashedElemCoords()

    // Current article
    // const article = articleManager.hooks.getArticle()

    // Returned folders and component templates structure
    const [folders, setFolders] = useState<TempCompFilesTreeType.Items>([])

    useEffect(function () {
        // if (!flashedElemCoords) return

        // Return function if data is not ready yet.
        if (!tempCompsFolders) return

        // Get opened component template folders id array to open these folders
        const openIdArr: null | FilesTreeType.IdArr =
            getFromLocalStorage(config.ls.editOpenCompFoldersIds) || []

        // Update component template array items
        const updatedFolders = prepareFoldersAndItemsStructure(
            tempCompsFolders,
            openIdArr,
            // flashedElemCoords.selectedElem,
            // tempComps,
            // article
        )

        // Save updated folders and component templates structure
        setFolders(updatedFolders)
    }, [
        tempCompsFolders, tempComps,
        // flashedElemCoords, article
    ])

    return folders
}

/**
 * The function pass through folders and component templates structure and adds required properties.
 * @param {Array} tempCompsFolders — component templates folders component templates structure
 * @param {Array} openIdArr — ids of the opened folders in
 * @param {Object} selectedElem — object with coordinates of the selected component/element
 * @param {Array} tempCompsArr — component templates array
 * @param {Object} article — article object
 */
function prepareFoldersAndItemsStructure(
    tempCompsFolders: FilesTreeType.Items,
    openIdArr: FilesTreeType.IdArr,
    // selectedElem: StoreArticleTypes.HoveredElem,
    // tempCompsArr: TempCompTypes.TempComps,
    // article: ArticleTypes.Article
): TempCompFilesTreeType.Items {
    return tempCompsFolders.map((item: TempCompFilesTreeType.Item) => {
        // It it is folder and it must be open, then add open property
        if (item.type === 'folder') {
            // Если id этой папки есть в массиве с идентификаторами открытых папок, то открыть её.
            if (openIdArr.find(id => id === item.id)) {
                item.open = true
            }

            /*if (item.content?.length) {
                item.content = prepareFoldersAndItemsStructure(item.content, openIdArr, selectedElem, tempCompsArr, article)
            }*/

            return item
        }
        // If it is a component template calculate can I insert it in selected element...
        else {
            // let afterButtonAllowed = false
            // let insideButtonAllowed = false

            // It a no component selected I can insert a new component in the root of an article
            /*if (!selectedElem.dataCompId && !selectedElem.dataElemId) {
                afterButtonAllowed = true
            }*/
            // If a component is selected...
            /*else if (selectedElem.dataCompId && !selectedElem.dataElemId) {
                // If selected component is not a text component, that I can insert component before or after it
                if (selectedElem.type !== 'textComponent') {
                    afterButtonAllowed = true
                }
            }*/
            // If an element is selected
            /*else {
                // Get to know can I insert component in this element
                insideButtonAllowed = articleManager.canComponentPutInElement(
                    tempCompsArr, article.components, selectedElem.dataCompId, selectedElem.dataElemId
                )
                afterButtonAllowed = true
            }*/

            // item.afterButtonAllowed = afterButtonAllowed
            // item.insideButtonAllowed = insideButtonAllowed

            return  item
        }
    })
}


/** The hook returns a function runs after component template folder was threw opened or collapsed */
export function useGetAfterCollapseFolder() {
    const dispatch = useDispatch()

    return useCallback(function (folders: TempCompFilesTreeType.Items, openIdArr: FilesTreeType.IdArr) {
        // Set a new folders structure list in the Store
        dispatch(actions.article.setTempCompFolders(folders))

        // Save array of folder's id in the Local storage
        setInLocalStorage(config.ls.editOpenCompFoldersIds, openIdArr)
    }, [])
}


/** The hook returns Next btn click handler  */
export function useGetOnClickBeforeBtn(direction: 'before' | 'after') {
    // const dispatch = useDispatch()

    // Current article
    // const article = articleManager.hooks.getArticle()

    // Selected and hovered components/elements coordinates object
    // const flashedElemCoords = articleManager.hooks.getFlashedElemCoords()

    // Component templates array
    // const {tempComps} = useSelector((store: AppStateType) => store.article)

    // Поставить uuid элемента и его тип (папка или файл) в качестве выбранного элемента
    return useCallback(function (tempCompId: FilesTreeType.Id) {
        // const selectedCompId = flashedElemCoords.selectedElem.dataCompId

        // let componentsAndMaxCompId: CreateCompFnReturnType
        /*if (selectedCompId) {
            componentsAndMaxCompId = articleManager.createCompAndSetItNearComp(
                direction, article, tempComps, tempCompId, selectedCompId
            )
        }*/
        /*else {
            let place: 'begin' | 'end' = direction === 'before' ? 'begin' : 'end'
            componentsAndMaxCompId = articleManager.createCompAndSetInRootOfArticle(
                place, article, tempComps, tempCompId
            )
        }*/

        /*dispatch(actions.article.createAndSetHistoryItem(
            componentsAndMaxCompId
        ))*/

    }, [
        // dispatch, article, flashedElemCoords, tempComps
    ])
}


/** The hook returns Inside btn click handler  */
export function useGetOnClickInsideBtn() {
    // const dispatch = useDispatch()

    // Current article
    // const article = articleManager.hooks.getArticle()

    // Selected and hovered components/elements coordinates object
    // const flashedElemCoords = articleManager.hooks.getFlashedElemCoords()

    // Component template array
    // const {tempComps} = useSelector((store: AppStateType) => store.article)

    // Поставить id элемента и его тип (папка или файл) в качестве выбранного элемента
    return useCallback(function (tempCompId: FilesTreeType.Id) {
        // const selectedElemCoords = flashedElemCoords.selectedElem

        /*const componentsAndMaxCompId = articleManager.createCompAndSetInElem(
            article, tempComps, tempCompId,
            selectedElemCoords.dataCompId,
            selectedElemCoords.dataElemId
        )*/

        /*dispatch(actions.article.createAndSetHistoryItem(
            componentsAndMaxCompId
        ))*/
    }, [
        // dispatch, article, flashedElemCoords, tempComps
    ])

}
