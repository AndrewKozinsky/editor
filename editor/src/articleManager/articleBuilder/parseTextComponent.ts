import ArticleTypes from 'store/article/codeType/articleCodeType'
import { HTMLObjArrType } from './htmlStringToObject'
import articleMsg from 'messages/articleMessages'

/**
 * Функция получает данные компонента и сливает с шаблоном компонента. В результате получается HTML-объект.
 * В других функциях он будет преобразован в JSX.
 * @param {Object} compData — данные компонента
 */
export default function parseTextComponent(compData: ArticleTypes.SimpleTextComponent): HTMLObjArrType.Tag {
    let editableTextTag = {
        tag: 'text-component',
        attrs: {
            'data-em-d-gen-comp-id': compData.dCompId.toString(),
            contentEditable: '',
            suppressContentEditableWarning: '',
            placeholder: articleMsg.emptyTextPlaceholder
        },
        children: [
            getText(compData.text)
        ]
    }

    if (compData.dCompLayer?.layerHidden) {
        // @ts-ignore
        editableTextTag.attrs['data-em-display'] = 'hidden'
    }

    return editableTextTag
}


/**
 * Функция возвращает объект, который должен быть вставлен на место текста:
 * если передан текст, то будет возвращён этот текст, если текста нет, то пустая строка
 * @param {String} text — текст в текстовом компоненте
 */
function getText(text: string) {
    // Ребёнок вставляемый в тег, оборачивающий текст
    return text ? { text } : {text: ''}
}
