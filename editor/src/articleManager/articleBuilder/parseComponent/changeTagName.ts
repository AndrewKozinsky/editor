import { ConsistObj } from './getConsistObjArr'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'

/**
 * The function set a tag name to html element if it necessary
 * @param {Object} consistObj — an object with link to dataComp, dataElem, tempElem and htmlElem
 */
export default function changeTagName(consistObj: ConsistObj) {
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

    // Если в шаблоне массив в свойстве elemTagsValues,
    // то это массив идентификаторов.
    if (Array.isArray(tempElem.elemTags.elemTagsValues)) {
        // Поэтому найти имя тега по идентификатору
        const tagInfo = tempElem.elemTags.elemTagsValues.find(elemTagObj => {
            return elemTagObj.elemTagValueId === dElem.dCompElemTag
        })

        // Возвращу имя тега
        return tagInfo.elemTagValueName
    }
    // В противном случае это готовое имя тега и его сразу можно вернуть
    else {
        return dElem.dCompElemTag
    }
}
