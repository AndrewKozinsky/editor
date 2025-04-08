import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import articleManager from 'articleManager/articleManager'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import StoreArticleTypes from 'store/article/articleTypes'
import { getState } from 'utils/miscUtils'

/**
 * The function finds current history item object
 * @param {Array} historyArr — articles history array
 * @param {Number} historyIdx — current history item index
 */
export function getCurrentHistoryItem(
    this: typeof articleManager,
    historyArr?: StoreArticleTypes.HistoryItems,
    historyIdx?: number
): StoreArticleTypes.HistoryItem {
    if (historyArr && historyIdx) {
        return historyArr[historyIdx]
    }

    const { history, historyCurrentIdx } = getState().article
    return history[historyCurrentIdx]
}

/** Функция возвращает объект с координатами подсвеченных элементов */
export function getFlashedElemCoords(
    this: typeof articleManager
) {
    const historyItem = this.getCurrentHistoryItem()

    if (!historyItem) return null

    return {
        hoveredElem: historyItem.hoveredElem,
        selectedElem: historyItem.selectedElem,
        moveHoveredComp: historyItem.moveHoveredComp,
        moveSelectedComp: historyItem.moveSelectedComp
    }
}

/**
 * The function finds component template in templates array by id.
 * @param {Array} tComps — массив шаблонов компонентов
 * @param {String} tCompId — component template id
 */
export function getTemplate(
    this: typeof articleManager,
    tComps: TempCompTypes.TempComps,
    tCompId: TempCompTypes.Id
): TempCompTypes.TempComp {
    return tComps.find((tComp) => {
        return tComp.id === tCompId
    })
}


/**
 * The function finds element template in templates array
 * @param {Array} tempCompArr — components templates array
 * @param {String} tempCompId — component template uuid
 * @param {String} tempElemId — element template uuid
 */
export function getTElemInTCompsArr(
    this: typeof articleManager,
    tempCompArr: TempCompTypes.TempComps,
    tempCompId: TempCompTypes.Id,
    tempElemId: TempCompTypes.ElemId
): null | TempCompTypes.Elem {
    const template = this.getTemplate(tempCompArr, tempCompId)
    if (!template) return null

    const tempElement = template.content.elems.find(elem => elem.elemId === tempElemId)
    return tempElement || null
}

/**
 * Поиск шаблона элемента в шаблоне компонента
 * @param {Object} tComp — шаблон компонента
 * @param {String} tempElemId — element template id
 */
export function getTElemInTComp(
    this: typeof articleManager,
    tComp: TempCompTypes.TempComp,
    tempElemId: TempCompTypes.ElemId
): null | TempCompTypes.Elem {
    if (!tComp.content.elems?.length) return null

    return tComp.content.elems.find(elem => elem.elemId === tempElemId) || null
}

/**
 * Функция возвращает шаблон элемента
 * @param {Array} tComps — массив шаблонов компонентов
 * @param {Number} tCompId — id шаблона компонента
 * @param {String} tElemId — id шаблона элемента
 */
export function getTElemByTCompIdAndTElemId(
    this: typeof articleManager,
    tComps: TempCompTypes.TempComps,
    tCompId: TempCompTypes.Id,
    tElemId: TempCompTypes.ElemId
): null | TempCompTypes.Elem {
    const tComp = articleManager.getTemplate(tComps, tCompId)
    return articleManager.getTElemInTComp(tComp, tElemId)
}

/**
 * The function finds component data in data components array
 * @param {Array} dataCompArr — array of data components
 * @param {Number} dataCompId — a desired data component id
 */
export function getComponent(
    this: typeof articleManager,
    dataCompArr: ArticleTypes.Components,
    dataCompId: ArticleTypes.Id
): null | ArticleTypes.MixComponent {
    for (let i = 0; i < dataCompArr.length; i++) {
        const dataComp = dataCompArr[i]

        if (dataComp.dCompId === dataCompId) {
            return dataComp
        }

        if (dataComp.dCompType !== 'component') continue

        let foundedComp: ArticleTypes.MixComponent

        // Проход по всем элементам и поиск компонента там
        this.dElemsEnumeration([dataComp.dElems], (dElem: ArticleTypes.ComponentElem) => {
            const res = this.getComponent(dElem.dCompElemChildren, dataCompId)
            if (res) foundedComp = res
        })

        if (foundedComp) return foundedComp
    }

    return null
}

