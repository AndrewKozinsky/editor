import React, {useRef} from 'react'
import {
    useSetAdditionalElemsToIFrame,
    useSetArticleDataInStore,
    useSetArticleToIFrame,
    useSetIFrameElemsLinks
} from './ArticleFrame-func/ArticleFrame-func'
import { useSetScriptsAndStylesToIFrame } from './ArticleFrame-func/setScriptsAndStyles'
import './ArticleFrame.scss'


export default function ArticleFrame() {
    const windowRef = useRef(null)

    // Hook sets article data in Store when IFrame rendered
    useSetArticleDataInStore()

    // Hook sets links to IFrame window, document, head and body to Store when IFrame rendered
    useSetIFrameElemsLinks(windowRef)

    // Hook sets <div> in IFrame to put an article in
    useSetAdditionalElemsToIFrame()

    // Hook sets scripts and styles to IFrame
    useSetScriptsAndStylesToIFrame()

    // Hook sets article JSX to IFrame
    useSetArticleToIFrame()

    return <iframe className="article-frame" ref={windowRef} />
}