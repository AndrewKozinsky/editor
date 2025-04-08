import React, { ReactElement } from 'react'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import articleManager from '../articleManager'
import createJsxFromComponents from './componentsToJSX'
import createHTMLFromComponents from './createHTMLFromComponents'
import { HTMLObjArrType } from './htmlStringToObject'
import parseTextComponent from './parseTextComponent'
import parseComponent from './parseComponent/parseComponent'

/**
 * Функция превращает данные статьи и шаблоны компонентов в JSX для отрисовки в IFrame-е.
 * @param {Object} articleData — данные статьи.
 * @param tempComps — массив шаблонов компонентов.
 */
export function turnArticleDataToJSX(articleData: ArticleTypes.Article, tempComps: TempCompTypes.TempComp[]): ReactElement[] {
    const componentsArr = createComponentsArr(articleData.dComps, tempComps)

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
export function turnArticleDataToHTML(
    this: typeof articleManager,
    articleData: ArticleTypes.Article,
    tempComps: TempCompTypes.TempComp[]
): string {
    const componentsArr = createComponentsArr(articleData.dComps, tempComps)

    // Create HTML from components array
    return createHTMLFromComponents(componentsArr)
}


/**
 * Функция превращает данные статьи и шаблоны компонентов в массив html-подобных объектов.
 * В других сценариях его можно превратить в JSX.
 * @param {Array} dComps — массив с данными компонентов.
 * @param {Array} tempComps — массив шаблонов компонентов
 */
export function createComponentsArr(
    dComps: ArticleTypes.Components,
    tempComps: TempCompTypes.TempComp[]
): HTMLObjArrType.Arr {
    // Переберу массив компонентов
    let componentsArr = dComps.map(compObj => {
            if (compObj.dCompType === 'simpleTextComponent') {
                return parseTextComponent(compObj)
            }
            else if (compObj.dCompType === 'component') {
                return parseComponent(<ArticleTypes.Component>compObj, tempComps)
            }
        }
    )

    return componentsArr as HTMLObjArrType.Arr
}
