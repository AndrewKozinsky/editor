import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import articleManager from '../articleManager';
import ArticleTypes from 'store/article/codeType/articleCodeType'
import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'

/**
 * The function check can you insert a component into the target element
 * @param {Array} tempCompArr — components templates array
 * @param {Array} dataCompArr — array of data components
 * @param {String} targetDataCompId — a target data component
 * @param {String} targetDataElemId — a target data element
 */
export function canComponentPutInElement(
    this: typeof articleManager,
    tempCompArr: TempCompTypes.TempComps,
    dataCompArr: ArticleTypes.Components,
    targetDataCompId: ArticleTypes.DataCompId,
    targetDataElemId: ArticleTypes.DataElemId
) {
    // Get element template
    const tempElem = this.getTempElemByDataCompIdAndDataElemId(
        dataCompArr, targetDataCompId, targetDataElemId, tempCompArr
    )

    // If element template has text property, that only text component is allowed there.
    return !tempElem.text
}



export type CreateCompFnReturnType = {
    components: ArticleTypes.Components
    maxCompId: number
}


/**
 *
 * @param article
 * @param tempCompArr
 * @param tempCompId
 * @param targetDataCompId
 * @param targetDataElemId
 */
export function createCompAndSetInElem(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    tempCompArr: TempCompTypes.TempComps,
    tempCompId: TempCompTypes.UuId,
    targetDataCompId: ArticleTypes.DataCompId,
    targetDataElemId: ArticleTypes.DataElemId
): CreateCompFnReturnType {

    // Create a new component
    const newCompResult = this.createComponent(article, tempCompArr, tempCompId)
    // Get element which I going to set the new component
    const targetElemData = this.getCompElem(article.components, targetDataCompId, targetDataElemId)

    let updatedComponents: ArticleTypes.Components

    if (targetElemData.children) {
        // Set the new component into element children
        const elemChildrenArrCopy = [...targetElemData.children, newCompResult.compData]
        // Get updates components array
        updatedComponents = makeImmutableObj(article.components, targetElemData.children, elemChildrenArrCopy)
    }
    else {
        // Set the new component into element children
        const newTargetElemData = {...targetElemData}
        newTargetElemData.children = [newCompResult.compData]

        // Get updates components array
        updatedComponents = makeImmutableObj(article.components, targetElemData, newTargetElemData)
    }

    return {
        components: updatedComponents,
        maxCompId: newCompResult.maxCompId
    }
}




/**
 *
 * @param article
 * @param tempCompArr
 * @param tempCompId
 * @param targetDataCompId
 */
export function createCompAndSetAfterComp(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    tempCompArr: TempCompTypes.TempComps,
    tempCompId: TempCompTypes.UuId,
    targetDataCompId: ArticleTypes.DataCompId
): CreateCompFnReturnType {
    // Create a new component
    const newCompResult = this.createComponent(article, tempCompArr, tempCompId)
    const parentArray = this.getCompParentArray(article.components, targetDataCompId)

    const idx = parentArray.findIndex(compData => compData.dataCompId === targetDataCompId)
    let parentArrayCopy = [...parentArray]
    parentArrayCopy.splice(idx + 1, 0, newCompResult.compData)

    let updatedComponents: ArticleTypes.Components

    if (parentArray === article.components) updatedComponents = parentArrayCopy
    else updatedComponents = makeImmutableObj(article.components, parentArray, parentArrayCopy)

    return {
        components: updatedComponents,
        maxCompId: newCompResult.maxCompId
    }
}

/**
 *
 * @param article
 * @param tempCompArr
 * @param tempCompId
 */
export function createCompAndSetInEndOfArticle(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    tempCompArr: TempCompTypes.TempComps,
    tempCompId: TempCompTypes.UuId,
): CreateCompFnReturnType {
    // Create a new component
    const newCompResult = this.createComponent(article, tempCompArr, tempCompId)

    return {
        components: [...article.components, newCompResult.compData],
        maxCompId: newCompResult.maxCompId
    }
}

