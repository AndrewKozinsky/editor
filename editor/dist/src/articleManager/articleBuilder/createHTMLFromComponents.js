/**
 * The function gets html structure objects array and turns it to HTML-string
 * @param {Array} htmlStructure — html structure objects array
 */
export default function createHTMLFromComponents(htmlStructure) {
    return htmlStructure.reduce((summaryHtmlStr, htmlObj) => {
        if ('text' in htmlObj) {
            return summaryHtmlStr += htmlObj.text;
        }
        else if ('tag' in htmlObj) {
            if (htmlObj.tag === 'text-component') {
                return summaryHtmlStr += formHtmlStrFromTextComponent(htmlObj);
            }
            else {
                return summaryHtmlStr += formHtmlStrFromTagObject(htmlObj);
            }
        }
    }, '');
}
// TODO Что делает эта функция?
function formHtmlStrFromTextComponent(htmlObj) {
    const child = htmlObj.children[0];
    return 'text' in child
        ? child.text
        : '';
}
/**
 * The function forms tag, its attributes and children
 * @param {Object} htmlObj — object with html-structure
 */
function formHtmlStrFromTagObject(htmlObj) {
    const unpairedTags = ['img', 'hr', 'br', 'b', 'i', 'meta', 'input'];
    const tagName = htmlObj.tag;
    const attribs = htmlObj.attrs ? getAttribs(htmlObj.attrs) : '';
    const children = (htmlObj.children) ? createHTMLFromComponents(htmlObj.children) : '';
    return unpairedTags.includes(tagName)
        ? `<${tagName} ${attribs} />`
        : `<${tagName} ${attribs}>${children}</${tagName}>`;
}
/**
 * The function forms tag's attributes string
 * @param {Object} objAttribs — object with html attributes
 * @returns {*} string with html attributes
 */
function getAttribs(objAttribs) {
    let generalArr = [];
    const unnecessaryProps = [
        'data-em-id', 'data-em-group', 'data-em-d-gen-comp-id', 'data-em-d-comp-id',
        'data-em-d-elem-id', 'data-em-d-text-comp-id'
    ];
    for (let propKey in objAttribs) {
        if (unnecessaryProps.includes(propKey))
            continue;
        generalArr.push(propKey + `="${objAttribs[propKey]}"`);
    }
    return generalArr.join(' ');
}
//# sourceMappingURL=createHTMLFromComponents.js.map