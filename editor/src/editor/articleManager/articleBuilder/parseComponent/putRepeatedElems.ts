import { HTMLObjArrType } from './htmlStringToObject'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import { createDeepCopy } from 'utils/MiscUtils'

/**
 * Function synchronize the number of elements in html object with number of elements in component data
 * @param {Object} htmlObj — html-объект в который требуется добавить копии элементов
 * @param {Object} dataComp — объект с информацией о конфигурации элемента в статье
 */
export function putRepeatedElems(htmlObj: HTMLObjArrType.Tag, dataComp: ArticleTypes.Component) {
    if (!dataComp.dElems) return

    // Создание объекта с данными по копиям элементов
    // {
        // Имя группы. В массиве количество элементов входящие в группу.
        // Если более одного, то нужно будет создать копии.
        // 'banner-group': [ {dCompElemId: 2}, {dCompElemId: 3} ],
        // 'cell-group': [ {dCompElemId: 4} ]
    // }
    let groupElemsMap = createGroupElemsMap(dataComp)

    // Поставить копии элементов (если требуется) и в каждый элемент поставить id данных элемента
    const groupName = htmlObj.attrs['data-em-group']
    htmlObj.attrs['data-em-data-elem-id'] = groupElemsMap[groupName][0].dCompElemId.toString()
    setDuplicates(htmlObj.children, groupElemsMap)
}


type GroupElemsMapType = {[key: string]: {dCompElemId: number}[]}

/**
 * The function forms array of objects like { 'banner-group': [...], 'cell-group': [...] }.
 * A key is a data element group name (elemGroup property), value is an array of objects with element data
 * @param {Object} dataComp — element data object
 */
function createGroupElemsMap(dataComp: ArticleTypes.Component) {
    const groupElemsMap: GroupElemsMapType = {}

    for (let dataElem of dataComp.dElems) {
        if (groupElemsMap[dataElem.dCompElemGroup]) {
            groupElemsMap[dataElem.dCompElemGroup].push(
                {dCompElemId: dataElem.dCompElemId}
            )
        }
        else {
            groupElemsMap[dataElem.dCompElemGroup] = [
                {dCompElemId: dataElem.dCompElemId}
            ]
        }
    }

    return groupElemsMap
}

function setDuplicates(parentArr: HTMLObjArrType.Arr, groupElemsMap: GroupElemsMapType) {
    if (!parentArr) return

    for (let i = 0; i < parentArr.length; i++) {
        const childObj = parentArr[i]

        if( 'text' in childObj) continue

        const groupName = childObj.attrs['data-em-group']

        if (groupElemsMap[groupName]) {
            for (let k = 0; k < groupElemsMap[groupName].length; k++) {
                if (k === 0) {
                    childObj.attrs['data-em-data-elem-id'] = groupElemsMap[groupName][0].dCompElemId.toString()
                }
                else {
                    const childObjClone = createDeepCopy(childObj)
                    childObjClone.attrs['data-em-data-elem-id'] = groupElemsMap[groupName][k].dCompElemId.toString()
                    parentArr.push(childObjClone)
                }

            }

            i += groupElemsMap[groupName].length - 1
        }

        if (childObj.children && childObj.children.length) {
            setDuplicates(childObj.children, groupElemsMap)
        }
    }
}
