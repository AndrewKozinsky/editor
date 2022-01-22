import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import articleManager from 'articleManager/articleManager'
import htmlStringToObject, { HTMLObjArrType } from './htmlStringToObject'
import { setExtraAttribsToRootTag } from './setExtraAttribsToRootTag'
import putRepeatedElems from './putRepeatedElems'
import getConsistObjArr from './getConsistObjArr'
import changeTagName from './changeTagName'
import setAttribs from './setAttribs'
import { insertChildren } from './insertChildren'

/**
 * Функция получает данные компонента и сливает с шаблоном компонента. В результате получается HTML-объект.
 * В других функциях он будет преобразован в JSX.
 * @param {Object} compData — данные компонента
 * @param {Array} tempComps — массив шаблонов компонентов
 */
export function parseComponent(compData: ArticleTypes.Component, tempComps: TempCompTypes.TempComps): HTMLObjArrType.Tag {
    // Get component template by its tCompId
    let template = articleManager.getTemplate(tempComps, compData.tCompId)

    // Get html string
    let htmlStr = template.content.html.trim()

    // Convert html string to html-object
    let htmlObjOriginal = htmlStringToObject(htmlStr)

    const htmlObj = htmlObjOriginal[0] as HTMLObjArrType.Tag

    // Поставить главной обёртке htmlObj дополнительные атрибуты
    setExtraAttribsToRootTag(htmlObj, compData)

    // Based on information from dataComp I will find elements that should have duplicates and put they into html-object.
    putRepeatedElems(htmlObj, compData)

    // Array of objects consists of objects with correspondence between component template, data and html-object
    // Другими словами массив объектов с шаблонами элементов и данными элементов.
    const consistObj = getConsistObjArr(template, compData, htmlObj)

    for(let consistData of consistObj) {
        changeTagName(consistData)
        setAttribs(consistData)
        insertChildren(consistData, tempComps)
    }

    return htmlObj
}
