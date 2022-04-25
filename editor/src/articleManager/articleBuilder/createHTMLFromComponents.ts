import { HTMLObjArrType } from './htmlStringToObject'
import {isUnpairedTag} from 'utils/domUtils'

/**
 * The function gets html structure objects array and turns it to HTML-string
 * @param {Array} htmlStructure — html structure objects array
 */
export default function createHTMLFromComponents(htmlStructure: HTMLObjArrType.Arr): string {
    return htmlStructure.reduce((summaryHtmlStr, htmlObj) => {
        if ('text' in htmlObj) {
            return summaryHtmlStr + htmlObj.text
        }
        else if ('tag' in htmlObj) {
            if (htmlObj.tag === 'text-component') {
                return summaryHtmlStr + formHtmlStrFromTextComponent(htmlObj)
            }
            else {
                // Если элемент скрыт, то не прибавлять его разметку к получаемой строке
                if (htmlObj.attrs && htmlObj.attrs['data-em-display'] && htmlObj.attrs['data-em-display'] === 'hidden') {
                    return summaryHtmlStr
                }

                return summaryHtmlStr + formHtmlStrFromTagObject(htmlObj)
            }
        }
    }, '')
}

/**
 * Функция возвращает текст текстового компонента
 * @param {Object} htmlObj — объект текстового компонента
 */
function formHtmlStrFromTextComponent(htmlObj: HTMLObjArrType.Tag): string {
    const child = htmlObj.children[0]

    return 'text' in child
        ? child.text
        : ''
}

/**
 * The function forms tag, its attributes and children
 * @param {Object} htmlObj — object with html-structure
 */
function formHtmlStrFromTagObject(htmlObj: HTMLObjArrType.Tag): string {

    const tagName = htmlObj.tag
    const attribs = htmlObj.attrs ? getAttribs(htmlObj.attrs) : ''
    const children = (htmlObj.children) ? createHTMLFromComponents(htmlObj.children) : ''

    return isUnpairedTag(tagName)
        ? `<${tagName} ${ attribs} />`
        : `<${tagName} ${ attribs}>${children}</${tagName}>`
}


/**
 * The function forms tag's attributes string
 * @param {Object} objAttribs — object with html attributes
 * @returns {*} string with html attributes
 */
function getAttribs(objAttribs: HTMLObjArrType.Attrs): string {
    let generalArr: string[] = []

    const unnecessaryProps = [
        'data-em-id', 'data-em-d-gen-comp-id', 'data-em-d-comp-id',
        'data-em-d-elem-id', 'data-em-d-text-comp-id'
    ]

    for(let propKey in objAttribs) {
        if (unnecessaryProps.includes(propKey)) continue

        generalArr.push( propKey + `="${objAttribs[propKey]}"` )
    }

    return generalArr.join(' ')
}
