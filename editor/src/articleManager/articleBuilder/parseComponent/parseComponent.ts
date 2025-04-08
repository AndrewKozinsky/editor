import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import articleManager from 'articleManager/articleManager'
import htmlStringToObject, { HTMLObjArrType } from '../htmlStringToObject'
import { setExtraAttribsToRootTag } from './setExtraAttribsToRootTag'
import putRepeatedElems from './putRepeatedElems'
import getConsistObjArr from './getConsistObjArr'
import changeTagName from './changeTagName'
import setAttribs from './setAttribs'
import { insertChildren } from './insertChildren'
import removeTextNodes from './removeTextNodes'

/**
 * Функция получает данные компонента и сливает с шаблоном компонента. В результате получается HTML-объект.
 * В других функциях он будет преобразован в JSX.
 * @param {Object} compData — данные компонента
 * @param {Array} tempComps — массив шаблонов компонентов
 */
export default function parseComponent(
    compData: ArticleTypes.Component, tempComps: TempCompTypes.TempComps
): HTMLObjArrType.Tag {
    // Get component template by its tCompId
    let template = articleManager.getTemplate(tempComps, compData.tCompId)

    // Get html string
    let htmlStr = template.content.html.trim()

    // Convert html string to html-object
    let htmlObjArr = htmlStringToObject(htmlStr) as HTMLObjArrType.Arr

    // Удалить из htmlObj текстовые узлы потому что на этапе создания данных компонента
    // они уже превращены в текстовые компоненты
    removeTextNodes(htmlObjArr[0] as HTMLObjArrType.Tag)

    // Поставить в разметку повторяющиеся элементы на основе данных компонента
    putRepeatedElems(htmlObjArr, [compData.dElems], compData.dCompId)

    // Поставить главной обёртке дополнительные атрибуты
    setExtraAttribsToRootTag(htmlObjArr, compData, template)

    // Массив объектов с данными для изменения тега элемента, вставки атрибутов и детей.
    const consistObjArr = getConsistObjArr(htmlObjArr, template, [], compData)

    for(let consistObj of consistObjArr) {
        changeTagName(consistObj)
        setAttribs(consistObj)
        insertChildren(consistObj, tempComps)
    }

    return htmlObjArr[0] as HTMLObjArrType.Tag
}
