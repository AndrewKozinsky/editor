import { HTMLObjArrType } from './htmlStringToObject'
import ArticleTypes from 'store/article/codeType/articleCodeType'

/**
 * Функция ставит дополнительные атрибуты главной обёртке компонента в htmlObj
 * @param {Object} htmlObj — html-объект в который требуется добавить копии элементов
 * @param {Object} dataComp — объект с информацией о конфигурации элемента в статье
 */
export function setExtraAttribsToMainTag(htmlObj: HTMLObjArrType.Tag, dataComp: ArticleTypes.Component) {
    if (!htmlObj.attrs) htmlObj.attrs = {}

    // id компонента
    htmlObj.attrs['data-em-d-gen-comp-id'] = dataComp.dCompId.toString()

    // Поставить атрибут data-em-display="hidden" если компонент является скрытым
    if (dataComp.dCompLayer?.layerHidden) {
        htmlObj.attrs['data-em-display'] = 'hidden'
    }

    // Если главной обёртка является элементом
    if (htmlObj.attrs['data-em-id']) {

        // То поставить id данных компонента
        htmlObj.attrs['data-em-d-comp-id'] = dataComp.dCompId.toString()

        // И id данных элемента
        const dElemId = getDataElemId( dataComp.dElems, htmlObj.attrs['data-em-id'] )
        htmlObj.attrs['data-em-d-elem-id'] = dElemId.toString()
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
