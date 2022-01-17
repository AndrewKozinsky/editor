import { MiscTypes } from '../../../types/miscTypes'
import { HTMLObjArrType } from './htmlStringToObject'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import { createDeepCopy } from 'utils/miscUtils'

/**
 * Function synchronize the number of elements in html object with number of elements in component data
 * @param {Object} htmlObj — html-объект в который требуется добавить копии элементов
 * @param {Object} dataComp — объект с информацией о конфигурации элемента в статье
 */
export function putRepeatedElems(htmlObj: HTMLObjArrType.Tag, dataComp: ArticleTypes.Component) {
    if (!dataComp.dElems) return

    // Создание объекта с данными по копиям элементов
    let groupElemsMap = createElemsMap(dataComp)

    // Поставить копии элементов (если требуется) и в каждый элемент поставить дополнительные атрибуты
    setDuplicates(htmlObj.children, groupElemsMap, dataComp.dCompId)
}

type ElemsMapType = MiscTypes.ObjStringKey<{dCompElemId: number, hidden: boolean}[]>

/**
 * Функция формирует объект вида:
 * {
 *     id данных элемента и является ли он скрытым. В массиве количество копий элемента.
 *     'banner': [ {dCompElemId: 2, hidden: false}, {dCompElemId: 3, hidden: true} ],
 *     'cell': [ {dCompElemId: 4, hidden: false} ]
 * }
 * The function forms array of objects like { 'banner-group': [...], 'cell-group': [...] }.
 * A key is a data element group name (elemGroup property), value is an object with data elem id
 * @param {Object} dataComp — element data object
 */
function createElemsMap(dataComp: ArticleTypes.Component) {
    const elemsMap: ElemsMapType = {}

    for (let dataElem of dataComp.dElems) {
        const elemId = dataElem.tCompElemId

        if (!elemsMap[elemId]) {
            elemsMap[elemId] = []
        }

        elemsMap[elemId].push(
            {
                dCompElemId: dataElem.dCompElemId, // id данных элемента
                hidden: dataElem.dCompElemLayer?.layerHidden || false // является ли элемент скрытым
            }
        )
    }

    return elemsMap
}

/**
 * Функция ставит копии элементов (если требуется) и в каждый элемент ставит дополнительные атрибуты
 * @param {Array} htmlParentArr — массив детей htmlObj
 * @param {Array} elemsMap — массив с данными о количестве элементов каждой группы
 * @param {Number} dCompId — id данных компонента
 */
function setDuplicates(htmlParentArr: HTMLObjArrType.Arr, elemsMap: ElemsMapType, dCompId: number) {
    if (!htmlParentArr) return

    for (let i = 0; i < htmlParentArr.length; i++) {
        const htmlChild = htmlParentArr[i]

        if ('text' in htmlChild) continue

        const htmlElemId = htmlChild.attrs['data-em-id']

        if (elemsMap[htmlElemId]) {
            // Проход по всем элементам группы
            for (let k = 0; k < elemsMap[htmlElemId].length; k++) {
                const elemMapItem = elemsMap[htmlElemId][k]

                // Если первый элемент, то поставить html-элементу атрибуты с id данных компонента и элемента
                if (k === 0) {
                    htmlChild.attrs['data-em-d-comp-id'] = dCompId.toString()
                    htmlChild.attrs['data-em-d-elem-id'] = elemMapItem.dCompElemId.toString()

                    // Поставить атрибут data-em-display="hidden" если элемент является скрытым
                    if (elemMapItem.hidden) {
                        htmlChild.attrs['data-em-display'] = 'hidden'
                    }
                }
                // Остальные элементы создаются через клонирование htmlChild и вставку в массив где находится htmlChild
                else {
                    const htmlChildObjClone = createDeepCopy(htmlChild)

                    htmlChildObjClone.attrs['data-em-d-comp-id'] = dCompId.toString()
                    htmlChildObjClone.attrs['data-em-d-elem-id'] = elemMapItem.dCompElemId.toString()

                    // Поставить атрибут data-em-display="hidden" если элемент является скрытым
                    if (elemMapItem.hidden) {
                        htmlChild.attrs['data-em-display'] = 'hidden'
                    }

                    // Поставить элемент после перебираемого элемента
                    htmlParentArr.splice(i + 1, 0, htmlChildObjClone)
                }
            }

            i += elemsMap[htmlElemId].length - 1
        }

        if (htmlChild.children && htmlChild.children.length) {
            setDuplicates(htmlChild.children, elemsMap, dCompId)
        }
    }
}