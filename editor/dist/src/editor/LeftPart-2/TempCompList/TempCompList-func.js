import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from 'store/rootAction';
import useGetArticleSelectors from 'store/article/articleSelectors';
import articleManager from 'articleManager/articleManager';
import { getFromLocalStorage, setInLocalStorage } from 'utils/MiscUtils';
import config from 'utils/config';
/** The hook gets component template folders array from Store, add required properties to items
 *  and returns updated array */
export function useGetTempCompsFolders() {
    // Component templates folders and Component templates array
    const { tempCompsFolders, tempComps } = useGetArticleSelectors();
    // Selected and hovered components/elements coordinates object
    const flashedElemCoords = articleManager.hooks.getFlashedElemCoords();
    const currentHistoryItem = articleManager.hooks.getCurrentHistoryItem();
    const [selectedElem, setSelectedElem] = useState(null);
    // Returned folders and component templates structure
    const [folders, setFolders] = useState([]);
    useEffect(function () {
        if (!tempCompsFolders || !flashedElemCoords)
            return;
        setSelectedElem(flashedElemCoords.selectedElem);
    }, [
        tempCompsFolders, tempComps,
        flashedElemCoords, currentHistoryItem
    ]);
    useEffect(function () {
        if (!flashedElemCoords || !selectedElem)
            return;
        if (tempCompsFolders) {
            // Get opened component template folders id array to open these folders
            const openFoldersIdsArr = getFromLocalStorage(config.ls.editOpenCompFoldersIds) || [];
            // Update component template array items
            const updatedFolders = prepareFoldersAndItemsStructure(tempCompsFolders, openFoldersIdsArr, selectedElem, tempComps, currentHistoryItem);
            // Sat updated folders and component templates structure
            setFolders(updatedFolders);
        }
        else {
            setFolders(null);
        }
    }, [selectedElem, tempCompsFolders]);
    return folders;
}
/**
 * The function pass through folders and component templates structure and adds required properties.
 * @param {Array} tempCompsFolders — component templates folders component templates structure
 * @param {Array} openIdArr — ids of the opened folders in
 * @param {Object} selectedElem — object with coordinates of the selected component/element
 * @param {Array} tempCompsArr — component templates array
 * @param {Object} currentHistoryItem — article history item
 */
function prepareFoldersAndItemsStructure(tempCompsFolders, openIdArr, selectedElem, tempCompsArr, currentHistoryItem) {
    return tempCompsFolders.map((item) => {
        var _a;
        // If it is folder, and it must be open, then add open property
        if (item.type === 'folder') {
            // Если id этой папки есть в массиве с идентификаторами открытых папок, то открыть её.
            if (openIdArr.find(id => id === item.id)) {
                item.open = true;
            }
            if ((_a = item.content) === null || _a === void 0 ? void 0 : _a.length) {
                item.content = prepareFoldersAndItemsStructure(item.content, openIdArr, selectedElem, tempCompsArr, currentHistoryItem);
            }
            return item;
        }
        // If it is a component template calculate can I insert it in selected element...
        else {
            let afterButtonAllowed = false;
            let insideButtonAllowed = false;
            // If a no component selected I can insert a new component in the root of an article
            if (!selectedElem.tagType) {
                afterButtonAllowed = true;
            }
            // Если выделен компонент или корневой элемент, то разрешить вставлять новый компонент до или после
            if (['component', 'rootElement'].includes(selectedElem.tagType)) {
                afterButtonAllowed = true;
            }
            // Если выделен элемент...
            if (selectedElem.tagType === 'element') {
                // Получить его шаблон, чтобы узнать, принимает ли он только текстовый компонент или обычные компоненты
                const thisTempComp = articleManager.getTempElemByDataCompIdAndDataElemId(currentHistoryItem.article.dComps, selectedElem.dataCompId, selectedElem.dataElemId, tempCompsArr);
                if (thisTempComp && !thisTempComp.elemTextInside) {
                    insideButtonAllowed = true;
                }
            }
            item.afterButtonAllowed = afterButtonAllowed;
            item.insideButtonAllowed = insideButtonAllowed;
            return item;
        }
    });
}
/** The hook returns a function runs after component template folder was threw opened or collapsed */
export function useGetAfterCollapseFolder() {
    const dispatch = useDispatch();
    return useCallback(function (folders, openIdArr) {
        // Set a new folders structure list in the Store
        dispatch(actions.article.setTempCompFolders(folders));
        // Save array of folder's id in the Local storage
        setInLocalStorage(config.ls.editOpenCompFoldersIds, openIdArr);
    }, []);
}
/** The hook returns Next btn click handler  */
export function useGetOnClickBeforeBtn(direction) {
    const dispatch = useDispatch();
    // Current article
    const historyItem = articleManager.hooks.getCurrentHistoryItem();
    // Selected and hovered components/elements coordinates object
    const flashedElemCoords = articleManager.hooks.getFlashedElemCoords();
    // Component templates array
    const { tempComps } = useGetArticleSelectors();
    // Поставить id элемента и его тип (папка или файл) в качестве выбранного элемента
    return useCallback(function (tempCompId) {
        const selectedCompId = flashedElemCoords.selectedElem.dataCompId;
        let compsAndMaxCompId;
        if (selectedCompId) {
            compsAndMaxCompId = articleManager.createCompAndSetItNearComp(direction, historyItem.article, tempComps, tempCompId, selectedCompId);
        }
        else {
            let place = direction === 'before'
                ? 'begin' : 'end';
            compsAndMaxCompId = articleManager.createCompAndSetInRootOfArticle(place, historyItem.article, tempComps, tempCompId);
        }
        dispatch(actions.article.createAndSetHistoryItem(compsAndMaxCompId));
    }, [dispatch, historyItem, flashedElemCoords, tempComps]);
}
/** The hook returns Inside btn click handler  */
export function useGetOnClickInsideBtn() {
    const dispatch = useDispatch();
    // Current article
    const historyItem = articleManager.hooks.getCurrentHistoryItem();
    // Selected and hovered components/elements coordinates object
    const flashedElemCoords = articleManager.hooks.getFlashedElemCoords();
    // Component template array
    const { tempComps } = useGetArticleSelectors();
    // Поставить id элемента и его тип (папка или файл) в качестве выбранного элемента
    return useCallback(function (tempCompId) {
        const { dataCompId, dataElemId } = flashedElemCoords.selectedElem;
        const componentsAndMaxCompId = articleManager.createCompAndSetInElem(historyItem.article, tempComps, tempCompId, dataCompId, dataElemId);
        dispatch(actions.article.createAndSetHistoryItem(componentsAndMaxCompId));
    }, [dispatch, historyItem, flashedElemCoords, tempComps]);
}
//# sourceMappingURL=TempCompList-func.js.map