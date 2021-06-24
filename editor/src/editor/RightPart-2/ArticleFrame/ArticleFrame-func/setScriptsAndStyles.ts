import {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'store/rootReducer'


// Hook sets scripts and styles to <head> and <body> of the IFrame
export function useSetScriptsAndStylesToIFrame() {
    const { $links, incFiles } = useSelector((store: AppState) => store.article)

    useEffect(function () {
        if (!$links.$body) return

        // Set code in <head>
        if (incFiles.inHead) {
            $links.$head.innerHTML = incFiles.inHead
        }

        // Set code before end the <body>
        if (incFiles.beforeEndBody) {
            $links.$body.insertAdjacentHTML('beforeEnd', incFiles.beforeEndBody);
        }
    }, [$links, incFiles.inHead, incFiles.beforeEndBody])
}