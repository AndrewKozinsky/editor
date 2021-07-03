import {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import actions from 'store/rootAction'
import {AppState} from 'store/rootReducer'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import TempCompFilesTreeType from '../TempCompFilesTree/types'
import articleManager from '../../RightPart-2/articleManager/articleManager'
import {getFromLocalStorage} from 'utils/MiscUtils'
import FilesTreeType from 'types/filesTree'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import StoreArticleTypes from 'store/article/articleTypes'
import {
    createCompAndSetInElem,
    createCompAndSetInEndOfArticle,
    CreateCompFnReturnType
} from '../../RightPart-2/articleManager/insert/insert'


/** The hooks gets component template folders array from Store, add required properties to items
 *  and returns updated array */
export function useGetTempCompsFolders() {
    // Component templates folders
    const { tempCompsFolders } = useSelector((store: AppState) => store.article)

    // Component templates array
    const templatesArr = useSelector((store: AppState) => store.article.tempComps)

    // Selected and hovered components/elements coordinates object
    const flashedElemCoords = articleManager.hooks.getFlashedElemCoords()

    // Current article
    const article = articleManager.hooks.getArticle()

    // Returned folders and component templates structure
    const [folders, setFolders] = useState<TempCompFilesTreeType.Items>([])

    useEffect(function () {
        // Return function if data is not ready yet.
        if (!tempCompsFolders || !flashedElemCoords) return

        // Get opened component template folders uuid array to open these folders
        const openUuIdArr: null | FilesTreeType.UuIdArr = getFromLocalStorage('article')?.openCompFoldersUuIds

        // Update component template array items
        const updatedFolders = prepareFoldersAndItemsStructure(
            tempCompsFolders, openUuIdArr, flashedElemCoords.selectedElem, templatesArr, article
        )

        // Save updated folders and component templates structure
        setFolders(updatedFolders)
    }, [tempCompsFolders, flashedElemCoords, article])

    return folders
}

/**
 * The function pass through folders and component templates structure and adds required properties.
 * @param {Array} tempCompsFolders — component templates folders component templates structure
 * @param {Array} openUuIdArr — uuis of the opened folders in
 * @param {Object} selectedElem — object with coordinates of the selected component/element
 * @param {Array} templatesArr — component templates array
 * @param {Object} article — article object
 */
function prepareFoldersAndItemsStructure(
    tempCompsFolders: FilesTreeType.Items,
    openUuIdArr: null | FilesTreeType.UuIdArr,
    selectedElem: StoreArticleTypes.HoveredElem,
    templatesArr: TempCompTypes.TempComps,
    article: ArticleTypes.Article
): TempCompFilesTreeType.Items {
    return tempCompsFolders.map((item: TempCompFilesTreeType.Item) => {
        // It it is folder and it must be open, then add open property
        if (item.type === 'folder') {
            if (openUuIdArr.find(uuid => uuid === item.uuid)) {
                item.open = true
            }
            return item
        }
        // If it is a component template calculate can I insert it in selected element...
        else {
            let isAllowed = false

            // If component is selected...
            if (!selectedElem.dataCompId && selectedElem.dataElemId) {
                // Get selected component data
                const targetDataComp = this.getComponent(article.components, selectedElem.dataCompId)
                // If selected component is a text componet, that I cannot insert component into it
                isAllowed = targetDataComp.type === 'textComponent'
            }
            // If element is selected...
            else if (selectedElem.dataCompId && selectedElem.dataElemId) {
                // Get to know can I insert component in this element and result seve in isAllowed variable
                isAllowed = articleManager.canComponentPutInElement(
                    templatesArr, article.components, selectedElem.dataCompId, selectedElem.dataElemId
                )
            }

            // If I can insert a new component to selected component/element then to show appropriate button
            item.insideButtonAllowed = isAllowed
            return  item
        }
    })
}




/** The hook returns a function runs after component template folder was threw opened or collapsed */
export function useGetAfterCollapseFolder() {
    const dispatch = useDispatch()

    return useCallback(function (folders: TempCompFilesTreeType.Items, openUuIdArr: FilesTreeType.UuIdArr) {
        dispatch(actions.article.setTempCompFolders(folders))

        articleManager.supplementArtMarksInLocalStorage({
            openCompFoldersUuIds: openUuIdArr
        })
    }, [])
}


/** The hook returns Next btn click handler  */
export function useGetOnClickNextBtn() {
    const dispatch = useDispatch()

    // Current article
    const article = articleManager.hooks.getArticle()

    // Selected and hovered components/elements coordinates object
    const flashedElemCoords = articleManager.hooks.getFlashedElemCoords()

    // Component template array
    const {tempComps} = useSelector((store: AppState) => store.article)

    // Поставить uuid элемента и его тип (папка или файл) в качестве выбранного элемента
    return useCallback(function (tempCompId: FilesTreeType.UuId) {
        const selectedCompId = flashedElemCoords.selectedElem.dataCompId

        let componentsAndMaxCompId: CreateCompFnReturnType
        if (selectedCompId) {
            componentsAndMaxCompId = articleManager.createCompAndSetAfterComp(
                article, tempComps, tempCompId, selectedCompId
            )
        }
        else {
            componentsAndMaxCompId = articleManager.createCompAndSetInEndOfArticle(
                article, tempComps, tempCompId
            )
        }

        dispatch(actions.article.createAndSetHistoryItem(
            componentsAndMaxCompId
        ))

    }, [dispatch, article, flashedElemCoords, tempComps])
}


/** The hook returns Inside btn click handler  */
export function useGetOnClickInsideBtn() {
    const dispatch = useDispatch()

    // Current article
    const article = articleManager.hooks.getArticle()

    // Selected and hovered components/elements coordinates object
    const flashedElemCoords = articleManager.hooks.getFlashedElemCoords()

    // Component template array
    const {tempComps} = useSelector((store: AppState) => store.article)

    // Поставить uuid элемента и его тип (папка или файл) в качестве выбранного элемента
    return useCallback(function (tempCompId: FilesTreeType.UuId) {
        const selectedElemCoords = flashedElemCoords.selectedElem

        const componentsAndMaxCompId = articleManager.createCompAndSetInElem(
            article, tempComps, tempCompId,
            selectedElemCoords.dataCompId,
            selectedElemCoords.dataElemId
        )

        dispatch(actions.article.createAndSetHistoryItem(
            componentsAndMaxCompId
        ))
    }, [dispatch, article, flashedElemCoords, tempComps])
}
