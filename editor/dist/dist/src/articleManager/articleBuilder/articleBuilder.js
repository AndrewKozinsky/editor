import createJsxFromComponents from './componentsToJSX';
import createHTMLFromComponents from './createHTMLFromComponents';
import { parseComponent } from './parseComponent/parseComponent';
/**
 * Функция превращает данные статьи и шаблоны компонентов в JSX для отрисовки в IFrame-е.
 * @param {Object} articleData — данные статьи.
 * @param tempComps — масссив шаблонов компонентов.
 */
export function turnArticleDataToJSX(articleData, tempComps) {
    const componentsArr = createComponentsArr(articleData, tempComps);
    // Create JSX from components array
    return createJsxFromComponents(componentsArr);
    // Пример кода возвращаемый функцией
    // return [React.createElement( 'p', {}, ['Hello, world!'] )]
}
/**
 * Функция превращает данные статьи и шаблоны компонентов в HTML. Нужно чтобы получить итоговую разметку для вставки на сайт.
 * @param {Object} articleData — данные статьи.
 * @param tempComps — массив шаблонов компонентов.
 */
export function turnArticleDataToHTML(articleData, tempComps) {
    const componentsArr = createComponentsArr(articleData, tempComps);
    // Create HTML from components array
    return createHTMLFromComponents(componentsArr);
}
// TODO Что делает эта функция?
function createComponentsArr(articleData, tempComps) {
    // Переберу массив компонентов
    let componentsArr = articleData.dComps.map(compObj => parseComponent(compObj, tempComps));
    return componentsArr;
}
//# sourceMappingURL=articleBuilder.js.map
//# sourceMappingURL=articleBuilder.js.map