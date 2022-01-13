import { cloneItem } from './methods/clone'
import correctArticle from './methods/correctArticle'
import {
    deleteComponent,
    deleteElement,
    deleteItem
} from './methods/delete'
import {
    createCompAndSetItNearComp,
    createCompAndSetInElem,
    createCompAndSetInRootOfArticle
} from './methods/insert'
import {
    saveArticle,
    clearArticle,
    deleteArticle,
} from './methods/misc'
import {
    getCurrentHistoryItem,
    getComponent,
    getDataElemInDataComp,
    getDataElemInDataCompArr,
//     getTempCompByDataCompId,
    getTempElemByDataCompIdAndDataElemId,
    getTemplate,
    getTElemInTComp,
    getCompParentArray,
    getDCompIdxInArray,
    getElemCount,
//     getTElemInTCompsArr
} from './methods/gettingResources'
import { hooks } from './methods/hooks'
import {
    turnArticleDataToHTML,
    turnArticleDataToJSX
} from './articleBuilder/articleBuilder'
import {
    createArticle,
    createComponent,
    createSimpleTextComponent
} from './methods/create'
import {
    canComponentPutInElement,
    canMoveCompMoveToProperPosition,
    hasElemNestedElements,
    canMakeHistoryStep,
    isArticleSave,
//     isCompInArticleRoot,
//     isCompsInTheSameArr,
//     isCompInArray,
    canDeleteElem,
    canMoveItemToUpOrDown,
    canClone
} from './methods/check'
import {
    moveComponentToProperPosition,
    moveComponentToRoot,
    moveCompNearComp,
    moveComponentToElement,
    moveItemToUpOrDown
} from './methods/move'
import {
    changeVisibility,
    changeElemTag,
    changeElemAttr
} from './methods/visibility'


class ArticleManager {
    // BUILD ARTICLE
    turnArticleDataToJSX = turnArticleDataToJSX
    turnArticleDataToHTML = turnArticleDataToHTML

    // GETTING RESOURCES
    // Finds current history item object
    getCurrentHistoryItem = getCurrentHistoryItem
    // Finds template in templates array
    getTemplate = getTemplate
    // getTElemInTCompsArr = getTElemInTCompsArr
    // Finds element template in templates array
    getTElemInTComp = getTElemInTComp
    // Finds template in templates array
    getComponent = getComponent
    // Поиск элемента данных в компоненте данных
    getDataElemInDataComp = getDataElemInDataComp
    // Поиск данных элемента в массиве данных компонентов
    getDataElemInDataCompArr = getDataElemInDataCompArr
    // Finds component template by data component id
    // getTempCompByDataCompId = getTempCompByDataCompId
    // Finds element template by data component id and data element id
    getTempElemByDataCompIdAndDataElemId = getTempElemByDataCompIdAndDataElemId
    // Finds an array in witch component is
    getCompParentArray = getCompParentArray
    // idx компонента в переданном массиве
    getDCompIdxInArray = getDCompIdxInArray
    getElemCount = getElemCount

    // CHECK
    // Функция проверяющая работоспособность кнопки перемещения перемещаемого компонента
    canMoveCompMoveToProperPosition = canMoveCompMoveToProperPosition
    // The method returns boolean can pass component put in element
    canComponentPutInElement = canComponentPutInElement
    hasElemNestedElements = hasElemNestedElements
    canMakeHistoryStep = canMakeHistoryStep
    isArticleSave = isArticleSave
    // Находится ли компонент в корне статьи?
    // isCompInArticleRoot = isCompInArticleRoot
    // Находятся ли компоненты в одном массиве?
    // isCompsInTheSameArr = isCompsInTheSameArr
    // Находится ли компонент в переданном массиве?
    // isCompInArray = isCompInArray
    canDeleteElem = canDeleteElem
    canMoveItemToUpOrDown = canMoveItemToUpOrDown
    // Можно ли компонент/элемент клонировать и вставить следом
    canClone = canClone

    // CREATE
    createArticle = createArticle
    createComponent = createComponent
    createSimpleTextComponent = createSimpleTextComponent

    // INSERT
    createCompAndSetInRootOfArticle = createCompAndSetInRootOfArticle
    createCompAndSetInElem = createCompAndSetInElem
    createCompAndSetItNearComp = createCompAndSetItNearComp

    // MOVE
    moveComponentToProperPosition = moveComponentToProperPosition
    moveComponentToRoot = moveComponentToRoot
    moveCompNearComp = moveCompNearComp
    moveComponentToElement = moveComponentToElement
    moveItemToUpOrDown = moveItemToUpOrDown

    // CHANGE
    changeVisibility = changeVisibility
    changeElemTag = changeElemTag
    changeElemAttr = changeElemAttr

    // CLONE
    cloneItem = cloneItem

    // DELETE
    deleteItem = deleteItem
    deleteComponent = deleteComponent
    deleteElement = deleteElement

    // HOOKS (object with hooks)
    hooks = hooks

    // MISC
    saveArticle = saveArticle
    deleteArticle = deleteArticle
    clearArticle = clearArticle
    correctArticle = correctArticle
}

export default new ArticleManager()