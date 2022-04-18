import TempCompTypes from 'store/article/codeType/tempCompCodeType'

/**
 * Функция проверяет соответствие переданной строки коду HTML.
 * Возвращается массив с текстами найденных ошибок.
 * @param {Object} templateObj — шаблон компонента
 */
export function isMarkupCorrect(templateObj: TempCompTypes.Content) {
    const errorsArr: string[] = []

    try {
        // Превратить строку в HTML
        const parser = new DOMParser()
        const doc = parser.parseFromString(templateObj.html, 'text/html')
        // Получить коллекцию элементов
        const elemsCollection = doc.body.children

        // В elemsCollection должен быть 1 корневой элемент.
        if (elemsCollection.length > 1) {
            errorsArr.push('В разметке есть более одного корневого элемента.')
            return errorsArr
        }

        // Проверка, что в корневом теге есть атрибут data-em-id
        errorsArr.push(...hasRootElemEmId(elemsCollection[0] as HTMLElement))

        // Проверка уникальности значений элементов с атрибутами data-em-id
        errorsArr.push(...checkUniqueElemsByDataEmId(elemsCollection))
        if (errorsArr.length) return errorsArr

        // Проверка того, что если в разметке есть элементы, то в массиве elems они должны быть описаны
        errorsArr.push(...matchHtmlElemsAndDataElems(doc.body, templateObj))
    }
    catch (err) {
        errorsArr.push('Разметка не соответствует HTML.')
    }

    return errorsArr
}

function hasRootElemEmId($elems: HTMLElement): string[] {
    const dataEmIdInRootElem = $elems.dataset.emId

    return dataEmIdInRootElem
    ? [] : ['В корневом элементе должно быть свойство data-em-id.']
}

/**
 * Функция проверяет чтобы элементы с data-em-id имеют уникальное значение.
 * Возвращается массив с текстами найденных ошибок.
 * @param {Array} $elems — коллекция HTML-элементов
 * @param {Array} emIdArr — массив с id элементов встречающихся в разметке
 */
function checkUniqueElemsByDataEmId($elems: HTMLCollection, emIdArr: string[] = []): string[] {
    const errors: string[] = []

    for (let i = 0; i < $elems.length; i++) {
        const $elem = $elems[i]
        if (!($elem instanceof HTMLElement)) continue

        const emIdIn$elem = $elem.dataset.emId

        if (emIdIn$elem) {
            if (emIdArr.find(emIdInArr => emIdInArr === emIdIn$elem)) {
                errors.push('Значение ' + emIdIn$elem + ' не может повторяться в элементах с data-em-id.')
            }
            emIdArr.push(emIdIn$elem)
        }

        if ($elem.children.length) {
            errors.push(...checkUniqueElemsByDataEmId($elem.children, emIdArr))
        }
    }

    return errors
}

/**
 * Функция проверяет чтобы у html-элементах были соответствия с данными и наоборот
 * @param {HTMLBodyElement} $body — ссылка на <body> с разметкой шаблона
 * @param {Object} templateObj — шаблон компонента
 */
function matchHtmlElemsAndDataElems($body: HTMLElement, templateObj: TempCompTypes.Content): string[] {
    const errors: string[] = []

    // Элементы из разметки
    const $elems = $body.querySelectorAll('[data-em-id] ')

    // Если массив elems пуст, то это ошибка потому что там должно быть описание как минимум одного корневого элемента
    if (templateObj.elems?.length === 0) {
        return ['В массиве elems должно быть описание хотя бы корневого элемент.']
    }

    // Перебор html-элементов с целью найти на них данные
    for (let $elem of $elems) {
        if (!($elem instanceof HTMLElement)) continue

        // id элемента в разметке
        const htmlElemId = $elem.dataset.emId

        // id элемента в данных
        const tElem = templateObj.elems.find(tElem => tElem.elemId === htmlElemId)

        // Бросить ошибку если в данных не описан перебираемый элемент
        if (!tElem) {
            errors.push(`В разметке присутствует элемент с data-em-id ${htmlElemId}, но в массиве elems он не описан.`)
            continue
        }

        // Бросить ошибку если в шаблоне указано, что элемент принимает текстовый компонент, но там есть дочерние элементы
        if (tElem.addTextComponent && $elem.children?.length) {
            errors.push(`Элементу с идентификатором ${htmlElemId} нельзя ставить свойство addTextComponent так как в нём присутствуют другие элементы.`)
        }
    }

    // Перебор данных элементов с целью найти на них html-элементы
    for (let tElem of templateObj.elems) {
        // id элемента в данных
        const tElemId = tElem.elemId
        if (!tElemId) continue

        let isElemInHtmlFound = false

        for (let $elem of $elems) {
            if (!($elem instanceof HTMLElement || $elem instanceof SVGElement)) {
                continue
            }

            // id элемента в разметке
            const htmlElemId = $elem.dataset.emId
            if (tElemId === htmlElemId) isElemInHtmlFound = true
        }

        if (!isElemInHtmlFound) {
            errors.push(`В elems присутствует элемент с elemId ${tElemId}, но его нет в разметке.`)
        }
    }

    return errors
}
