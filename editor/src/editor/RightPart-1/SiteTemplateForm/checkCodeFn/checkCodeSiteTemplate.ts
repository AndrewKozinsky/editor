const JSON5 = require('json5')

/**
 * Код проверяющий правильность кода шаблона. Возвращает массив ошибок. Если ошибок нет, то массив будет пустым.
 * @param {String} code — код шаблона сайта введённый пользователем в поле ввода
 */
export default function checkCodeSiteTemplate(code: string) {

    const errorsArr: string[] = []

    try {
        const codeObj = JSON5.parse(code)

        if (Array.isArray(codeObj) || codeObj === null || !isNaN(codeObj)) {
            errorsArr.push('Шаблон должен быть объектом')
            return errorsArr
        }

        if (!codeObj.name) {
            errorsArr.push('Добавьте имя шаблона в свойство name.')
        }

        if (codeObj.head && !isMarkupCorrect(codeObj.head)) {
            errorsArr.push('В свойстве head должна быть строка с корректным HTML-кодом добавляемым в <head> статьи. Смотрите пример ниже.')
        }

        if (codeObj.endBody && !isMarkupCorrect(codeObj.endBody)) {
            errorsArr.push('В свойстве endBody должна быть строка с корректным HTML-кодом добавляемым перед закрывающем </body> в статье. Смотрите пример ниже.')
        }

        Object.keys(codeObj).forEach(propName => {
            if (['name', 'head', 'endBody'].indexOf(propName) < 0) {
                errorsArr.push(`В шаблоне свойство ${propName} лишнее`)
            }
        })

        return errorsArr
    }
    catch(err) {
        return [
            'Шаблон должен быть в формате JSON.'
        ]
    }
}

/** Функция проверяет правильность строки с разметкой */
function isMarkupCorrect(htmlStr?: string) {
    if (!htmlStr) return false

    try {
        const parser = new DOMParser()
        const doc = parser.parseFromString(htmlStr, 'text/html')
        const elemsArr = doc.body.childNodes

        // Если в elemsArr есть элементы, то значит пытаются добавить обычные теги
        // <script> и <style> к ним не относятся
        return !elemsArr.length
    }
    catch (err) {
        return false
    }
}

// Пример кода шаблона сайта
export const templateCodeExample = `{
    name: "Standard page",
    head: "<meta name='viewport' content='width=device-width, initial-scale=1'><link rel='stylesheet' href='https://mysite.com/css/styles.css'>",
    endBody: "</script><script src='https://mysite.com/js/script.js'></script>"
}`
