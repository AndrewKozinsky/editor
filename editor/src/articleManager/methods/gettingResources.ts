import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import articleManager from 'articleManager/articleManager'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import StoreArticleTypes from 'store/article/articleTypes'

/**
 * The function finds current history item object
 * @param {Array} historyArr — articles history array
 * @param {Number} historyCurrentIdx — current history item index
 */
export function getCurrentHistoryItem(
    this: typeof articleManager,
    historyArr: StoreArticleTypes.HistoryItems,
    historyCurrentIdx: number
): StoreArticleTypes.HistoryItem {
    return historyArr[historyCurrentIdx]
}

/**
 * The function finds component template in templates array by id.
 * @param {Array} tempCompArr — components templates array
 * @param {String} tempCompId — component template id
 */
export function getTemplate(
    this: typeof articleManager,
    tempCompArr: TempCompTypes.TempComps,
    tempCompId: TempCompTypes.Id
): TempCompTypes.TempComp {
    return tempCompArr.find((tempComp) => {
        return tempComp.id === tempCompId
    })
}


/**
 * The function finds element template in templates array
 * @param {Array} tempCompArr — components templates array
 * @param {String} tempCompId — component template uuid
 * @param {String} tempElemId — element template uuid
 */
/*export function getTemplateElement(
    this: typeof articleManager,
    tempCompArr: TempCompTypes.TempComps,
    tempCompId: TempCompTypes.Id,
    tempElemId: TempCompTypes.TempElemId
): null | TempCompTypes.Elem {
    // const template = this.getTemplate(tempCompArr, tempCompId)
    // if (!template) return null

    // if (!template.code.elems?.length) return null

    // const tempElement = template.code.elems.find(elem => elem.tempElemId === tempElemId)
    // if (!tempElement) return null

    // return tempElement
}*/

/**
 * Поиск шаблона элемента в шаблоне компонента
 * @param {String} tempComp — component template
 * @param {String} tempElemId — element template id
 */
export function getTElemInTComp(
    this: typeof articleManager,
    tempComp: TempCompTypes.TempComp,
    tempElemId: TempCompTypes.ElemId
): null | TempCompTypes.Elem {
    if (!tempComp.content.elems?.length) return null

    const tempElement = tempComp.content.elems.find(elem => elem.elemId === tempElemId)
    return tempElement || null
}

/**
 * The function finds component data in data components array
 * @param {Array} dataCompArr — array of data components
 * @param {Number} dataCompId — a desired data component id
 */
export function getComponent(
    this: typeof articleManager,
    dataCompArr: ArticleTypes.Components,
    dataCompId: ArticleTypes.Id
): null | ArticleTypes.ArticleArrayItem {

    for (let i = 0; i < dataCompArr.length; i++) {
        const dataComp = dataCompArr[i]

        if (dataComp.dCompId === dataCompId) {
            return dataComp
        }

        if (dataComp.dCompType !== 'component' || !dataComp.dElems) {
            continue
        }

        for (let k = 0; k < dataComp.dElems.length; k++) {
            const elem = dataComp.dElems[k]

            if (!Array.isArray(elem.dCompElemChildren)) {
                if (elem.dCompElemChildren.dCompId === dataCompId) {
                    return elem.dCompElemChildren
                }

                continue
            }

            const foundedComp = this.getComponent(elem.dCompElemChildren, dataCompId)
            if (foundedComp) return foundedComp
        }
    }
}

/**
 * Поиск данных элемента в массиве данных компонентов
 * @param {Array} dataCompArr — array of data components
 * @param {Number} dataCompId — a data component id of the desired element
 * @param {Number} dataElemId — a desired element id
 */
export function getDataElemInDataCompArr(
    this: typeof articleManager,
    dataCompArr: ArticleTypes.Components,
    dataCompId: ArticleTypes.Id,
    dataElemId: ArticleTypes.Id
) {
    const component = this.getComponent(dataCompArr, dataCompId)
    if (!dataCompArr) return null

    if (component.dCompType === 'component' && component.dElems) {
        return component.dElems.find(dElem => dElem.dCompElemId === dataElemId)
    }
    return null
}

