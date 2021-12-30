import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import articleActions from 'store/article/articleActions';
import useGetArticleSelectors from 'store/article/articleSelectors';
/**
 * Хук контролирует загрузку и очистку сценариев и стилей добавляемых в <head> и <body>
 * После загрузки данных статьи в Хранилище появляется свойство siteTemplateId.
 * После того как получен его id можно загружать шаблон сайта
 */
export function useSetSiteTemplate() {
    const dispatch = useDispatch();
    const { siteTemplateId, siteTemplateVersionHash } = useGetArticleSelectors();
    // При изменении siteTemplateId запустить экшен увеличивающий siteTemplateVersionHash
    // Это запустит скачивание новой версии шаблона сайта
    useEffect(function () {
        if (!siteTemplateId)
            return;
        dispatch(articleActions.changeSiteTemplateVersionHash());
    }, [siteTemplateId]);
    // При изменении siteTemplateVersionHash скачать новую версию шаблона сайта
    // После скачивания изменится значение siteTemplateDownloadHash
    useEffect(function () {
        if (!siteTemplateVersionHash)
            return;
        dispatch(articleActions.requestSiteTemplate(siteTemplateId));
    }, [siteTemplateVersionHash]);
}
// Как только изменится значение siteTemplateDownloadHash, то можно
// ставить/убирать сценарии и стили в IFrame в <head> и <body>
export function useSetUserScriptsAndStylesToIFrame() {
    const { siteTemplateDownloadHash, siteTemplate, $links } = useGetArticleSelectors();
    const [$headNodesArr, set$headNodesArr] = useState([]);
    const [$bodyNodesArr, set$bodyNodesArr] = useState([]);
    useEffect(function () {
        if (siteTemplateDownloadHash) {
            // Удалить все сценарии и стили добавленные до этого
            removeNodesFromIframe($headNodesArr);
            removeNodesFromIframe($bodyNodesArr);
            // Set code in <head>
            if (siteTemplate.head) {
                const nodes = createNodesFromString(siteTemplate.head);
                set$headNodesArr(nodes);
                setNodesToIframe($links.$head, nodes);
            }
            // Set code before end the <body>
            if (siteTemplate.endBody) {
                const nodes = createNodesFromString(siteTemplate.endBody);
                set$bodyNodesArr(nodes);
                setNodesToIframe($links.$body, nodes);
            }
        }
        // Если значение 0, то удалить сценарии и стили потому что очистили редактор
        else {
            removeNodesFromIframe($headNodesArr);
            removeNodesFromIframe($bodyNodesArr);
        }
    }, [siteTemplateDownloadHash, $links]);
}
/**
 * Функция удаляет все сценарии и стили из <head> или <body>
 * @param {Element[]} $nodesArr — массив ссылок на элементы, которые нужно удалить
 */
function removeNodesFromIframe($nodesArr) {
    for (let $node of $nodesArr) {
        $node.remove();
    }
}
/**
 * The function set <script> or <style> elements into <head> or <body>
 * @param {Document} $rootElem — document
 * @param {NodeListOf} nodes — nodes list
 */
function setNodesToIframe($rootElem, nodes) {
    for (let node of nodes) {
        $rootElem.appendChild(node);
    }
}
/**
 * The function gets string with HTML and turns it into html-elements
 * @param {String} htmlStr — string with html
 */
function createNodesFromString(htmlStr) {
    const div = document.createElement('div');
    div.innerHTML = htmlStr;
    let nodes = [];
    for (let node of div.children) {
        const createdNode = createNode(node);
        nodes.push(createdNode);
    }
    return nodes;
}
/**
 * The function gets <script> or <style> element and recreates it in the new element because I can't set node
 * into <head> or <body> without this procedure. It doesn't work. So I must recreate nodes.
 * @param {Element} node — node
 */
function createNode(node) {
    const newNode = document.createElement(node.tagName.toLowerCase());
    for (let attr of node.attributes) {
        //@ts-ignore
        newNode[attr.name] = attr.value || true;
    }
    return newNode;
}
//# sourceMappingURL=useSetSiteTemplate.js.map
//# sourceMappingURL=useSetSiteTemplate.js.map