/**
 * Поиск данных элемента в массиве данных компонентов
 * @param {Array} dataCompArr — array of data components
 * @param {Number} dataCompId — a data component id of the desired element
 * @param {Number} dataElemId — a desired element id
 */
export function getDataElemInDataCompArr(
    this: typeof articleManager,
    dataCompArr: ArticleTypes.Components,
    dataCompId: ArticleTypes.Id,
    dataElemId: ArticleTypes.Id
) {
    const component = this.getComponent(dataCompArr, dataCompId)
    if (!dataCompArr || !component) return null

    if (component.dCompType === 'component') {
        return this.getDElemInDComp(component, dataElemId)
    }
    return null
}

/**
 * Поиск данных элемента в данных компонента
 * @param {Object} dComp — a data component id of the desired element
 * @param {Number} dataElemId — a desired element id
 */
export function getDElemInDComp(
    this: typeof articleManager,
    dComp: ArticleTypes.Component,
    dataElemId: ArticleTypes.Id
): null | ArticleTypes.ComponentElem {

    let foundedDElem: ArticleTypes.ComponentElem = null

    this.dElemsEnumeration([dComp.dElems], dElem => {
        if (dElem.dCompElemId === dataElemId) {
            foundedDElem = dElem
        }
    })

    return foundedDElem
}

/**
 * The function returns element template by DataCompId and DataElemId
 * @param {Array} dataCompArr — array of data components
 * @param {String} dataCompId — data component id which I have to get element template
 * @param {String} dataElemId — data element id which I have to get element template
 * @param {Array} tempCompArr — components templates array
 */
export function getTElemByDCompIdAndDElemId(
    this: typeof articleManager,
    dataCompArr: ArticleTypes.Components,
    dataCompId: ArticleTypes.Id,
    dataElemId: ArticleTypes.Id,
    tempCompArr: TempCompTypes.TempComps,
): null | TempCompTypes.Elem {

    // Get data component
    const foundedDataComp = this.getComponent(dataCompArr, dataCompId)
    if (!foundedDataComp || foundedDataComp.dCompType === 'simpleTextComponent') return null

    // Get data element
    const foundedDataElem = this.getDElemInDComp(foundedDataComp, dataElemId)
    if (!foundedDataElem) return null

    // Get element template
    const foundedTempComp =  this.getTemplate(tempCompArr, foundedDataComp.tCompId)
    if (!foundedTempComp) return null

    // Get template element and return it
    return this.getTElemInTComp(foundedTempComp, foundedDataElem.tCompElemId)
}


/**
 * The function finds an array in witch component is
 * @param {Array} dCompArr — array of data components
 * @param {String} dCompId — a data component id
 */
export function getCompParentArray(
    this: typeof articleManager,
    dCompArr: ArticleTypes.Components,
    dCompId: ArticleTypes.Id,
): null | ArticleTypes.Components {
    let parentArray: null | ArticleTypes.Components = null

    for (let i = 0; i < dCompArr.length; i++) {
        const dataComp = dCompArr[i]

        if (dataComp.dCompId === dCompId) {
            parentArray = dCompArr
        }
        else {
            const foundedArr = this.findParentArray(dataComp, dCompId)
            if (foundedArr) {
                parentArray = foundedArr
                break
            }
        }
    }

    return parentArray
}

/**
 * Функция возвращает массив, в котором находится компонент
 * @param {Object} dataComp — данные компонента, в котором находится другой компонент
 * @param {Number} dataCompId — id компонента, у которого нужно найти массив, в который он вложен
 * @returns {Array}
 */
export function findParentArray(
    this: typeof articleManager,
    dataComp: ArticleTypes.MixComponent,
    dataCompId: ArticleTypes.Id
): null | ArticleTypes.Components {
    if (dataComp.dCompType === 'simpleTextComponent' || !dataComp.dElems) return null

    let foundedParentArr: ArticleTypes.Components

    this.dElemsEnumeration([dataComp.dElems], (dElem) => {
        if (dElem.dCompElemChildren.length) {
            for (let j = 0; j < dElem.dCompElemChildren.length; j++) {
                const innerDataComp = dElem.dCompElemChildren[j]

                if (innerDataComp.dCompId === dataCompId) {
                    foundedParentArr = dElem.dCompElemChildren
                }
                else {
                    const res = this.findParentArray(innerDataComp, dataCompId)
                    if (res) foundedParentArr = res
                }
            }
        }
    })

    return foundedParentArr || null
}

