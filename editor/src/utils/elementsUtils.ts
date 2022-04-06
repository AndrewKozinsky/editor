/**
 * The function check if passed element is match passed selector or has parent with passed selector
 * @param {HTMLElement} $targetElem — element with you need to check match to selecor
 * @param {String} selector — CSS selector
 */
export function hasElemParentWithSelector($targetElem: HTMLElement, selector: string) {
    let hasParent = false

    let currentParent = $targetElem
    for(;currentParent;) {
        if (currentParent.tagName.toLowerCase() === 'body') {
            break
        }

        if (currentParent.matches(selector)) {
            return true
        }
        currentParent = currentParent.parentElement
    }

    return hasParent
}

/**
 * КАНДИДАТ НА УДАЛЕНИЕ
 * Функция ищет в переданном элементе текстовый узел
 * @param {Element} $elem — элемент, в котором ищется текстовый узел.
 */
/*
export function getTextNodeWithText($elem: Element): null | ChildNode {
    if (!$elem.childNodes) return null

    for (let i = 0; i < $elem.childNodes.length; i++) {
        const $child = $elem.childNodes[i]

        if ($child.nodeType === 3) {
            return $child
        }
        else if ($child.nodeType === 1) {
            const result = getTextNodeWithText($child as Element)
            if (result) return result
        }
    }
}*/
