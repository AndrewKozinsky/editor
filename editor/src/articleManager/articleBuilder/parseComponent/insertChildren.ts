import { ConsistObj } from './getConsistObjArr'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import { parseComponent } from './parseComponent'
import { HTMLObjArrType } from './htmlStringToObject'
import articleMsg from 'messages/articleMessages'


/**
 * Функция вставляет дочерние компоненты в элемент
 * @param {Object} consistObj — an object with link to dataComp, dataElem, tempElem and htmlElem
 * @param tempComps
 */
export function insertChildren(consistObj: ConsistObj, tempComps: TempCompTypes.TempComps) {
    const elemChildren = consistObj.dElem.dCompElemChildren

    // Если это массив компонентов
    if (Array.isArray(elemChildren)) {
        if (!elemChildren.length) return

        const parsedChildren: HTMLObjArrType.Arr = []
        for (let child of elemChildren) {
            parsedChildren.push(parseComponent(child, tempComps))
        }

        consistObj.htmlElem.children = parsedChildren
    }
    // Если это простой текстовый компонент...
    else if (elemChildren && elemChildren.dCompType === 'simpleTextComponent') {
        // Создать тег, оборачивающий текст. Он требуется, чтобы понимать, над каким компонентом располагается курсор.
        let editableTextTag = {
            tag: 'text-component',
            attrs: {
                'data-em-d-gen-comp-id': elemChildren.dCompId.toString(),
                contentEditable: '',
                suppressContentEditableWarning: '',
                placeholder: articleMsg.emptyTextPlaceholder
            },
            children: [
                getText(elemChildren.text)
            ]
        }

        if (elemChildren.dCompLayer?.layerHidden) {
            // @ts-ignore
            editableTextTag.attrs['data-em-display'] = 'hidden'
        }

        // Поставить в список детей
        consistObj.htmlElem.children = [editableTextTag]
    }
}

/**
 * Функция возвращает объект, который должен быть вставлен на место текста:
 * если передан текст, то будет возращён этот текст, если текста нет, то будет возвращён значок пустого текста
 * @param {String} text — текст в текстовом компоненте
 */
function getText(text: string) {
    // Ребёнок вставляемый в тег, оборачивающий текст
    return text ? { text } : {text: ''}
}
