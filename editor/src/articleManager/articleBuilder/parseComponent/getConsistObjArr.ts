import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import { HTMLObjArrType } from './htmlStringToObject'

type ConsistObjsArr = ConsistObj[]
export type ConsistObj = {
    dataComp: ArticleTypes.Component // Данные компонента
    dElem: ArticleTypes.ComponentElem // Данные элемента
    tempElem: TempCompTypes.Elem // Шаблон элемента
    htmlComp: HTMLObjArrType.Tag // html-компонент
    htmlElem: HTMLObjArrType.Tag
}

/**
 * The function form an array of objects consists of objects with a correspondence between component template, data and html-object
 * @param {Object} template — component template
 * @param {Object} compData — component data
 * @param {Object} htmlObj — component html-object
 */
export function getConsistObjArr(
    template: TempCompTypes.TempComp,
    compData: ArticleTypes.Component,
    htmlObj: HTMLObjArrType.Tag
): null | ConsistObjsArr {
    if (!compData.dElems) return null

    // Перебрать все элементы в данных
    return compData.dElems.map((dElem) => {
        return {
            dataComp: compData,
            dElem: dElem,
            tempElem: getTemplateElemByTempElemId(template, dElem.tCompElemId),
            htmlComp: htmlObj,
            htmlElem: getHtmlElem(htmlObj, dElem.dCompElemId, dElem.tCompElemId)
        }
    })
}

/**
 * The function finds and returns element template based on an element template id
 * @param {Object} template — component template
 * @param {String} tCompElemId — an element template id
 */
function getTemplateElemByTempElemId(template: TempCompTypes.TempComp, tCompElemId: TempCompTypes.ElemId): TempCompTypes.Elem {
    return template.content?.elems.find(tempElem => tempElem.elemId === tCompElemId)
}

/**
 * The function finds and returns html-element object with passed tCompElemGroup name and tCompElemId
 * @param {Object} htmlObj — component html-object
 * @param {Number} dCompElemId — an element id
 * @param {String} tCompElemId — element template name
 */
function getHtmlElem(
    htmlObj: HTMLObjArrType.Tag,
    dCompElemId: number,
    tCompElemId: string
): HTMLObjArrType.Tag {
    let htmlElem: HTMLObjArrType.Tag | null = null

    find(htmlObj)

    function find(htmlObj: HTMLObjArrType.Tag) {
        if ('text' in htmlObj) return

        // If there is attr with a passed tCompElemId...
        if (htmlObj.attrs['data-em-id'] === tCompElemId
            && htmlObj.attrs['data-em-d-elem-id'] === dCompElemId.toString())
        {
            // The searches have finished
            htmlElem = htmlObj
            return
        }

        if (!htmlObj.children?.length) return

        // Go through the children and find html-element there...
        for (let i = 0; i < htmlObj.children.length; i++) {

            let childObj = htmlObj.children[i]
            if ('text' in childObj) continue

            // If there is attr with a passed tCompElemId...
            if (childObj.attrs['data-em-id'] === tCompElemId
                && childObj.attrs['data-em-d-elem-id'] === dCompElemId.toString()
            ) {
                // The searches have finished
                htmlElem = childObj
                return
            }
            else {
                if (childObj.children) {
                    find(childObj)
                }
            }
        }
    }

    return htmlElem
}
