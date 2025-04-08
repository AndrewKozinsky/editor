import { createComponentsArr } from '../articleBuilder'
import { ConsistObj } from './getConsistObjArr'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'


/**
 * Функция вставляет дочерние компоненты в элемент
 * @param {Object} consistObj — an object with link to dataComp, dataElem, tempElem and htmlElem
 * @param tempComps
 */
export function insertChildren(consistObj: ConsistObj, tempComps: TempCompTypes.TempComps) {
    const elemChildren = consistObj.dElem.dCompElemChildren
    if (!elemChildren.length) return

    consistObj.htmlElem.children = createComponentsArr(
        consistObj.dElem.dCompElemChildren, tempComps
    )
}