/**
 * Функция возвращает idx компонента в массиве
 * @param {Array} array — массив компонентов
 * @param {Number} dCompId — id искомого компонента
 */
export function getDCompIdxInArray(
    this: typeof articleManager,
    array: ArticleTypes.Components,
    dCompId: ArticleTypes.Id
) {
    return array.findIndex(dComp => dComp.dCompId === dCompId)
}

/**
 * Возвращает количество элементов с переданным id шаблона в переданном массиве.
 * Функция не ищет во всём компоненте.
 * @param {Array} innerElemsArr — массив элементов
 * @param {Object} dElem — данные элемента
 * @returns {number}
 */
export function getElemCountInInnerElemsArr(
    this: typeof articleManager,
    innerElemsArr: ArticleTypes.ComponentElems,
    dElem: ArticleTypes.ComponentElem
) {
    const elemTId = dElem.tCompElemId

    const elems = innerElemsArr.filter(dElem => {
        return dElem.tCompElemId === elemTId
    })

    return elems.length
}

/**
 * Получение HTML-компонента
 * @param {Array} tComps — массив шаблонов компонентов
 * @param {Number} tCompId — id шаблона компонента
 */
export function get$componentByTComps(
    this: typeof articleManager,
    tComps: TempCompTypes.TempComps,
    tCompId: TempCompTypes.Id
): null | HTMLElement {
    // Get component template
    const tComp =  this.getTemplate(tComps, tCompId)
    if (!tComp) return null

    return this.get$componentByTComp(tComp)
}

/**
 * Получение HTML-компонента
 * @param {Array} tComp — массив шаблонов компонентов
 */
export function get$componentByTComp(
    this: typeof articleManager,
    tComp: TempCompTypes.TempComp,
): null | HTMLElement {
    // Turn html-string to HTMLElement
    const parser = new DOMParser()
    const doc = parser.parseFromString(tComp.content.html, 'text/html')
    return doc.body.childNodes[0] as HTMLElement
}

/**
 * Функция возвращает html-элемент компонента
 * @param {Array} tComps — components templates array
 * @param {Number} tCompId — id шаблона компонента
 * @param {String} tElemId — id шаблона элемента
 */
export function get$elem(
    this: typeof articleManager,
    tComps: TempCompTypes.TempComps,
    tCompId: TempCompTypes.Id,
    tElemId: TempCompTypes.ElemId
) {
    const $component = this.get$componentByTComps(tComps, tCompId)

    let $elem: HTMLElement = $component.closest(`[data-em-id=${tElemId}]`)
    if (!$elem) $elem = $component.querySelector(`[data-em-id=${tElemId}]`)

    return $elem || null
}

/**
 * Функция находит данные элемента по id шаблона элемента
 * @param {Object} dComp — данные компонента
 * @param {String} tElemId — id шаблона элемента
 */
/*export function getDElemByTElem(
    this: typeof articleManager,
    dComp: ArticleTypes.Component,
    tElemId: TempCompTypes.ElemId
) {
    return dComp.dElems.find(dElem => dElem.tCompElemId === tElemId)
}*/


/**
 * Поиск компонента/элемента в элементе
 * @param {Object} dElem — элемент в котором нужно найти другой компонент/элемент.
 * @param {Number} childDCompId — id данных искомого компонента (если передали без childDElemId)
 * @param {Number} childDElemId — id данных искомого элемента
 */
/*export function getItemInDElem(
    this: typeof articleManager,
    dElem: ArticleTypes.ComponentElem,
    childDCompId: ArticleTypes.Id,
    childDElemId: null | ArticleTypes.Id,
) {
    if (dElem.dCompElemChildren.length) {
        const foundedChildItem = childDElemId
            ? this.getDataElemInDataCompArr(dElem.dCompElemChildren, childDCompId, childDElemId)
            : this.getComponent(dElem.dCompElemChildren, childDCompId)

        return foundedChildItem || null
    }

    return null
}*/

