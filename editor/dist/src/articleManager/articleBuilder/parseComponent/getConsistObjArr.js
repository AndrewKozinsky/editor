/**
 * The function form an array of objects consists of objects with a correspondence between component template, data and html-object
 * @param {Object} template — component template
 * @param {Object} compData — component data
 * @param {Object} htmlObj — component html-object
 */
export function getConsistObjArr(template, compData, htmlObj) {
    if (!compData.dElems)
        return null;
    // Перебрать все элементы в данных
    return compData.dElems.map((dElem) => {
        return {
            dataComp: compData,
            dElem: dElem,
            tempElem: getTemplateElemByTempElemId(template, dElem.tCompElemId),
            htmlComp: htmlObj,
            htmlElem: getHtmlElem(htmlObj, dElem.dCompElemId, dElem.dCompElemGroup, dElem.tCompElemId)
        };
    });
}
/**
 * The function finds and returns element template based on an element template id
 * @param {Object} template — component template
 * @param {String} tCompElemId — an element template id
 */
function getTemplateElemByTempElemId(template, tCompElemId) {
    var _a;
    return (_a = template.content) === null || _a === void 0 ? void 0 : _a.elems.find(tempElem => tempElem.elemId === tCompElemId);
}
/**
 * The function finds and returns html-element object with passed dCompElemGroup name and tCompElemId
 * @param {Object} htmlObj — component html-object
 * @param {Number} dCompElemId — an element id
 * @param {String} dCompElemGroup — the name of the group to which the element belongs
 * @param {String} tCompElemId — element template name
 */
function getHtmlElem(htmlObj, dCompElemId, dCompElemGroup, tCompElemId) {
    let htmlElem = null;
    find(htmlObj);
    function find(htmlObj) {
        var _a;
        if ('text' in htmlObj)
            return;
        // If there is attr with a passed tCompElemId and a group name...
        if (htmlObj.attrs['data-em-id'] === tCompElemId
            && htmlObj.attrs['data-em-group'] === dCompElemGroup
            && htmlObj.attrs['data-em-d-elem-id'] === dCompElemId.toString()) {
            // The searches have finished
            htmlElem = htmlObj;
            return;
        }
        if (!((_a = htmlObj.children) === null || _a === void 0 ? void 0 : _a.length))
            return;
        // Go through the children and find html-element there...
        for (let i = 0; i < htmlObj.children.length; i++) {
            let childObj = htmlObj.children[i];
            if ('text' in childObj)
                continue;
            // If there is attr with a passed tCompElemId and a group name...
            if (childObj.attrs['data-em-id'] === tCompElemId
                && childObj.attrs['data-em-group'] === dCompElemGroup
                && childObj.attrs['data-em-d-elem-id'] === dCompElemId.toString()) {
                // The searches have finished
                htmlElem = childObj;
                return;
            }
            else {
                if (childObj.children) {
                    find(childObj);
                }
            }
        }
    }
    return htmlElem;
}
//# sourceMappingURL=getConsistObjArr.js.map