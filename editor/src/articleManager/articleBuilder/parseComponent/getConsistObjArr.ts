import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import articleManager from '../../articleManager'
import { HTMLObjArrType } from '../htmlStringToObject'

export type ConsistObj = {
    dataComp: ArticleTypes.Component  // Данные компонента
    dElem: ArticleTypes.ComponentElem // Данные элемента
    tempElem: TempCompTypes.Elem      // Шаблон элемента
    htmlComp: HTMLObjArrType.Tag      // html-компонент
    htmlElem: HTMLObjArrType.Tag
}

export default function getConsistObjArr(
    htmlObjArr: HTMLObjArrType.Arr,
    template: TempCompTypes.TempComp,
    consistObjArr: ConsistObj[],
    compData: ArticleTypes.Component,
) {
    for(let i = 0; i < htmlObjArr.length; i++) {
        const htmlObj = htmlObjArr[i]

        if ('text' in htmlObj) continue

        if (htmlObj.attrs && htmlObj.attrs['data-em-id']) {
            const tElemId = htmlObj.attrs['data-em-id']
            const tElem = template.content?.elems.find(tempElem => tempElem.elemId === tElemId)

            const consistObj: ConsistObj = {
                dataComp: compData,
                dElem: articleManager.getDElemInDComp(compData, parseInt(htmlObj.attrs['data-em-d-elem-id'])),
                tempElem: tElem,
                htmlComp: htmlObjArr[0] as HTMLObjArrType.Tag,
                htmlElem: htmlObj
            }

            consistObjArr.push(consistObj)
        }

        if (htmlObj.children) {
            getConsistObjArr(htmlObj.children, template, consistObjArr, compData)
        }
    }

    return consistObjArr
}
