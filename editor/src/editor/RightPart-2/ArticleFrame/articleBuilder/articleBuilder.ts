import {ReactElement} from 'react'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import createJsxFromHtmlObj from './htmlToJSX';
import { HTMLObjArrType } from './parceComponent/htmlStringToObject';
import { parseComponent } from './parceComponent/parseComponent'


export default function buildArticle(articleData: ArticleTypes.Article, tempComps: TempCompTypes.TempComp[]): ReactElement {

    // Переберу массив компонентов
    let componentsArr: HTMLObjArrType.Arr = articleData.components.map(
        compObj => parseComponent(<ArticleTypes.Component>compObj, tempComps)
    )

    // Создать JSX из html-объекта
    return createJsxFromHtmlObj(componentsArr)
}



