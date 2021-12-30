/**
 * Function gets string with html code and returns object with html structure
 * @param {String} htmlStr — string with html code
 */
export default function htmlStringToObject(htmlStr) {
    // Turn html-string to HTMLElement
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlStr, 'text/html');
    const elems = doc.body.childNodes;
    // Turn HTMLElement to html-object and return it
    return getObjects(elems);
}
/**
 * Function get HTMLElement and turns it to object with html structure
 * @param {NodeListOf} elems — HTMLElements
 */
function getObjects(elems) {
    if (!elems.length)
        return;
    // Returned array of objects
    const arr = [];
    for (let i = 0; i < elems.length; i++) {
        // If this is tag...
        if (elems[i].nodeType === 1) {
            let elem = elems[i];
            // Get html-object
            const obj = getTag(elem);
            arr.push(obj);
        }
        // If this is text node...
        else if (elems[i].nodeType === 1) {
            let elem = elems[0];
            // Get html-object
            const obj = getText(elem);
            arr.push(obj);
        }
    }
    return arr;
}
/**
 * Function creates object with data describes tag
 * @param {Element} elem — Element
 */
function getTag(elem) {
    const obj = {
        tag: elem.tagName.toLowerCase()
    };
    const attrs = getAttrs(elem);
    if (attrs)
        obj.attrs = attrs;
    const children = getChildren(elem);
    if (children)
        obj.children = children;
    return obj;
}
/**
 * Function returns object with tag attributes
 * @param {Element} elem — Element
 */
function getAttrs(elem) {
    if (!elem.attributes.length)
        return null;
    const obj = {};
    for (let i = 0;; i++) {
        const attr = elem.attributes[i];
        if (!attr)
            break;
        obj[attr.name] = attr.nodeValue;
    }
    return obj;
}
/**
 * Function returns children html-objects
 * @param {Element} elem — Element
 */
function getChildren(elem) {
    var _a;
    if (!((_a = elem.childNodes) === null || _a === void 0 ? void 0 : _a.length))
        return null;
    return getObjects(elem.childNodes);
}
/**
 * Function returns text object
 * @param {CharacterData} elem — text node
 */
function getText(elem) {
    let preparedString = elem.data;
    // Remove all multiple spaces
    preparedString = preparedString.replace(/\s\s+/g, ' ');
    return {
        text: preparedString
    };
}
/*const dataExample: HTMLObjArrType.Arr = [
    {
        tag: "div",
        attrs: { class: 'grid' },
        children: [
            {
                tag: 'div',
                attrs: {
                    class: 'grid__cell grid__cell--thin',
                    'data-em-group': 'cell-top',
                    'data-em-id': 'cell'
                },
                children: [
                    {text: 'Hello'},
                    {tag: 'p'},
                ]
            },
            {
                tag: 'div',
                attrs: {
                    class: 'grid__cell grid__cell--thick',
                    'data-em-group': 'cell-top',
                    'data-em-id': 'cell'
                },
            }
        ]
    }
]*/
//# sourceMappingURL=htmlStringToObject.js.map