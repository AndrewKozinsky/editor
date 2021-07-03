import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import articleManager from '../articleManager'
import ArticleTypes from 'store/article/codeType/articleCodeType'

/**
 * The function finds component template in templates array
 * @param {Array} tempCompArr — components templates array
 * @param {String} tempCompId — component template uuid
 */
export function getTemplate(
    this: typeof articleManager,
    tempCompArr: TempCompTypes.TempComps,
    tempCompId: TempCompTypes.UuId
): TempCompTypes.TempComp {
    return tempCompArr.find((tempComp) => {
        return tempComp.uuid === tempCompId;
    })
}


/**
 * The function finds element template in templates array
 * @param {Array} tempCompArr — components templates array
 * @param {String} tempCompId — component template uuid
 * @param {String} tempElemId — element template uuid
 */
export function getTemplateElement(
    this: typeof articleManager,
    tempCompArr: TempCompTypes.TempComps,
    tempCompId: TempCompTypes.UuId,
    tempElemId: TempCompTypes.TempElemId
): null | TempCompTypes.Elem {
    const template = this.getTemplate(tempCompArr, tempCompId)
    if (!template) return null

    if (!template.code.elems || !template.code.elems.length) return null

    const tempElement = template.code.elems.find(elem => elem.tempElemId === tempElemId)
    if (!tempElement) return null

    return tempElement
}

/**
 * The function finds component data in data components array
 * @param {Array} dataCompArr — array of data components
 * @param {String} dataCompId — a desired component id
 */
export function getComponent(
    this: typeof articleManager,
    dataCompArr: ArticleTypes.Components,
    dataCompId: ArticleTypes.DataCompId
): null | ArticleTypes.ArticleArrayItem {

    return dataCompArr.find(dataComp => {
        if (dataComp.dataCompId === dataCompId) {
            return dataComp
        }

        if (dataComp.type === 'component' && dataComp.elems) {

            for (let i = 0; i < dataComp.elems.length; i++) {
                const elem = dataComp.elems[i]

                if (!elem.children) continue

                const res = this.getComponent(elem.children, dataCompId)

                if (res) return res
            }
        }
    })
}

/**
 * The function finds element data in data components array
 * @param {Array} dataCompArr — array of data components
 * @param {String} dataCompId — a component id of the desired element
 * @param {String} dataElemId — a desired element id
 */
export function getCompElem(
    this: typeof articleManager,
    dataCompArr: ArticleTypes.Components,
    dataCompId: ArticleTypes.DataCompId,
    dataElemId: ArticleTypes.DataElemId
) {
    const component = this.getComponent(dataCompArr, dataCompId)
    if (!dataCompArr) return null

    if (component.type === 'component' && component.elems) {
        return component.elems.find(elem => elem.dataElemId === dataElemId)
    }
    return null
}


export function getTempCompByDataCompId(
    this: typeof articleManager,
    dataCompArr: ArticleTypes.Components,
    dataCompId: ArticleTypes.DataCompId,
    tempCompArr: TempCompTypes.TempComps,
): null | TempCompTypes.TempComp {

    const foundedDataComp =  this.getComponent(dataCompArr, dataCompId)
    if (!foundedDataComp) return null

    const tempCompId = foundedDataComp.tempCompId

    return this.getTemplate(tempCompArr, tempCompId)
}

export function getTempElemByDataCompIdAndDataElemId(
    this: typeof articleManager,
    dataCompArr: ArticleTypes.Components,
    dataCompId: ArticleTypes.DataCompId,
    dataElemId: ArticleTypes.DataElemId,
    tempCompArr: TempCompTypes.TempComps,
): null | TempCompTypes.Elem {

    const foundedDataComp = this.getComponent(dataCompArr, dataCompId)
    if (!foundedDataComp) return

    const foundedDataElem = this.getCompElem(dataCompArr, dataCompId, dataElemId)
    if (!foundedDataElem) return

    const foundedTempComp =  this.getTempCompByDataCompId(dataCompArr, dataCompId, tempCompArr)
    if (!foundedTempComp) return null

    return this.getTemplateElement(tempCompArr, foundedDataComp.tempCompId, foundedDataElem.tempElemId)
}


type ParentArrayType = null | ArticleTypes.Components | ArticleTypes.ElemChildren

export function getCompParentArray(
    this: typeof articleManager,
    dataCompArr: ArticleTypes.Components,
    dataCompId: ArticleTypes.DataCompId,
): ParentArrayType {
    let parentArray: ParentArrayType = null

    // debugger

    for (let i = 0; i < dataCompArr.length; i++) {
        const dataComp = dataCompArr[i]

        if (dataComp.dataCompId === dataCompId) {
            parentArray = dataCompArr
        } else {
            if (dataComp.type !== 'textComponent') {
                const foundedArr = findParentArray(dataComp, dataCompId)
                if (foundedArr) {
                    parentArray = foundedArr
                    break
                }
            }
        }
    }


    return parentArray
}

function findParentArray(
    dataComp: ArticleTypes.Component, dataCompId: ArticleTypes.DataCompId
): null | ArticleTypes.Components {
    if (!dataComp.elems) return null

    for (let i = 0; i < dataComp.elems.length; i++) {
        const elem = dataComp.elems[i]
        if (!elem.children?.length) continue

        for (let j = 0; j < elem.children.length; j++) {
            const innerDataComp = elem.children[j]

            if (innerDataComp.type === 'textComponent') continue

            if (innerDataComp.dataCompId === dataCompId) {
                return elem.children
            }
            else {
                const res = findParentArray(innerDataComp, dataCompId)
                if (res) return res
            }
        }
    }
}

