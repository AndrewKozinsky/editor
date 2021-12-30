/**
 * Функция проверяет, что элементы, указанные в codeObj.html соответствуют элементам в codeObj.elems
 * @param {Object} codeObj — шаблон компонента
 */
export function checkMatchingMarkupWithElems(codeObj) {
    // Создать HTML-элемент компонента и поместить в $rootElem
    const parser = new DOMParser();
    const doc = parser.parseFromString(codeObj.html, 'text/html');
    const $rootElem = doc.body.childNodes[0];
    const errorsArr = [];
    // @ts-ignore
    // Значение атрибута data-em-id у корневого тега
    const rootDataEmId = $rootElem.dataset.emId;
    // Массив значений атрибутов data-em-id у всех элементов где он есть.
    const allDataEmId = getAllElemsData($rootElem, 'data-em-id', 'emId');
    // Массив значений атрибутов data-em-group у всех элементов где он есть.
    const allDataEmGroup = getAllElemsData($rootElem, 'data-em-group', 'emGroup');
    // 1. Значение корневого data-em-id не может использоваться во вложенных элементах,
    // поэтому проверю, что элемент с data-em-id как в корневом элементе есть только в нём.
    const rootDataEmIdCount = (allDataEmId.filter(str => str === rootDataEmId)).length;
    if (rootDataEmIdCount > 1) {
        errorsArr.push('Значение корневого data-em-id не может использоваться во вложенных элементах.');
    }
    // 2. Значение data-em-group должно быть неповторяющимся для всех элементов, где он присутствует.
    if (!isArrayHasEqualValues(allDataEmGroup)) {
        errorsArr.push('Значение data-em-group не должно повторяться в элементах.');
    }
    // 3. В данных (codeObj.elems) должны быть описаны все elems отмеченные в атрибуте data-em-id в разметке.
    // Так же не должно быть лишних элементов.
    if (!checkElemsMatching(allDataEmId, codeObj.elems)) {
        errorsArr.push('Значение data-em-group в элементах должно соответствовать свойствам elemId в данных.');
    }
    return errorsArr;
}
/**
 * Функция получает HTML-элемент и название data-атрибута и возвращает все значения data-атрибута встречающиеся во всех элементах.
 * @param {Element} $rootElem — HTML-элемент
 * @param {String} dataNameLong — имя data-атрибута. Например: 'data-em-id'
 * @param {String} dataName — сокращённое имя data-атрибута для получения из свойства dataset. Например: 'emId'
 */
function getAllElemsData($rootElem, dataNameLong, dataName) {
    // Обернуть HTML-элемент чтобы была возможность искать по всем элементам.
    const wrappedRoot = document.createElement('div');
    wrappedRoot.append($rootElem);
    // Получить все элементы где встречается искомый data-атрибут.
    const elems = wrappedRoot.querySelectorAll('[' + dataNameLong + ']');
    // Массив значений переданного атрибута
    const attribValues = [];
    for (let elem of elems) {
        // @ts-ignore
        attribValues.push(elem.dataset[dataName]);
    }
    return attribValues;
}
/**
 * Функция проверяет, что в массиве arr нет повторяющихся значений.
 * @param {Number} arr — массив строк
 */
export function isArrayHasEqualValues(arr) {
    const result = {};
    arr.forEach((arrItem) => {
        result[arrItem] = 1;
    });
    return arr.length === Object.keys(result).length;
}
/**
 * Функция проверяет соответствие элементов в разметке и в данных.
 * @param {Array} allDataEmId — массив со значениями data-em-id из элементов разметки. Например: ['banner', 'cell']
 * @param {Array} elemObjArr — массив с данными элементов. Например: [{elemId: "banner"}, {elemId: "cell"}, ]
 */
function checkElemsMatching(allDataEmId, elemObjArr) {
    // Составить массив вида ['banner', 'cell']
    const elemsArr = elemObjArr.map(elemObj => elemObj.elemId);
    // Проверить чтобы элементы из массива elemsArr соответствовали массиву allDataEmId
    for (let emId of allDataEmId) {
        if (elemsArr.indexOf(emId) === -1) {
            return false;
        }
    }
    for (let elemId of elemsArr) {
        if (allDataEmId.indexOf(elemId) === -1) {
            return false;
        }
    }
    // Проверить чтобы было соответствие по количеству.
    return true;
}
//# sourceMappingURL=checkMatchingMarkupWithElems.js.map