import { ConsistObj } from './getConsistObjArr'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import { HTMLObjArrType } from '../htmlStringToObject'

/**
 * Set the assigned attributes to element
 * @param {Object} consistObj — an object with link to dataComp, dataElem, tempElem and htmlElem
 */
export default function setAttribs(consistObj: ConsistObj) {

    // Set attributes
    if (!consistObj.tempElem.elemAttrs?.length) return

    // Перебрать массив атрибутов из данных
    for (let dAttr of consistObj.dElem.dCompElemAttrs) {
        // Получение шаблона атрибута
        const tElemAttr = consistObj.tempElem.elemAttrs.find(tElemAttr => {
            return tElemAttr.elemAttrId === dAttr.tCompElemAttrId
        })

        // Временно все значения атрибутов я буду записывать в массив и ставить в атрибут элемента в html-объекте.
        // Ниже по сценарию он будет превращён в строку.
        if (!(Array.isArray(consistObj.htmlElem.attrs[tElemAttr.elemAttrName]))) {
            // Если в атрибуте элемента не стоит пустой массив, то поставить
            // @ts-ignore
            consistObj.htmlElem.attrs[tElemAttr.elemAttrName] = []
        }

        // Поставить в массив значений атрибута html-элемента заблокированное значение
        if (tElemAttr.elemAttrLockedValue) {
            // @ts-ignore
            consistObj.htmlElem.attrs[tElemAttr.elemAttrName].push(tElemAttr.elemAttrLockedValue)
        }

        // Добавить в массив значений атрибута html-элемента другие значения
        setAttribToHtmlElem(tElemAttr, dAttr, consistObj.htmlElem)
    }


    // Перебор всех атрибутов html-элемента
    for (let key in consistObj.htmlElem.attrs) {
        // Значение перебираемого атрибута в html-элементе
        const htmlAttr = consistObj.htmlElem.attrs[key]

        // Если там находится массив, то слить его в одну строку. А значения разделить пробелами.
        // В будущем для шаблона можно сделать свойство задающее разделительный символ для значений атрибута
        // Если он не указан, то значения разделяются пробелом. Если указан, то этим символом.
        if (Array.isArray(htmlAttr)) {
            consistObj.htmlElem.attrs[key] = htmlAttr.join(' ')
        }
    }
}

/**
 * Функция помещает значения атрибута в массив значений атрибута html-элемента
 * @param {Object} tElemAttr — шаблон атрибута элемента
 * @param {Object} dAttr — данные атрибута элемента
 * @param {Object} htmlElem — html-element object
 */
function setAttribToHtmlElem(
    tElemAttr: TempCompTypes.ElemAttr,
    dAttr: ArticleTypes.Attrib,
    htmlElem: HTMLObjArrType.Tag
) {
    const attrName = tElemAttr.elemAttrName // 'class'

    // Если в данных атрибута находится массив, то там находятся идентификаторы значений атрибута
    if (Array.isArray(dAttr.dCompElemAttrValue)) {
        for (let i = 0; i < dAttr.dCompElemAttrValue.length; i++) {
            // id значения
            const dAttrValueId = dAttr.dCompElemAttrValue[i]

            // Найти шаблон выбранного атрибута элемента
            const tElemAttrValueObj =  tElemAttr.elemAttrValues.find(tElemAttrValueObj => tElemAttrValueObj.elemAttrValueId === dAttrValueId)

            if (tElemAttrValueObj) {
                // Поставить значение атрибута в массив значений атрибута html-элемента
                // @ts-ignore
                htmlElem.attrs[attrName].push(tElemAttrValueObj.elemAttrValueValue)
            }
        }
    }
    // Если в данных атрибута находится строка, то поставить её в массив значений атрибута html-элемента
    else {
        // @ts-ignore
        htmlElem.attrs[attrName].push(dAttr.dCompElemAttrValue)
    }
}
