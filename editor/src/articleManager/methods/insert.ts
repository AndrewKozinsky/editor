import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import StoreArticleTypes from 'store/article/articleTypes'
import articleManager from 'articleManager/articleManager'
import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'


/**
 * Функция создаёт компонент и помещает его в указанный элемент
 * @param {Object} article
 * @param {Array} tempCompArr — массив шаблонов компонентов
 * @param {Number} tempCompId
 * @param {Object} targetCompCoords — координаты целевого компоненте по отношению к которому будет перемещаться компонент
 */
export function createCompAndSetInElem(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    tempCompArr: TempCompTypes.TempComps,
    tempCompId: TempCompTypes.Id,
    targetCompCoords: StoreArticleTypes.FlashedElem,
): StoreArticleTypes.CreateNewHistoryItem {

    // Create a new component
    const newCompResult = this.createComponent(article, tempCompArr, tempCompId)
    // Get element which I am going to set the new component
    const targetElemData = this.getDataElemInDataCompArr(article.dComps, targetCompCoords.dataCompId, targetCompCoords.dataElemId)

    // Create a new components array
    let updatedComponents: ArticleTypes.Components

    // If the target element has a children array, put a new component to it
    if (Array.isArray(targetElemData.dCompElemChildren)) {
        // Set the new component into element children
        const elemChildrenArrCopy = [...targetElemData.dCompElemChildren, newCompResult.compData]
        // Get updates components array
        updatedComponents = makeImmutableObj(article.dComps, targetElemData.dCompElemChildren, elemChildrenArrCopy)
    }

    return {
        components: updatedComponents,
        maxCompId: newCompResult.maxCompId
    }
}


/**
 * The function creates a new component and puts it before or after the passed component
 * @param {String} place — a place where to put a created component: before or after
 * @param {Object} article — article object
 * @param {Array} tempCompArr — components templates array
 * @param {String} tempCompId — component template id
 * @param {String} targetDataCompId — a target data component id relative with the a new component will be placed
 */
export function createCompAndSetItNearComp(
    this: typeof articleManager,
    place: 'before' | 'after',
    article: ArticleTypes.Article,
    tempCompArr: TempCompTypes.TempComps,
    tempCompId: TempCompTypes.Id,
    targetDataCompId: ArticleTypes.Id
): StoreArticleTypes.CreateNewHistoryItem {

    // Create a new component
    const newCompResult = this.createComponent(article, tempCompArr, tempCompId)
    const parentArray = this.getCompParentArray(article.dComps, targetDataCompId)
    if (!Array.isArray(parentArray)) return

    // Get idx of the targetDataCompId in parent array
    const idx = parentArray.findIndex(compData => compData.dCompId === targetDataCompId)

    // Put the new component before or ofter target component
    let parentArrayCopy = [...parentArray]
    if (place === 'before') {
        parentArrayCopy.splice(idx, 0, newCompResult.compData)
    }
    else if (place === 'after') {
        parentArrayCopy.splice(idx + 1, 0, newCompResult.compData)
    }

    // Create a new components array
    let updatedComponents: ArticleTypes.Components
    if (parentArray === article.dComps) updatedComponents = parentArrayCopy
    else updatedComponents = makeImmutableObj(article.dComps, parentArray, parentArrayCopy)

    return {
        components: updatedComponents,
        maxCompId: newCompResult.maxCompId
    }
}


/**
 * The function creates a new component and puts it in the end of the article
 * @param {String} place — a place where to put a created component
 * @param {Object} article — article object
 * @param {Array} tempCompArr — components templates array
 * @param {String} tempCompId — component template id
 */
export function createCompAndSetInRootOfArticle(
    this: typeof articleManager,
    place: 'begin' | 'end',
    article: ArticleTypes.Article,
    tempCompArr: TempCompTypes.TempComps,
    tempCompId: TempCompTypes.Id,
): StoreArticleTypes.CreateNewHistoryItem {
    // Create a new component
    const newCompResult = this.createComponent(article, tempCompArr, tempCompId)

    // Put the new component in the beginning OR to the end of components array
    const artCompsArr = [...article.dComps]
    if (place === 'begin') artCompsArr.unshift(newCompResult.compData)
    else if (place === 'end') artCompsArr.push(newCompResult.compData)

    return {
        components: artCompsArr,
        maxCompId: newCompResult.maxCompId
    }
}