/**
 * Поиск данных элемента в данных компонента
 * @param {Object} dataComp — a data component id of the desired element
 * @param {Number} dataElemId — a desired element id
 */
export function getDataElemInDataComp(
    this: typeof articleManager,
    dataComp: ArticleTypes.ArticleArrayItem,
    dataElemId: ArticleTypes.Id
): null | ArticleTypes.ComponentElem {
    if (dataComp.dCompType === 'simpleTextComponent') return null
    if (!dataComp.dElems.length) return null

    return dataComp.dElems.find(dElem => dElem.dCompElemId === dataElemId)
}

/**
 * The function find component template by dataCompId
 * @param {Array} dataCompArr — array of data components
 * @param {String} dataCompId — a data component id
 * @param {Array} tempCompArr — components templates array
 */
/*export function getTempCompByDataCompId(
    this: typeof articleManager,
    dataCompArr: ArticleTypes.Components,
    dataCompId: ArticleTypes.Id,
    tempCompArr: TempCompTypes.TempComps,
): null | TempCompTypes.TempComp {

    // const foundedDataComp =  this.getComponent(dataCompArr, dataCompId)
    // if (!foundedDataComp) return null

    // const tempCompId = foundedDataComp.tempCompId

    // return this.getTemplate(tempCompArr, tempCompId)

    return null
}*/

/**
 * The function returns element template by DataCompId and DataElemId
 * @param {Array} dataCompArr — array of data components
 * @param {String} dataCompId — data component id which I have to get element template
 * @param {String} dataElemId — data element id which I have to get element template
 * @param {Array} tempCompArr — components templates array
 */
export function getTempElemByDataCompIdAndDataElemId(
    this: typeof articleManager,
    dataCompArr: ArticleTypes.Components,
    dataCompId: ArticleTypes.Id,
    dataElemId: ArticleTypes.Id,
    tempCompArr: TempCompTypes.TempComps,
): null | TempCompTypes.Elem {

    // Get data component
    const foundedDataComp = this.getComponent(dataCompArr, dataCompId)
    if (!foundedDataComp) return null

    // Get data element
    const foundedDataElem = this.getDataElemInDataComp(foundedDataComp, dataElemId)
    if (!foundedDataElem) return null

    if (foundedDataComp.dCompType === 'simpleTextComponent') return null

    // Get element template
    const foundedTempComp =  this.getTemplate(tempCompArr, foundedDataComp.tCompId)
    if (!foundedTempComp) return null

    // Get template element and return it
    return this.getTElemInTComp(foundedTempComp, foundedDataElem.tCompElemId)
}


type ParentArrayType = null | ArticleTypes.Components | ArticleTypes.ElemChildren

/**
 * The function finds an array in witch component is
 * @param {Array} dCompArr — array of data components
 * @param {String} dCompId — a data component id
 */
export function getCompParentArray(
    this: typeof articleManager,
    dCompArr: ArticleTypes.Components,
    dCompId: ArticleTypes.Id,
): ParentArrayType {
    let parentArray: ParentArrayType = null

    for (let i = 0; i < dCompArr.length; i++) {
        const dataComp = dCompArr[i]

        if (dataComp.dCompId === dCompId) {
            parentArray = dCompArr
        }
        else {
            if (dataComp.dCompType === 'simpleTextComponent') continue

            const foundedArr = findParentArray(dataComp, dCompId)
            if (foundedArr) {
                parentArray = foundedArr
                break
            }
        }
    }

    return parentArray
}

function findParentArray(
    dataComp: ArticleTypes.Component, dataCompId: ArticleTypes.Id
): null | ArticleTypes.Components {
    if (!dataComp.dElems) return null

    for (let i = 0; i < dataComp.dElems.length; i++) {
        const dElem = dataComp.dElems[i]
        if (!Array.isArray(dElem.dCompElemChildren) || !dElem.dCompElemChildren.length) continue

        for (let j = 0; j < dElem.dCompElemChildren.length; j++) {
            const innerDataComp = dElem.dCompElemChildren[j]

            if (innerDataComp.dCompId === dataCompId) {
                return dElem.dCompElemChildren
            }
            else {
                const res = findParentArray(innerDataComp, dataCompId)
                if (res) return res
            }
        }
    }
}