import { HTMLObjArrType } from '../htmlStringToObject'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import { createDeepCopy } from 'utils/miscUtils'

/**
 * Ставит в разметку дополнительные элементы на основе данных компонента
 * @param {Array} htmlObjArr — массив html-объектов
 * @param {Array} dataElems — массив с данными элементов
 * @param {Number} dCompId — id данных компонента
 */
export default function putRepeatedElems(
    htmlObjArr: HTMLObjArrType.Arr, dataElems: ArticleTypes.ComponentElems, dCompId: ArticleTypes.Id
) {
    // Пройти элементы из массива html-объектов
    for(let i = 0; i < htmlObjArr.length; i++) {
        const htmlObj = htmlObjArr[i]
        if ('text' in htmlObj) continue

        // Если перебираемый элемент имеет data-em-id, то это элемент.
        // Если в данных есть копии элемента, то поставить их
        // Дополнительно каждому элементу поставить id компонента и элемента

        if (htmlObj.attrs && htmlObj.attrs['data-em-id']) {
            // Шаблон элемента
            const tElemId = htmlObj.attrs['data-em-id']
            // Получить данные элементов для этого шаблона элемента
            const dElems = dataElems.filter(dElem => dElem.tCompElemId === tElemId)

            // Составление массива элементов с таким же шаблоном элемента
            const newHtmlElems: HTMLObjArrType.Arr = []

            // Перебор данных элементов с таким же шаблоном элемента
            for (let j = 0; j < dElems.length; j++) {
                // Скопировать html-элемент
                const htmlElemCopy = createDeepCopy(htmlObj)

                // Поставить id компонента и элемента
                htmlElemCopy.attrs['data-em-d-comp-id'] = dCompId.toString()
                htmlElemCopy.attrs['data-em-d-elem-id'] = dElems[j].dCompElemId.toString()

                // Поставить свойство data-em-display если элемент должен быть скрыт
                if (dElems[j].dCompElemLayer?.layerHidden) {
                    htmlElemCopy.attrs['data-em-display'] = 'hidden'
                }

                // Рекурсивно пройтись по детям
                if (htmlElemCopy.children) {
                    putRepeatedElems( htmlElemCopy.children, dElems[j].dCompElemInnerElems, dCompId )
                }

                newHtmlElems.push(htmlElemCopy)
            }

            // Замена перебираемого элемента на копии элементов
            htmlObjArr.splice(i, 1, ...newHtmlElems)

            i += newHtmlElems.length - 1
        }
        else {
            if (htmlObj.children) {
                putRepeatedElems( htmlObj.children, dataElems, dCompId )
            }
        }
    }
}
