import React from 'react';
import { convertToCamelCase } from 'utils/StringUtils';
/**
 * Функция получает массив со структурой HTML и преобразует его в JSX.
 * @param {Object} htmlStructure — объект с разобранной HTML-структурой компонента
 * @param {Number} key — key
 */
export default function createJsxFromComponents(htmlStructure, key) {
    //@ts-ignore
    return htmlStructure.map((htmlObj, i) => {
        if ('text' in htmlObj) {
            return handleTextObject(htmlObj);
        }
        else if ('tag' in htmlObj) {
            return handleTagObject(htmlObj, i);
        }
    });
}
// TODO Что делает эта функция?
function handleTextObject(htmlObj) {
    return htmlObj.text;
}
/**
 * The function parses objects to JSX
 * @param {Object} htmlObj — object with html-structure
 * @param {Number} key — key property
 */
function handleTagObject(htmlObj, key) {
    let tagName = htmlObj.tag;
    // Подготовлю атрибуты
    let attribs = fixAttribs(htmlObj, tagName, key);
    // Подготовлю детей
    let children = (htmlObj.children)
        ? createJsxFromComponents(htmlObj.children)
        : null;
    // Верну созданный компонент Реакта
    return React.createElement(tagName, attribs, children);
}
/**
 * Функция подготовливает атрибуты текущего элемента
 * @param {Object} htmlObj — object with html-structure
 * @param {String} tagName — имя тега
 * @param {Number} key — key
 * @returns {*}
 */
function fixAttribs(htmlObj, tagName, key) {
    const objAttribs = htmlObj.attrs;
    // Если атрибутов нет, то вернуть объект с атрибутом key.
    if (!objAttribs)
        return { key: key };
    // Переберу объект, и заменю названия свойств.
    for (let propName in objAttribs) {
        // Все классы нужно писать как className.
        if (propName === 'class') {
            let classValue = objAttribs.class;
            delete objAttribs.class;
            objAttribs.className = classValue;
        }
        if (propName === 'style') {
            // В переменной будет так: box-shadow: 0 30px 55px rgba(0, 0, 0, .2); transform: translateY(5px);
            let styleStr = objAttribs[propName].trim();
            /*[
                "box-shadow: 0 30px 55px rgba(0, 0, 0, .2)",
                "transform: translateY(5px);"
            ]*/
            let styleArr = styleStr.split('; ');
            // Удалю последнюю точку с запятой
            if (styleArr[styleArr.length - 1].endsWith(';')) {
                styleArr[styleArr.length - 1] = styleArr[styleArr.length - 1].slice(0, -1);
            }
            const newStyleArr = styleArr.map((propStyleStr) => {
                let arr = propStyleStr.split(': ');
                return {
                    [convertToCamelCase(arr[0])]: arr[1]
                };
            });
            let styleObj = {};
            for (let styleArrItem of newStyleArr) {
                Object.assign(styleObj, styleArrItem);
            }
            //@ts-ignore
            objAttribs.style = styleObj;
        }
        // Если tagName равен text-component, то он содержит текст
        // Поэтому поставить ему атрибут редактирования
        if (tagName === 'text-component') {
            objAttribs.suppressContentEditableWarning = '';
            objAttribs.contentEditable = '';
        }
    }
    //@ts-ignore
    objAttribs.key = key;
    return objAttribs;
}
//# sourceMappingURL=componentsToJSX.js.map
//# sourceMappingURL=componentsToJSX.js.map