/**
 * Поиск компонента/элемента в компоненте
 * @param {Object} targetDComp — компонент, в котором нужно найти другой компонент/элемент.
 * @param {Number} childDCompId — id данных искомого компонента (если передали без childDElemId)
 * @param {Number} childDElemId — id данных искомого элемента
 */
export function getItemInDComp(
    this: typeof articleManager,
    targetDComp: ArticleTypes.Component,
    childDCompId: ArticleTypes.Id,
    childDElemId: null | ArticleTypes.Id,
) {
    // Если и целевой и дочерний компонент один и тот же
    if (targetDComp.dCompId === childDCompId) {
        // Если передали id элемента, то найти элемент и вернуть в противном случае null
        return childDElemId
            ? this.getDElemInDComp(targetDComp, childDElemId)
            : null
    }

    this.dElemsEnumeration([targetDComp.dElems], (targetDElem) => {
        // Если не передали id дочернего элемента, то найти компонент
        const foundedItem = childDElemId
            ? this.getDataElemInDataCompArr(
                targetDElem.dCompElemChildren, childDCompId, childDElemId
            )
            : this.getComponent(targetDElem.dCompElemChildren, childDCompId)

        if (foundedItem) return foundedItem
    })

    return null
}

/**
 * Функция возвращает шаблон корневого элемента
 * @param {Array} tComps — массив шаблонов компонентов
 * @param {Number} tCompId — id шаблона компонента
 */
export function getRootTElemByTComps(
    this: typeof articleManager,
    tComps: TempCompTypes.TempComps,
    tCompId: TempCompTypes.Id,
): TempCompTypes.Elem {
    const tComp = this.getTemplate(tComps, tCompId)

    return this.getRootTElem(tComp)
}

/**
 * Функция возвращает шаблон корневого элемента
 * @param {Object} tComp — шаблон компонента
 */
export function getRootTElem(
    this: typeof articleManager,
    tComp: TempCompTypes.TempComp,
): TempCompTypes.Elem {
    // Получение html-компонента, чтобы узнать data-em-id корневого тега
    const $component = this.get$componentByTComp(tComp)
    const rootTElemId = $component.dataset['emId']
    if (!rootTElemId) return null

    // Поиск элемента с id как у корневого тега
    return tComp.content.elems.find(tElem => tElem.elemId === rootTElemId)
}

/**
 * Функция ищет и возвращает html-элемент по переданным id компонента и элемента
 * @param {HTMLBodyElement} $body — ссылка на <body> с разметкой шаблона
 * @param {Number} dCompId — id данных компонента
 * @param {Number} dElemId — id данных элемента
 */
export function get$elemBy$body(
    $body: StoreArticleTypes.BodyLink,
    dCompId: null | ArticleTypes.Id,
    dElemId?: null | ArticleTypes.Id,
) {
    const queryStr = dElemId
        ? `[data-em-d-comp-id="${dCompId}"][data-em-d-elem-id="${dCompId}"]`
        : `[data-em-d-gen-comp-id="${dCompId}"]`

    return $body.querySelector(queryStr)
}

/**
 * Функция находит шаблон элемента в массиве шаблонов элементов по переданному id
 * @param {String} tElemId — id шаблона элемента
 * @param {Array} tElems — массив шаблонов элементов
 */
export function getTElemInTElems(
    this: typeof articleManager,
    tElemId: TempCompTypes.ElemId,
    tElems: TempCompTypes.Elems
): TempCompTypes.Elem {
    return tElems.find(tElem => tElem.elemId === tElemId)
}

/**
 * Функция возвращает пустое значение данных атрибута в зависимости от шаблона атрибута элемента
 * @param {Object} tElemAttr — данные об атрибуте из шаблона элемента
 */
