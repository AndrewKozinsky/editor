import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import { HTMLObjArrType } from '../htmlStringToObject'
import ArticleTypes from 'store/article/codeType/articleCodeType'

/**
 * Функция ставит дополнительные атрибуты главной обёртке компонента в htmlObj
 * @param {Object} htmlObjArr — Массив html-объектов
 * @param {Object} dataComp — объект с информацией о конфигурации элемента в статье
 * @param {Object} tComp — шаблон компонента
 */
export function setExtraAttribsToRootTag(
    htmlObjArr: HTMLObjArrType.Arr, dataComp: ArticleTypes.Component, tComp: TempCompTypes.TempComp
) {
    const htmlObj = htmlObjArr[0] as HTMLObjArrType.Tag

    // id компонента
    htmlObj.attrs['data-em-d-gen-comp-id'] = dataComp.dCompId.toString()
}