import { MiscTypes } from '../../../types/miscTypes'
import { HTMLObjArrType } from './htmlStringToObject'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import { createDeepCopy } from 'src/utils/miscUtils'

/**
 * Function synchronize the number of elements in html object with number of elements in component data
 * @param {Object} htmlObj — html-объект в который требуется добавить копии элементов
 * @param {Object} dataComp — объект с информацией о конфигурации элемента в статье
 */
export function putRepeatedElems(htmlObj: HTMLObjArrType.Tag, dataComp: ArticleTypes.Component) {
    if (!dataComp.dElems) return

    // Создание объекта с данными по копиям элементов
    let groupElemsMap = createGroupElemsMap(dataComp)

    // Поставить копии элементов (если требуется) и в каждый элемент поставить дополнительные атрибуты
    setDuplicates(htmlObj.children, groupElemsMap, dataComp.dCompId)
}


type GroupElemsMapType = MiscTypes.ObjStringKey<{dCompElemId: number}[]>

/**
 * Функция формирует объект вида:
 * {
 *     Имя группы. В массиве количество элементов входящие в группу.
 *     Если более одного, то нужно будет создать копии.
 *     'banner-group': [ {dCompElemId: 2}, {dCompElemId: 3} ],
 *     'cell-group': [ {dCompElemId: 4} ]
 * }
 * The function forms array of objects like { 'banner-group': [...], 'cell-group': [...] }.
 * A key is a data element group name (elemGroup property), value is an object with data elem id
 * @param {Object} dataComp — element data object
 */
function createGroupElemsMap(dataComp: ArticleTypes.Component) {
    const groupElemsMap: GroupElemsMapType = {}

    for (let dataElem of dataComp.dElems) {
        const groupName = dataElem.dCompElemGroup

        if (!groupElemsMap[groupName]) {
            groupElemsMap[groupName] = []
        }

        groupElemsMap[groupName].push(
            {dCompElemId: dataElem.dCompElemId}
        )
    }

    return groupElemsMap
}

/**
 * Функция ставит копии элементов (если требуется) и в каждый элемент ставит дополнительные атрибуты
 * @param {Array} htmlParentArr — массив детей htmlObj
 * @param {Array} groupElemsMap — массив с данными о количестве элементов каждой группы
 * @param {Number} dCompId — id данных компонента
 */
function setDuplicates(htmlParentArr: HTMLObjArrType.Arr, groupElemsMap: GroupElemsMapType, dCompId: number) {
    if (!htmlParentArr) return

    for (let i = 0; i < htmlParentArr.length; i++) {
        const htmlChild = htmlParentArr[i]

        if ('text' in htmlChild) continue

        const groupName = htmlChild.attrs['data-em-group']

        if (groupElemsMap[groupName]) {
            // Проход по всем элементам группы
            for (let k = 0; k < groupElemsMap[groupName].length; k++) {
                // Если первый элемент, то поставить html-элементу атрибуты с id данных компонента и элемента
                if (k === 0) {
                    htmlChild.attrs['data-em-d-comp-id'] = dCompId.toString()
                    htmlChild.attrs['data-em-d-elem-id'] = groupElemsMap[groupName][0].dCompElemId.toString()
                }
                // Остальные элементы создаются через клонирование htmlChild и вставку в массив где находится htmlChild
                else {
                    const htmlChildObjClone = createDeepCopy(htmlChild)

                    htmlChildObjClone.attrs['data-em-d-comp-id'] = dCompId.toString()
                    htmlChildObjClone.attrs['data-em-d-elem-id'] = groupElemsMap[groupName][k].dCompElemId.toString()

                    // TODO ТУТ ВОЗМОЖНО БУДЕТ ОШИБКА В ТОМ, ЧТО КЛОНИРОВАННЫЕ ЭЛЕМЕНТЫ БУДУТ ВСТАВЛЯТЬСЯ В КОНЕЦ МАССИВА, А НУЖНО ПОСЛЕ htmlChild
                    // ПРОВЕРЬ ЭТОТ МОМЕНТ ПОЗЖЕ
                    htmlParentArr.push(htmlChildObjClone)
                }
            }

            i += groupElemsMap[groupName].length - 1
        }

        if (htmlChild.children && htmlChild.children.length) {
            setDuplicates(htmlChild.children, groupElemsMap, dCompId)
        }
    }
}
