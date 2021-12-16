import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import { MiscTypes } from 'types/miscTypes'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleActions from 'store/article/articleActions'
import articleManager from 'editor/articleManager/articleManager'


// Поставить данные статьи в Хранилище при изменении id редактируемой статьи
export function useSetArticleDataInStore() {
    const dispatch = useDispatch()
    const { articleId, siteId, siteTemplateId } = useGetArticleSelectors()

    useEffect(function () {
        // Загрузить статью и поставить в Хранилище
        dispatch( articleActions.requestArticle(articleId) )
    }, [articleId])

    useEffect(function () {
        if (!siteId) return

        dispatch( articleActions.requestSiteComponents(siteId) )
        dispatch( articleActions.requestTempCompsFolders(siteId) )
    }, [siteId, siteTemplateId])

    useEffect(function () {
        if (!siteTemplateId) return

        dispatch( articleActions.requestSiteTemplate(siteTemplateId) )
    }, [siteTemplateId])
}

/**
 * Hook gets links to IFrame window, document, head and body to Store when IFrame rendered
 * @param {Object} iFrameRef — reg to iFrame
 */
export function useSetIFrameElemsLinks(iFrameRef: MiscTypes.ReactRef) {
    useEffect(function () {
        if (!iFrameRef.current) return

        let $iFrame = iFrameRef.current as HTMLIFrameElement
        const $window = $iFrame.contentWindow
        const $document = $window.document
        const $head = $document.head
        const $body = $document.body as HTMLBodyElement

        // Set links to Store
        store.dispatch(
            actions.article.setLinks( $window, $document, $head, $body )
        )
    }, [iFrameRef.current])
}

/** Hook sets <div> in IFrame to put an article in */
export function useSetRootDivToIFrame() {
    const { $links } = useGetArticleSelectors()
    const [wrapperInstalled, setWrapperInstalled] = useState(false)

    useEffect(function () {
        if (!$links.$body || wrapperInstalled) return

        const rootDiv = document.createElement('main')
        $links.$body.append(rootDiv)

        setWrapperInstalled(true)
    }, [$links])
}

/** Hook sets article JSX to IFrame */
export function useSetArticleToIFrame() {
    const { $links, history, historyCurrentIdx, tempComps, articleDataPrepared } = useGetArticleSelectors()
    const {  } = useGetArticleSelectors()

    useEffect(function () {
        if (!articleDataPrepared) return

        const article = history[historyCurrentIdx].article

        // Создать JSX новой статьи и поставить в iFrame.
        ReactDOM.render(
            articleManager.turnArticleDataToJSX(article, tempComps),
            $links.$body.firstChild as Element
        )
    }, [$links, history, historyCurrentIdx, tempComps, articleDataPrepared])
}
