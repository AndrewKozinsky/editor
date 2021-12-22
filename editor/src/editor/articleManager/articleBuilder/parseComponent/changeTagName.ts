import { ConsistObj } from './getConsistObjArr'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'

/**
 * The function set a tag name to html element if it necessary
 * @param {Object} consistObj — an object with link to dataComp, dataElem, tempElem and htmlElem
 */
export function changeTagName(consistObj: ConsistObj) {
    const tagName = getTagName(consistObj.dElem, consistObj.tempElem)
    if (tagName) {
        consistObj.htmlElem.tag = tagName
    }
}

/**
 * Get tag name from dElem
 * @param {Object} dElem — element data object
 * @param {Object} tempElem — template element object
 */
function getTagName(dElem: ArticleTypes.ComponentElem, tempElem: TempCompTypes.Elem): string | null {
    if (!dElem.dCompElemTag) return null

    // If tag is a string, that is a ready tag name.
    if (typeof dElem.dCompElemTag === 'string') return dElem.dCompElemTag

    // Otherwise, tag id was passed. That's why I need to find tag name with this id in the component template...
    // Its tags
    const tags = tempElem.elemTags.elemTagsValues
    // Get tag object by tag id
    const tagData = tags.find(tagObj => tagObj.elemTagValueId === dElem.dCompElemTag)

    // Return tag name
    if (tagData) return tagData.elemTagValueName
    return null
}
