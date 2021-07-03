import {
    canComponentPutInElement,
    createCompAndSetAfterComp,
    createCompAndSetInElem,
    createCompAndSetInEndOfArticle
} from './insert/insert'
import {supplementArtMarksInLocalStorage} from './misc/setArticleMarksInLocalStorage'
import {
    getComponent,
    getCompElem,
    getTempCompByDataCompId,
    getTempElemByDataCompIdAndDataElemId,
    getTemplate,
    getTemplateElement,
    getCompParentArray
} from './gettingResources/gettingResources'
import { hooks } from './hooks/hooks'
import { createArticle, createComponent } from './create/create';


class ArticleManager {
    // GETTING RESOURCES
    // Find template in templates array
    getTemplate = getTemplate
    // Find element template in templates array
    getTemplateElement = getTemplateElement
    // Find template in templates array
    getComponent = getComponent
    // Find element template in templates array
    getCompElem = getCompElem
    // Find component template by data component id
    getTempCompByDataCompId = getTempCompByDataCompId
    // Find element template by data component id and data element id
    getTempElemByDataCompIdAndDataElemId = getTempElemByDataCompIdAndDataElemId
    getCompParentArray = getCompParentArray

    // CREATE
    createArticle = createArticle
    createComponent = createComponent

    // INSERT
    // The method returns boolean can passed component put in element
    canComponentPutInElement = canComponentPutInElement
    createCompAndSetInEndOfArticle = createCompAndSetInEndOfArticle
    createCompAndSetInElem = createCompAndSetInElem
    createCompAndSetAfterComp = createCompAndSetAfterComp

    // HOOKS
    // Object with hooks
    hooks = hooks

    // MISC
    // The method saves article misc data to localStorage
    // to know what kind of article the editor has to open next time
    supplementArtMarksInLocalStorage = supplementArtMarksInLocalStorage
}

export default new ArticleManager()