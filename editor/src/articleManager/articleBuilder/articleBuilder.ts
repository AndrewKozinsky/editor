import React, { ReactElement } from 'react'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import createJsxFromComponents from './componentsToJSX'
import createHTMLFromComponents from './createHTMLFromComponents'
import { HTMLObjArrType } from './parseComponent/htmlStringToObject'
import { parseComponent } from './parseComponent/parseComponent'

/**
 * Функция превращает данные статьи и шаблоны компонентов в JSX для отрисовки в IFrame-е.
 * @param {Object} articleData — данные статьи.
 * @param tempComps — масссив шаблонов компонентов.
 */
export function turnArticleDataToJSX(articleData: ArticleTypes.Article, tempComps: TempCompTypes.TempComp[]): ReactElement[] {
    const componentsArr = createComponentsArr(articleData, tempComps)

    // Create JSX from components array
    return createJsxFromComponents(componentsArr)
    // Пример кода возвращаемый функцией
    // return [React.createElement( 'p', {}, ['Hello, world!'] )]
}

/**
 * Функция превращает данные статьи и шаблоны компонентов в HTML. Нужно чтобы получить итоговую разметку для вставки на сайт.
 * @param {Object} articleData — данные статьи.
 * @param tempComps — массив шаблонов компонентов.
 */
export function turnArticleDataToHTML(articleData: ArticleTypes.Article, tempComps: TempCompTypes.TempComp[]): string {
    const componentsArr = createComponentsArr(articleData, tempComps)

    // Create HTML from components array
    return createHTMLFromComponents(componentsArr)
}

function createComponentsArr(articleData: ArticleTypes.Article, tempComps: TempCompTypes.TempComp[]) {
    // Переберу массив компонентов
    let componentsArr: HTMLObjArrType.Arr = articleData.dComps.map(
        compObj => parseComponent(<ArticleTypes.Component>compObj, tempComps)
    )

    return componentsArr
}
