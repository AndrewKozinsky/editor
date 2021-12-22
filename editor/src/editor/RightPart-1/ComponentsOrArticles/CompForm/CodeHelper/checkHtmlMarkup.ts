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
        if (elemsArr.length === 1) {
            return []
        }
    }
    catch (err) {
        // console.log(err)
        return ['Разметка или не соответствует HTML или есть более одного корневого элемента.']
    }
}
