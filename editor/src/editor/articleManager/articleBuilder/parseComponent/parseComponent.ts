import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import articleManager from '../../articleManager'
import htmlStringToObject, { HTMLObjArrType } from './htmlStringToObject'
import { putRepeatedElems } from './putRepeatedElems'
import { getConsistObjArr } from './getConsistObjArr'
import { changeTagName } from './changeTagName'
import { setExtraAttribs } from './setExtraAttribs'
import { setAttribs } from './setAttribs'
import { insertChildren } from './insertChildren'


export function parseComponent(compData: ArticleTypes.Component, tempComps: TempCompTypes.TempComps): HTMLObjArrType.Tag {

    // Get component template by its tmpCompId
    let template = articleManager.getTemplate(tempComps, compData.tCompId)

    // Get html string
    let htmlStr = template.content.html.trim()

    // Convert html string to html-object
    let htmlObjOriginal = htmlStringToObject(htmlStr)
    const htmlObj = htmlObjOriginal[0] as HTMLObjArrType.Tag

    // Based on information from dataComp I will find elements that should have duplicates and put they into html-object.
    putRepeatedElems(htmlObj, compData)

    // Array of objects consists of objects with correspondence between component template, data and html-object
    const consistObj = getConsistObjArr(template, compData, htmlObj)

    if (!consistObj) {
        // Set dataCompId (component data id) to the root tag
        htmlObj.attrs['data-em-data-comp-id'] = compData.dCompId.toString()
        return htmlObj
    }

    for(let consistData of consistObj) {
        changeTagName(consistData)
        setExtraAttribs(consistData)
        setAttribs(consistData)
        insertChildren(consistData, tempComps)
    }

    return htmlObj
}
