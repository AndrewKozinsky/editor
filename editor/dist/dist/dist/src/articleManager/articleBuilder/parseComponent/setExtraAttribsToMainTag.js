/**
 * Функция ставит дополнительные атрибуты главной обёртке компонента в htmlObj
 * @param {Object} htmlObj — html-объект в который требуется добавить копии элементов
 * @param {Object} dataComp — объект с информацией о конфигурации элемента в статье
 */
export function setExtraAttribsToMainTag(htmlObj, dataComp) {
    if (!htmlObj.attrs)
        htmlObj.attrs = {};
    // id компонента
    htmlObj.attrs['data-em-d-gen-comp-id'] = dataComp.dCompId.toString();
    // Если главной обёртка является элементом
    if (htmlObj.attrs['data-em-id']) {
        // То поставить id данных компонента
        htmlObj.attrs['data-em-d-comp-id'] = dataComp.dCompId.toString();
        // И id данных элемента
        const dElemId = getDataElemId(dataComp.dElems, htmlObj.attrs['data-em-id']);
        htmlObj.attrs['data-em-d-elem-id'] = dElemId.toString();
    }
}
/**
 * Функция возвращает id данных элемента по id шаблона элемента
 * @param {Array} dElems — массив данных элементов
 * @param {String} tElemId — id шаблона элемента
 */
function getDataElemId(dElems, tElemId) {
    const elemData = dElems.find(dElem => dElem.tCompElemId === tElemId);
    return elemData ? elemData.dCompElemId : 0;
}
//# sourceMappingURL=setExtraAttribsToMainTag.js.map
//# sourceMappingURL=setExtraAttribsToMainTag.js.map
//# sourceMappingURL=setExtraAttribsToMainTag.js.map