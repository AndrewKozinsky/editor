import React, {ReactElement} from 'react'
import { convertToCamelCase } from 'utils/StringUtils'
import {HTMLObjArrType} from './parceComponent/htmlStringToObject'

/**
 * Функция получает объект со структурой HTML и преобразует его в JSX.
 * @param {Object} htmlStructure — объект с разобранной HTML-структурой компонента
 * @param {Number} key — key
 */
export default function createJsxFromHtmlObj(htmlStructure: HTMLObjArrType.Arr, key?: number): ReactElement {
    //@ts-ignore
    return htmlStructure.map((htmlObj, i) => {
        return parseObj(htmlObj, i)
    })
}

/**
 * The function parses objects to JSX
 * @param {Object} htmlObj — object with html-structure
 * @param {Number} key — key property
 */
function parseObj(htmlObj: HTMLObjArrType.ArrItem, key: number) {
    // Если это текстовый узел...
    if('text' in htmlObj) {
        // Если в данных ничего нет, то поставить ZERO WIDTH SPACE чтобы в текстовых компонентах удалось поставить фокус в это место.
        if(htmlObj.text === '') htmlObj.text = '\u200B'

        // Вернуть текст
        return htmlObj.text
    }

    // Это тег... Получу его название.
    if ('tag' in htmlObj) {
        let tagName = htmlObj.tag

        // Подготовлю атрибуты
        let attribs = fixAttribs(htmlObj.attrs, key);

        // Подготовлю детей
        //@ts-ignore
        let children = (htmlObj.children)
                //@ts-ignore
                ? createJsxFromHtmlObj(htmlObj.children)
                : null

        // Верну созданный компонент Реакта
        return React.createElement( tagName, attribs, children )
    }
}


/**
 * Функция подготовливает атрибуты текущего элемента
 * @param {Object} objAttribs — html-структура элемента
 * @param {Number} key — key
 * @returns {*}
 */
function fixAttribs(objAttribs: HTMLObjArrType.Attrs, key: number) {

    // Если атрибутов нет, то вернуть объект с атрибутом key.
    if(!objAttribs) return {
        key: key
    }

    // Переберу объект и заменю названия свойств.
    for(let propName in objAttribs) {

        // Все классы нужно писать как className.
        if(propName === 'class') {
            let classValue = objAttribs.class;
            delete objAttribs.class;
            objAttribs.className = classValue
        }

        if(propName === 'style') {
            // В переменной будет так: box-shadow: 0 30px 55px rgba(0, 0, 0, .2); transform: translateY(5px);
            let styleStr = objAttribs[propName].trim()

            /*[
                "box-shadow: 0 30px 55px rgba(0, 0, 0, .2)",
                "transform: translateY(5px);"
            ]*/
            let styleArr = styleStr.split('; ')

            // Удалю последнюю точку с запятой
            if (styleArr[styleArr.length - 1].endsWith(';')) {
                styleArr[styleArr.length - 1] = styleArr[styleArr.length - 1].slice(0, -1)
            }

            const newStyleArr = styleArr.map((propStyleStr) => {
                let arr = propStyleStr.split(': ')
                return {
                    [convertToCamelCase(arr[0])]: arr[1]
                }
            })

            let styleObj = {}
            for(let styleArrItem of newStyleArr) {
                Object.assign(styleObj, styleArrItem)
            }

            //@ts-ignore
            objAttribs.style = styleObj
        }
    }

    //@ts-ignore
    objAttribs.key = key

    return objAttribs
}

