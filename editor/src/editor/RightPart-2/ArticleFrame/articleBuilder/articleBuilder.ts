import {ReactElement} from 'react'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import createJsxFromHtmlObj from './htmlToJSX';
import { HTMLObjArrType } from './parceComponent/htmlStringToObject';
import { parseComponent } from './parceComponent/parseComponent'


export default function buildArticle(articleData: ArticleTypes.Component[], tempComps: TempCompTypes.TempComp[]): ReactElement {

    // Переберу массив компонентов
    let componentsArr: HTMLObjArrType.Arr = articleData.map(
        compObj => parseComponent(compObj, tempComps)
    )

    // Создать JSX из html-объекта
    return createJsxFromHtmlObj(componentsArr)
}



