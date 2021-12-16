import React, { useRef } from 'react'
import {
    useSetArticleDataInStore,
    useSetIFrameElemsLinks,
    useSetRootDivToIFrame,
    useSetArticleToIFrame,
} from './ArticleFrame-func/ArticleFrame-func'
import { useSetUserScriptsAndStylesToIFrame } from './ArticleFrame-func/setUserScriptsAndStyles'
import useCorrectArticleData from './ArticleFrame-func/useCorrectArticleData'
import { useSetServiceStyleToIFrame } from './ArticleFrame-func/useSetServiceStyleToIFrame'
// import { useManageEmptyTextSign } from './ArticleFrame-func/useManageEmptyTextSign'
import { useInstallFlashRects } from './flashElements/useInstallFlashRects'
import { useSetMouseHandlersForFlashRects } from './flashElements/useSetMouseHandlersForFlashRects'
import { usePassFlashRectCoordsToIFrame } from './flashElements/usePassFlashRectCoordsToIFrame'
import { useChangeFlashRectanglesPosition } from './flashElements/useChangeFlashRectanglesPosition'
// import { useRemoveUnwantedFocus } from './ArticleFrame-func/useRemoveUnwantedFocus'
// import { useCleanIFrame } from './ArticleFrame-func/useCleanIFrame'
import { useSetResizeHandlersForFlashRects } from './flashElements/useSetResizeHandlersForFlashRects'
import './ArticleFrame.scss'


export default function ArticleFrame() {
    const windowRef = useRef(null)

    // Clean the iframe if an article was cleaned
    // useCleanIFrame()

    // Hook sets article data in Store when IFrame rendered
    useSetArticleDataInStore()

    // Hook sets links to IFrame window, document, head and body to Store when IFrame rendered
    useSetIFrameElemsLinks(windowRef)

    // Hook sets user's scripts and styles to IFrame
    useSetUserScriptsAndStylesToIFrame()

    // Поставить служебные стили в IFrame
    useSetServiceStyleToIFrame()

    // Hook manages Empty text sign visibility
    // useManageEmptyTextSign()

    // Hook sets <div> in IFrame to put an article in
    useSetRootDivToIFrame()

    // Хук готовит данные статьи чтобы они соответствовали шаблонам компонента.
    // Это требуется если в статью добавили компоненты, сохранили и закрыли статью.
    // После отредактировали шаблоны компонентов, например, убрали или добавили элементы.
    // Поэтому данные нужно исправить чтобы при сборке статьи не было проблем.
    useCorrectArticleData()

    // Hook sets article JSX to IFrame
    useSetArticleToIFrame()

    // Set and control hovered and selected rectangles in IFrame
    useInstallFlashRects()
    useSetMouseHandlersForFlashRects()
    usePassFlashRectCoordsToIFrame()
    useChangeFlashRectanglesPosition()
    useSetResizeHandlersForFlashRects()

    // If a user clicks on a element containing a text component, it will get the focus.
    // The hook sets a click handler removes unwanted focus.
    // useRemoveUnwantedFocus()

    return <iframe className="article-frame" ref={windowRef} />
}
