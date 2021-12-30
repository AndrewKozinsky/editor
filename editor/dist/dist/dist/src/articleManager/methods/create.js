/**
 * Функция создаёт данные статьи. Если ничего не передать, то будут данные для новой статьи.
 * @param {Number} dMaxCompId — максимальный id компонента
 * @param {Array} dComps — массив компонентов статьи
 */
export function createArticle(dMaxCompId = 0, dComps = []) {
    return {
        dMeta: {
            version: 1,
            dMaxCompId
        },
        dComps
    };
}
/**
 * The function creates a new component data with passed tempCompId
 * @param {Object} article — article object
 * @param {Array} tempCompArr — components templates array
 * @param {String} tempCompId — component template id
 */
export function createComponent(article, tempCompArr, tempCompId) {
    const tempComp = this.getTemplate(tempCompArr, tempCompId);
    let maxCompId = article.dMeta.dMaxCompId;
    const compData = {
        dCompType: 'component',
        dCompId: ++maxCompId,
        tCompId: tempComp.id
    };
    const elementsFnResult = createCompElements(tempComp, maxCompId);
    if (elementsFnResult.compElems) {
        compData.dElems = elementsFnResult.compElems;
        maxCompId = elementsFnResult.maxCompId;
    }
    return {
        compData,
        maxCompId
    };
}
/**
 * The function creates elements in a new component
 * @param {Object} tempComp — a component template
 * @param {Number} maxCompId — a maximum component id in an article
 */
function createCompElements(tempComp, maxCompId) {
    var _a;
    let newMaxCompId = maxCompId;
    if (!((_a = tempComp.content.elems) === null || _a === void 0 ? void 0 : _a.length)) {
        return {
            compElems: null,
            maxCompId: newMaxCompId
        };
    }
    // Turn html-string to HTMLElement
    const parser = new DOMParser();
    const doc = parser.parseFromString(tempComp.content.html, 'text/html');
    const $component = doc.body.childNodes[0];
    const newElemsArr = tempComp.content.elems.map((tElem, i) => {
        const newElemData = {
            dCompElemId: i + 1,
            tCompElemId: tElem.elemId,
            dCompElemGroup: getElemGroupNameFromHTML($component, tElem.elemId)
        };
        const elemAttrs = createElemAttribs(tElem);
        if (elemAttrs)
            newElemData.dCompElemAttrs = elemAttrs;
        // Пока не знаю нужно ли это делать
        /*if (tElem.hidden) {
            newElemData.layer = {
                hidden: true
            }
        }*/
        if (tElem.elemTextInside) {
            ++newMaxCompId;
            newElemData.dCompElemChildren = createSimpleTextComponent(newMaxCompId);
        }
        else {
            newElemData.dCompElemChildren = [];
        }
        return newElemData;
    });
    return {
        compElems: newElemsArr,
        maxCompId: newMaxCompId
    };
}
/**
 * Функция получает html-компонент, находит элемент с переданным идентификатором и возвращает имя группы,
 * к которой принадлежит элемент
 * @param {HTMLElement} $component — html-компонент
 * @param {String} tElemId — id шаблона элемента
 */
function getElemGroupNameFromHTML($component, tElemId) {
    const $wrapper = document.createElement('div');
    $wrapper.append($component);
    let $elem = $wrapper.querySelector(`[data-em-id=${tElemId}]`);
    return $elem
        ? $elem.dataset.emGroup
        : null;
}
/**
 * Функция формирует массив атрибутов элемента с пустыми значениями.
 * Если какие-то значения атрибутов помечены отмеченными по умолчанию, то они ставятся в этот массив
 * чтобы при создании нужные значения уже были проставлены
 * @param {Object} tElem — a template element object
 */
function createElemAttribs(tElem) {
    var _a;
    if (!tElem.elemAttrs)
        return null;
    const dElemAttrs = [];
    // Перебор атрибутов элемента
    for (let attribTemp of tElem === null || tElem === void 0 ? void 0 : tElem.elemAttrs) {
        let dElemAttr;
        // В каком виде будет заноситься значение атрибута?
        // Если предполагается ввод через текстовое поле, то значение атрибута будет текстовым
        // В любых других случаях будет массив с идентификаторами готовых значений атрибута
        let dElemAttrValue = attribTemp.elemAttrView === 'text' ? '' : [];
        // Объект с данными id атрибута и его незаполненного значения.
        // Значения по умолчанию будут записываться ниже.
        dElemAttr = {
            dCompElemAttrId: attribTemp.elemAttrId,
            dCompElemAttrValue: dElemAttrValue
        };
        if (((_a = attribTemp.elemAttrValues) === null || _a === void 0 ? void 0 : _a.length) === 0)
            return;
        // Перебор значений в шаблоне элемента
        for (let i = 0; i < attribTemp.elemAttrValues.length; i++) {
            // Ничего не делать если перебираемое значение не отмечено как значение по умолчанию
            const tAttrValue = attribTemp.elemAttrValues[i];
            if (!tAttrValue.elemAttrValueChecked)
                continue;
            // Поставить значение по умолчанию в зависимости от формата хранения значений
            if (attribTemp.elemAttrView === 'text') {
                dElemAttr.dCompElemAttrValue = tAttrValue.elemAttrValueValue;
            }
            else if (Array.isArray(dElemAttr.dCompElemAttrValue)) {
                dElemAttr.dCompElemAttrValue.push(tAttrValue.elemAttrValueId);
            }
        }
        // Поставить в массив атрибутов элемента сформированный объект атрибута элемента
        dElemAttrs.push(dElemAttr);
    }
    return dElemAttrs;
}
/**
 * Функция создаёт объект пустого текстового компонента
 * @param {Number} maxCompId — максимальный id компонента существующий в статье
 */
export function createSimpleTextComponent(maxCompId) {
    return {
        dCompType: 'simpleTextComponent',
        dCompId: maxCompId + 1,
        text: ''
    };
}
//# sourceMappingURL=create.js.map
//# sourceMappingURL=create.js.map
//# sourceMappingURL=create.js.map