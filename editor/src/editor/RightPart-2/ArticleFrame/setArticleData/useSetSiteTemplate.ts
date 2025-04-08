import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import articleActions from 'store/article/articleActions'
import useGetArticleSelectors from 'store/article/articleSelectors'

/**
 * Хук контролирует загрузку и очистку сценариев и стилей добавляемых в <head> и <body>
 * После загрузки данных статьи в Хранилище появляется свойство siteTemplateId.
 * После того как получен его id можно загружать шаблон сайта
 */
export function useSetSiteTemplate() {
    const dispatch = useDispatch()
    const { siteTemplateId, siteTemplateVersionHash } = useGetArticleSelectors()

    // При изменении siteTemplateId запустить экшен увеличивающий siteTemplateVersionHash
    // Это запустит скачивание новой версии шаблона сайта
    useEffect(function () {
        if (!siteTemplateId) return
        dispatch( articleActions.changeSiteTemplateVersionHash() )
    }, [siteTemplateId])

    // При изменении siteTemplateVersionHash скачать новую версию шаблона сайта
    // После скачивания изменится значение siteTemplateDownloadHash
    useEffect(function () {
        if (!siteTemplateVersionHash) return

        dispatch( articleActions.requestSiteTemplate(siteTemplateId) )
    }, [siteTemplateVersionHash])
}


// Как только изменится значение siteTemplateDownloadHash, то можно
// ставить/убирать сценарии и стили в IFrame в <head> и <body>
export function useSetUserScriptsAndStylesToIFrame() {
    const { siteTemplateDownloadHash, siteTemplate, $links } = useGetArticleSelectors()

    const [$headNodesArr, set$headNodesArr] = useState<Element[]>([])
    const [$bodyNodesArr, set$bodyNodesArr] = useState<Element[]>([])

    // ПОСМОТРИ ПОЧЕМУ ОН НЕ СТАВИТ СТИЛИ В FIREFOX-е !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    useEffect(function () {
        if (siteTemplateDownloadHash) {
            // Удалить все сценарии и стили добавленные до этого
            removeNodesFromIframe($headNodesArr)
            removeNodesFromIframe($bodyNodesArr)

            // Set code in <head>
            if (siteTemplate.head) {
                const nodes = createNodesFromString(siteTemplate.head)

                // Поставить массив узлов в Состоянии чтобы удалить при необходимости
                set$headNodesArr(nodes)
                // Поставить стили и сценарии в Документ
                setNodesToIframe($links.$head, nodes)
            }

            // Set code before end the <body>
            if (siteTemplate.endBody) {
                const nodes = createNodesFromString(siteTemplate.endBody)
                set$bodyNodesArr(nodes)
                setNodesToIframe($links.$body, nodes)
            }
        }
        // Если значение 0, то удалить сценарии и стили потому что очистили редактор
        else {
            removeNodesFromIframe($headNodesArr)
            removeNodesFromIframe($bodyNodesArr)
        }
    }, [siteTemplateDownloadHash, $links])
}

/**
 * Функция удаляет все сценарии и стили из <head> или <body>
 * @param {Element[]} $nodesArr — массив ссылок на элементы, которые нужно удалить
 */
function removeNodesFromIframe($nodesArr: Element[]) {
    for(let $node of $nodesArr) {
        $node.remove()
    }
}

/**
 * The function set <script> or <style> elements into <head> or <body>
 * По какой-то причине приходится делать задержку перед установкой стилей и сценариев в <head> и <body>
 * чтобы это вообще работало в ФФ и отрабатывала в указанной последовательности в Хроме.
 * @param {Document} $rootElem — document
 * @param {NodeListOf} nodes — nodes list
 */
function setNodesToIframe($rootElem: HTMLHeadElement | HTMLBodyElement, nodes: Node[]) {
    for (let node of nodes) {
        $rootElem.appendChild(node)
    }
}

/**
 * The function gets string with HTML and turns it into html-elements
 * @param {String} htmlStr — string with html
 */
function createNodesFromString(htmlStr: string): Element[] {
    const div = document.createElement('div')
    div.innerHTML = htmlStr

    let nodes: Element[] = []

    for (let node of div.children) {
        const createdNode = createNode(node)
        nodes.push(createdNode)
    }

    return nodes
}

/**
 * The function gets <script> or <style> element and recreates it in the new element because I can't set node
 * into <head> or <body> without this procedure. It doesn't work. So I must recreate nodes.
 * @param {Element} node — node
 */
function createNode(node: Element) {
    const newNode = document.createElement(node.tagName.toLowerCase())

    // Если это сценарий, то при добавлении динамически в документ,
    // они будут запущены как только файл будет загружен.
    // То есть не будет соблюдаться порядок указанный в шаблоне.
    // Но если поставить свойство async в false, то порядок будет сохраняться и сценарии будут запускаться по порядку.
    if (newNode.tagName === 'SCRIPT') {
        // @ts-ignore
        newNode.async = false
    }

    // Поставить все атрибуты из присланного элемента
    for (let attr of node.attributes) {
        //@ts-ignore
        newNode[attr.name] = attr.value || true
    }

    return newNode
}
