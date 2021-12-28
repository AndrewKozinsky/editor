import { useEffect } from 'react'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import { MiscTypes } from 'types/miscTypes'

/**
 * Hook gets links to IFrame window, document, head and body to Store when IFrame rendered
 * @param {Object} iFrameRef — reg to iFrame
 */
export default function useSetIFrameElemsLinks(iFrameRef: MiscTypes.ReactRef) {
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
