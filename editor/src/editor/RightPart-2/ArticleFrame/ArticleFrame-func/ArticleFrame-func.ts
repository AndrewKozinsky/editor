import {useEffect} from 'react'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'
import store from 'store/store'
import actions from 'store/rootAction'
import { AppState } from 'store/rootReducer'
import {MiscTypes} from 'types/miscTypes'
import {getFromLocalStorage} from 'utils/MiscUtils'
import buildArticle from '../articleBuilder/articleBuilder'


// Hook sets article data in Store when IFrame rendered
export function useSetArticleDataInStore() {
    useEffect(function () {
        const articleData = getFromLocalStorage('article')
        if (!articleData) return

        store.dispatch(actions.article.fillArticle(
            articleData.siteId, articleData.incFilesId, articleData.articleId
        ))
    }, [])
}

// Hook gets links to IFrame window, document, head and body to Store when IFrame rendered
export function useSetIFrameElemsLinks(iFrameRef: MiscTypes.ReactRef) {
    useEffect(function () {
        if (!iFrameRef.current) return

        let $iFrame = iFrameRef.current as HTMLIFrameElement
        const $window = $iFrame.contentWindow
        const $document = $window.document
        const $head = $document.head
        const $body = $document.body as HTMLBodyElement

        // Set links to Store
        store.dispatch(actions.article.setLinks( $window, $document, $head, $body ))
    }, [])
}

// Hook sets <div> in IFrame to put an article in
export function useSetAdditionalElemsToIFrame() {
    const { $links } = useSelector((store: AppState) => store.article)

    useEffect(function () {
        if (!$links.$body) return

        const rootDiv = document.createElement('div')
        $links.$body.append(rootDiv)
    }, [$links])
}

// Hook sets article JSX to IFrame
export function useSetArticleToIFrame() {
    const { $links, article, tempComps } = useSelector((store: AppState) => store.article)

    useEffect(function () {
        if (!article) return

        // Создать JSX новой статьи и поставить в iFrame.
        ReactDOM.render(
            buildArticle(article, tempComps),
            $links.$body.firstChild
        );
    }, [article])
}