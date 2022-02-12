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
    getDElemInDComp,
    getDataElemInDataCompArr,
    getTElemByDCompIdAndDElemId,
    getTemplate,
    getTElemInTComp,
    getCompParentArray,
    getDCompIdxInArray,
    getElemCountInInnerElemsArr,
    getTElemByTCompIdAndTElemId,
    get$componentByTComps,
    get$componentByTComp,
    get$elem,
//     getDElemByTElem,
    getTElemInTCompsArr,
//     getRootTElemByTComps,
    getRootTElem,
//     getItemInDElem,
    getItemInDComp,
    get$elemBy$body,
    getTElemInTElems,
    getDElemAttrEmptyValue,
    dElemsEnumeration,
    findParentArray,
    getDElemInnerElemsArrByElemId,
    getMaxElemId
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
    canMoveCompMoveToLeftOrRight,
    has$ElemNested$Elements,
    canMakeHistoryStep,
    isArticleSave,
    canDeleteElem,
    canMoveItemToUpOrDown,
    canClone,
//     isElemIsRootByDElem,
//     isParentElemHidden,
//     hasItemAnotherItem,
} from './methods/check'
import {
    moveComponentToRoot,
    moveCompNearComp,
    moveComponentToElement,
    moveItemToUpOrDown
} from './methods/move'
import { updateTextInComponent } from './methods/text'
import {
    changeVisibility,
    changeVisibilityOfTextComp,
    changeVisibilityOfElem,
} from './methods/visibility'
import {
    changeElemTag,
    changeElemAttr
} from './methods/change'


class ArticleManager {
    // BUILD ARTICLE
    turnArticleDataToJSX = turnArticleDataToJSX
    turnArticleDataToHTML = turnArticleDataToHTML

    // GETTING RESOURCES
    // Finds current history item object
    getCurrentHistoryItem = getCurrentHistoryItem
    // Finds template in templates array
    getTemplate = getTemplate
    getTElemInTCompsArr = getTElemInTCompsArr
    // Finds element template in templates array
    getTElemInTComp = getTElemInTComp
    getTElemByTCompIdAndTElemId = getTElemByTCompIdAndTElemId
    // getDElemByTElem = getDElemByTElem
    // Finds template in templates array
    getComponent = getComponent
    // Поиск элемента данных в компоненте данных
    getDElemInDComp = getDElemInDComp
    // Поиск данных элемента в массиве данных компонентов
    getDataElemInDataCompArr = getDataElemInDataCompArr
    // Finds component template by data component id
    // getTempCompByDataCompId = getTempCompByDataCompId
    // Finds element template by data component id and data element id
    getTElemByDCompIdAndDElemId = getTElemByDCompIdAndDElemId
    // Finds an array in witch component is
    getCompParentArray = getCompParentArray
    // idx компонента в переданном массиве
    getDCompIdxInArray = getDCompIdxInArray
    getElemCountInInnerElemsArr = getElemCountInInnerElemsArr
    // Получение HTML-компонента по массиву шаблонов компонентов
    get$componentByTComps = get$componentByTComps
    // Получение HTML-компонента из переданного шаблона компонента
    get$componentByTComp = get$componentByTComp
    get$elem = get$elem
    // getRootTElemByTComps = getRootTElemByTComps
    getRootTElem = getRootTElem
    // Поиск компонента/элемента в элементе
    // getItemInDElem = getItemInDElem
    // Поиск компонента/элемента в компоненте
    getItemInDComp = getItemInDComp
    get$elemBy$body = get$elemBy$body
    getTElemInTElems = getTElemInTElems
    getDElemAttrEmptyValue = getDElemAttrEmptyValue
    dElemsEnumeration = dElemsEnumeration
    findParentArray = findParentArray
    getDElemInnerElemsArrByElemId = getDElemInnerElemsArrByElemId
    getMaxElemId = getMaxElemId

    // CHECK
    canMoveCompMoveToLeftOrRight = canMoveCompMoveToLeftOrRight
    // The method returns boolean can pass component put in element
    canComponentPutInElement = canComponentPutInElement
    has$ElemNested$Elements = has$ElemNested$Elements
    canMakeHistoryStep = canMakeHistoryStep
    isArticleSave = isArticleSave
    canDeleteElem = canDeleteElem
    canMoveItemToUpOrDown = canMoveItemToUpOrDown
    // Можно ли компонент/элемент клонировать и вставить следом
    canClone = canClone
    // Проверка является ли элемент корневым
    // isElemIsRootByDElem = isElemIsRootByDElem
    // Проверка скрыт ли родительский компонент/элемент
    // isParentElemHidden = isParentElemHidden
    // Имеет ли компонент/элемент внутри другой компонент/элемент
    // hasItemAnotherItem = hasItemAnotherItem

    // CREATE
    createArticle = createArticle
    createComponent = createComponent
    createSimpleTextComponent = createSimpleTextComponent

    // INSERT
    createCompAndSetInRootOfArticle = createCompAndSetInRootOfArticle
    createCompAndSetInElem = createCompAndSetInElem
    createCompAndSetItNearComp = createCompAndSetItNearComp

    // MOVE
    moveComponentToRoot = moveComponentToRoot
    moveCompNearComp = moveCompNearComp
    moveComponentToElement = moveComponentToElement
    moveItemToUpOrDown = moveItemToUpOrDown

    // VISIBILITY
    changeVisibility = changeVisibility
    changeVisibilityOfTextComp = changeVisibilityOfTextComp
    changeVisibilityOfElem = changeVisibilityOfElem

    // CHANGE
    changeElemTag = changeElemTag
    changeElemAttr = changeElemAttr

    // CLONE
    cloneItem = cloneItem

    // DELETE
    deleteItem = deleteItem
    deleteComponent = deleteComponent
    deleteElement = deleteElement

    // TEXT
    updateTextInComponent = updateTextInComponent

    // HOOKS (object with hooks)
    hooks = hooks

    // MISC
    saveArticle = saveArticle
    deleteArticle = deleteArticle
    clearArticle = clearArticle
    correctArticle = correctArticle
}

export default new ArticleManager()