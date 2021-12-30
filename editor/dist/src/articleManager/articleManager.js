import correctArticle from './methods/correctArticle';
import { createCompAndSetItNearComp, createCompAndSetInElem, createCompAndSetInRootOfArticle } from './methods/insert';
import { saveArticle, clearArticle, deleteArticle, } from './methods/misc';
import { getCurrentHistoryItem, getComponent, getDataElemInDataComp, getDataElemInDataCompArr, 
//     getTempCompByDataCompId,
getTempElemByDataCompIdAndDataElemId, getTemplate, getTElemInTComp, getCompParentArray } from './methods/gettingResources';
import { hooks } from './methods/hooks';
import { turnArticleDataToHTML, turnArticleDataToJSX } from './articleBuilder/articleBuilder';
import { createArticle, createComponent, createSimpleTextComponent } from './methods/create';
import { 
//     canComponentPutInElement,
//     hasElemNestedElements,
canMakeHistoryStep, isArticleSave } from './methods/check';
class ArticleManager {
    constructor() {
        // BUILD ARTICLE
        this.turnArticleDataToJSX = turnArticleDataToJSX;
        this.turnArticleDataToHTML = turnArticleDataToHTML;
        // GETTING RESOURCES
        // Finds current history item object
        this.getCurrentHistoryItem = getCurrentHistoryItem;
        // Finds template in templates array
        this.getTemplate = getTemplate;
        // Finds element template in templates array
        this.getTElemInTComp = getTElemInTComp;
        // Finds template in templates array
        this.getComponent = getComponent;
        // Поиск элемента данных в компоненте данных
        this.getDataElemInDataComp = getDataElemInDataComp;
        // Поиск данных элемента в массиве данных компонентов
        this.getDataElemInDataCompArr = getDataElemInDataCompArr;
        // Finds component template by data component id
        // getTempCompByDataCompId = getTempCompByDataCompId
        // Finds element template by data component id and data element id
        this.getTempElemByDataCompIdAndDataElemId = getTempElemByDataCompIdAndDataElemId;
        // Finds an array in witch component is
        this.getCompParentArray = getCompParentArray;
        // CHECK
        // The method returns boolean can pass component put in element
        // canComponentPutInElement = canComponentPutInElement
        // hasElemNestedElements = hasElemNestedElements
        this.canMakeHistoryStep = canMakeHistoryStep;
        this.isArticleSave = isArticleSave;
        // CREATE
        this.createArticle = createArticle;
        this.createComponent = createComponent;
        this.createSimpleTextComponent = createSimpleTextComponent;
        // INSERT
        this.createCompAndSetInRootOfArticle = createCompAndSetInRootOfArticle;
        this.createCompAndSetInElem = createCompAndSetInElem;
        this.createCompAndSetItNearComp = createCompAndSetItNearComp;
        // HOOKS (object with hooks)
        this.hooks = hooks;
        // MISC
        this.saveArticle = saveArticle;
        this.deleteArticle = deleteArticle;
        this.clearArticle = clearArticle;
        this.correctArticle = correctArticle;
    }
}
export default new ArticleManager();
//# sourceMappingURL=articleManager.js.map