import TempCompTypes from '../../../store/article/codeType/tempCompCodeType'
import articleManager from '../../articleManager'
import { HTMLObjArrType } from './htmlStringToObject'
import ArticleTypes from 'store/article/codeType/articleCodeType'

/**
 * Функция ставит дополнительные атрибуты главной обёртке компонента в htmlObj
 * @param {Object} htmlObj — html-объект в который требуется добавить копии элементов
 * @param {Object} dataComp — объект с информацией о конфигурации элемента в статье
 * @param {Object} tComp — шаблон компонента
 */
export function setExtraAttribsToRootTag(
    htmlObj: HTMLObjArrType.Tag, dataComp: ArticleTypes.Component, tComp: TempCompTypes.TempComp
) {
    if (!htmlObj.attrs) htmlObj.attrs = {}

    // id компонента
    htmlObj.attrs['data-em-d-gen-comp-id'] = dataComp.dCompId.toString()

    // Так как корневой тег является элементом, то поставить id данных компонента
    htmlObj.attrs['data-em-d-comp-id'] = dataComp.dCompId.toString()

    // И id данных элемента
    const dElemId = getDataElemId( dataComp.dElems, htmlObj.attrs['data-em-id'] )
    htmlObj.attrs['data-em-d-elem-id'] = dElemId.toString()

    // Поставить атрибут data-em-display="hidden" если элемент является скрытым
    // При переводе в JSX такие элементы не будут отрисовываться
    const rootTElem = articleManager.getRootTElem(tComp)
    const rootDElem = articleManager.getDElemByTElem(dataComp, rootTElem.elemId)

    if (rootDElem.dCompElemLayer?.layerHidden) {
        htmlObj.attrs['data-em-display'] = 'hidden'
    }
}

/**
 * Функция возвращает id данных элемента по id шаблона элемента
 * @param {Array} dElems — массив данных элементов
 * @param {String} tElemId — id шаблона элемента
 */
function getDataElemId(dElems:  ArticleTypes.ComponentElems, tElemId: string): number {
    const elemData = dElems.find(dElem => dElem.tCompElemId === tElemId)

    return elemData ? elemData.dCompElemId : 0
}
