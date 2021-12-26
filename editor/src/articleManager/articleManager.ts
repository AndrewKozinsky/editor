// import {
//     createCompAndSetItNearComp,
//     createCompAndSetInElem,
//     createCompAndSetInRootOfArticle
// } from './methods/insert'
// import {
//     deleteArticle,
//     saveArticle,
// } from './methods/misc'
// import {
//     getCurrentHistoryItem,
//     getComponent,
//     getDataElemInDataComp,
//     getDataElemInDataCompArr,
//     getTempCompByDataCompId,
//     getTempElemByDataCompIdAndDataElemId,
//     getTemplate,
//     getTElemInTComp,
//     getCompParentArray
// } from './methods/gettingResources'
// import { hooks } from './methods/hooks'
// import {
//     turnArticleDataToHTML,
//     turnArticleDataToJSX
// } from './articleBuilder/articleBuilder'
// import {
//     createArticle,
//     createComponent,
//     createSimpleTextComponent
// } from './methods/create'
// import {
//     canComponentPutInElement,
//     hasElemNestedElements,
//     canMakeHistoryStep,
//     isArticleSave
// } from './methods/check'


class ArticleManager {
    // BUILD ARTICLE
    // turnArticleDataToJSX = turnArticleDataToJSX
    // turnArticleDataToHTML = turnArticleDataToHTML

    // GETTING RESOURCES
    // Finds current history item object
    // getCurrentHistoryItem = getCurrentHistoryItem
    // Finds template in templates array
    // getTemplate = getTemplate
    // Finds element template in templates array
    // getTElemInTComp = getTElemInTComp
    // Finds template in templates array
    // getComponent = getComponent
    // Поиск элемента данных в компоненте данных
    // getDataElemInDataComp = getDataElemInDataComp
    // Поиск данных элемента в массиве данных компонентов
    // getDataElemInDataCompArr = getDataElemInDataCompArr
    // Finds component template by data component id
    // getTempCompByDataCompId = getTempCompByDataCompId
    // Finds element template by data component id and data element id
    // getTempElemByDataCompIdAndDataElemId = getTempElemByDataCompIdAndDataElemId
    // Finds an array in witch component is
    // getCompParentArray = getCompParentArray

    // CHECK
    // The method returns boolean can pass component put in element
    // canComponentPutInElement = canComponentPutInElement
    // hasElemNestedElements = hasElemNestedElements
    // canMakeHistoryStep = canMakeHistoryStep
    // isArticleSave = isArticleSave

    // CREATE
    // createArticle = createArticle
    // createComponent = createComponent
    // createSimpleTextComponent = createSimpleTextComponent

    // INSERT
    // createCompAndSetInRootOfArticle = createCompAndSetInRootOfArticle
    // createCompAndSetInElem = createCompAndSetInElem
    // createCompAndSetItNearComp = createCompAndSetItNearComp

    // HOOKS (object with hooks)
    // hooks = hooks

    // MISC
    // saveArticle = saveArticle
    // deleteArticle = deleteArticle
}

export default new ArticleManager()