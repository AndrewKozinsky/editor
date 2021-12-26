// import { ConsistObj } from './getConsistObjArr'
// import ArticleTypes from 'store/article/codeType/articleCodeType'
// import TempCompTypes from 'store/article/codeType/tempCompCodeType'
// import { HTMLObjArrType } from './htmlStringToObject'

/**
 * Set the assigned attributes to element
 * @param {Object} consistObj — an object with link to dataComp, dataElem, tempElem and htmlElem
 */
/*export function setAttribs(consistObj: ConsistObj) {
    // Set attributes
    if (consistObj.tempElem.elemAttrs) {
        for (let attrTemplate of consistObj.tempElem.elemAttrs) {
            // Set an attribute to element
            setAttribToHtmlElem(attrTemplate, consistObj.dElem, consistObj.htmlElem)
        }
    }
}*/

/**
 * Set an attribute to element
 * @param {Object} attrTemplate — attr object from element template
 * @param {Object} dataElem — element data object
 * @param {Object} htmlElem — html-element object
 */
/*function setAttribToHtmlElem(
    attrTemplate: TempCompTypes.ElemAttr,
    dataElem: ArticleTypes.ComponentElem,
    htmlElem: HTMLObjArrType.Tag
) {
    const attrName = attrTemplate.elemAttrName

    // Array with the attribute values
    let attrValue: string[] = []
    // Set locked value if it exists
    if (attrTemplate.elemAttrLockedValue) {
        attrValue.push(attrTemplate.elemAttrLockedValue)
    }

    // If there are attributes in element data...
    if (dataElem.dCompElemAttrs?.length) {

        // Find object with current attribute data
        // Something like {id: 1, value: [1]} where id is an attrib id from elem template,
        // and value is array of ids of an attrib values from elem template. Instead of array of ids may be string with exact value
        const dataElemAttr = dataElem.dCompElemAttrs.find(attr => attr.dCompElemAttrId === attrTemplate.elemAttrId)

        // If in dataElemAttr.value is ready value...
        if (typeof dataElemAttr.dCompElemAttrValue === 'string') {
            attrValue.push(dataElemAttr.dCompElemAttrValue)
        }
        // If in dataElemAttr.value is array of values ids...
        else if (Array.isArray(dataElemAttr.dCompElemAttrValue)) {
            // Go through all ids and get string values
            for(let dataElemAttrValueId of dataElemAttr.dCompElemAttrValue) {
                const attrValue2 = attrTemplate.elemAttrValues.find(v => v.elemAttrValueId === dataElemAttrValueId)
                attrValue.push(attrValue2.elemAttrValueValue)
            }
        }
    }

    // Join all attributes values to a string
    htmlElem.attrs[attrName] = attrValue.join(' ')
}*/
