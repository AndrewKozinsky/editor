import { HTMLObjArrType } from '../htmlStringToObject'

export default function removeTextNodes(htmlObj: HTMLObjArrType.Tag) {
    if (!htmlObj.children) return

    for (let i = 0; i < htmlObj.children.length; i++) {
        const child = htmlObj.children[i]

        if ('text' in child) {
            htmlObj.children.splice(i, 1)
            i--
            continue
        }

        if ('tag' in child) {
            // Если перебираемый тег не является элементом у которого есть текстовый потомок,
            // то такой текст удалять не нужно, потому что он не будет преобразован в текстовый компонент.
            if (!child.attrs || child.attrs && !child.attrs['data-em-id']) {
                if (child.children && 'text' in child.children[0]) {
                    continue
                }
            }

            removeTextNodes(child)
        }
    }
}
