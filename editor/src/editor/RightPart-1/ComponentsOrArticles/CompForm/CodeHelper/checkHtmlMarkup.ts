/**
 * Функция проверяет соответствие переданной строки коду HTML.
 * @param {String} htmlStr — строка с предполагаемым кодом HTML.
 */
export function isMarkupCorrect(htmlStr: string) {
    try {
        // Превратить строку в HTML
        const parser = new DOMParser()
        const doc = parser.parseFromString(htmlStr, 'text/html')
        // Получить псевдомассив элементов
        const elemsArr = doc.body.childNodes

        // Если в elemsArr есть 1 элемент, то разметка правильная потому что должен быть 1 корневой элемент.
        if (elemsArr.length > 1) {
            return ['В разметке есть более одного корневого элемента.']
        }
        // debugger

        const elemsCheckErrors = checkElems(elemsArr)
        if (elemsCheckErrors.length) {
            return elemsCheckErrors
        }

        return []
    }
    catch (err) {
        return ['Разметка или не соответствует HTML.']
    }
}

// TODO Что делает эта функция?
function checkElems($elems: NodeListOf<Node>): string[] {
    const errors: string[] = []

    for (let $elem of $elems) {
        // @ts-ignore
        if ($elem.dataset.emId && !$elem.dataset.emGroup) {
            // @ts-ignore
            errors.push('В элементе ' + $elem.dataset.emId + ' должен быть указан атрибут data-em-group')
        }
        // @ts-ignore
        if ($elem.childNodes?.length) {
            // @ts-ignore
            const checkElemsResult = checkElems($elem.childNodes)
            errors.push(...checkElemsResult)
        }
    }

    return errors
}