export function getDElemAttrEmptyValue(
    this: typeof articleManager,
    tElemAttr: TempCompTypes.ElemAttr
): ArticleTypes.ComponentElemAttribValue {
    // Если значение атрибута будут вводить в текстовом поле, то в значении поставить пустую строку.
    // Все остальные поля ставят идентификаторы в массив, поэтому поставлю пустой массив.

    // Если в elemAttrView не определено поле ввода значения атрибута,
    // то нужно посмотреть на то указан ли в tElemAttr.elemAttrValues массив.
    // Если массив, то значит id значений будут писаться в массив. В противном случае будут писать точное значение в строку.
    if (!tElemAttr.elemAttrView) {
        return Array.isArray(tElemAttr.elemAttrValues) ? [] : ''
    }
        // Если определено поле ввода значения атрибута, то если это текст, то поставить пустую строку,
    // во всех остальных случаях это будет массив для идентификаторов значений.
    else {
        return tElemAttr.elemAttrView === 'text' ? '' : []
    }
}

/**
 * Функция получает шаблон атрибута и возвращает значения, которые должны быть установлены по умолчанию при создании компонента
 * @param {Object} tElemAttr — данные об атрибуте из шаблона элемента
 */
export function getTElemAttrDefaultCheckedValues(
    this: typeof articleManager,
    tElemAttr: TempCompTypes.ElemAttr
): null | TempCompTypes.ElemAttrValueId[] {
    // Возвратить null если нет массива предопределённых значений атрибута
    if (!tElemAttr.elemAttrValues) return null

    // Массив, куда попадут значения атрибуты, которые должны быть поставлены по умолчанию
    const attrDefaultCheckedValues: TempCompTypes.ElemAttrValueId[] = []
    
    for (let valueObj of tElemAttr.elemAttrValues) {
        if (valueObj.elemAttrValueChecked) {
            attrDefaultCheckedValues.push(valueObj.elemAttrValueId)
        }
    }

    return attrDefaultCheckedValues
}

/**
 * Функция проходит все элементы из объекта данных компонента
 * @param {Array} dElems — элементы массив dElems
 * @param {Function} callback — функция запускаемая при переборе элементов.
 * В аргумент передаётся объект с данными элемента.
 */
export function dElemsEnumeration(
    this: typeof articleManager,
    dElems: ArticleTypes.ComponentElems,
    callback: (dElem: ArticleTypes.ComponentElem) => any
) {
    for(let i = 0; i < dElems.length; i++) {
        const dElem = dElems[i]
        callback(dElem)

        if (dElem.dCompElemInnerElems) {
            this.dElemsEnumeration(dElem.dCompElemInnerElems, callback)
        }
    }
}

/**
 * Функция возвращает массив dCompElemInnerElems в котором находится элемент с переданным id
 * @param {Array} elemInnerElemsArr — массив данных элементов
 * @param {Number} targetDElemId — id искомого элемента
 */
export function getDElemInnerElemsArrByElemId(
    this: typeof articleManager,
    elemInnerElemsArr: ArticleTypes.ComponentElems,
    targetDElemId?: null | ArticleTypes.Id,
): null |  ArticleTypes.ComponentElems {

    for(let i = 0; i < elemInnerElemsArr.length; i++) {
        const dElem = elemInnerElemsArr[i]

        if (dElem.dCompElemId === targetDElemId) {
            return elemInnerElemsArr
        }
        else if (dElem.dCompElemInnerElems) {
            const res = this.getDElemInnerElemsArrByElemId(dElem.dCompElemInnerElems, targetDElemId)
            if (res) return res
        }
    }

    return null
}


/**
 * Функция возвращает максимальный id данных элементов.
 * @param {Array} dElems — элементы компонента
 */
export function getMaxElemId(
    this: typeof articleManager,
    dElems: ArticleTypes.ComponentElems,
) {
    let maxElemId = 1
    articleManager.dElemsEnumeration(dElems, (dElem: ArticleTypes.ComponentElem) => {
        if (dElem.dCompElemId > maxElemId) {
            maxElemId = dElem.dCompElemId
        }
    })

    return maxElemId
}

/**
 * Получение количества элементов с определённым id шаблона элемента в данных
 * @param {Array} dElems — элементы массив dElems
 * @param {String} tElemId — id шаблона элемента
 */
export function getAmountOfElems(
    this: typeof articleManager,
    dElems: ArticleTypes.ComponentElems,
    tElemId: TempCompTypes.ElemId,
) {
    let elemsCount = 0

    this.dElemsEnumeration(dElems, (dElem) => {
        if (dElem.tCompElemId === tElemId) {
            elemsCount++
        }
    })

    return elemsCount
}