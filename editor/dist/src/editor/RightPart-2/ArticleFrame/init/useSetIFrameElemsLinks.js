import { useEffect } from 'react';
import actions from 'store/rootAction';
import { store } from 'store/rootReducer';
/**
 * Hook gets links to IFrame window, document, head and body to Store when IFrame rendered
 * @param {Object} iFrameRef — reg to iFrame
 */
export default function useSetIFrameElemsLinks(iFrameRef) {
    useEffect(function () {
        if (!iFrameRef.current)
            return;
        let $iFrame = iFrameRef.current;
        const $window = $iFrame.contentWindow;
        const $document = $window.document;
        const $head = $document.head;
        const $body = $document.body;
        // Set links to Store
        store.dispatch(actions.article.setLinks($window, $document, $head, $body));
    }, [iFrameRef.current]);
}
//# sourceMappingURL=useSetIFrameElemsLinks.js.map