import React, { useRef } from 'react'
import { useInstallFlashRects } from './flashElements/useInstallFlashRects'
import useSetMouseHandlersForFlashRects from './flashElements/useSetMouseHandlersForFlashRects'
import usePassFlashRectCoordsToIFrame from './flashElements/usePassFlashRectCoordsToIFrame'
import useChangeFlashRectanglesPosition from './flashElements/useChangeFlashRectanglesPosition'
import useResizeFlashRects from './flashElements/useResizeFlashRects'
import { useSetRootDivToIFrame } from './init/useSetRootDivToIFrame'
import useSetIFrameElemsLinks from './init/useSetIFrameElemsLinks'
import useSetServiceStyleToIFrame from './init/useSetServiceStyleToIFrame'
import { useClearUnwantedFocus } from './misc/useClearUnwantedFocus'
import useSetArticleDataInStore from './setArticleData/useSetArticleDataInStore'
import {
    useSetSiteTemplate,
    useSetUserScriptsAndStylesToIFrame
} from './setArticleData/useSetSiteTemplate'
import { useSetComponentsTemplates } from './setArticleData/useSetComponentsTemplates'
import useSetArticleToIFrame from './setArticleData/useSetArticleToIFrame'
import useSetShortcutsHandler from './keydownHandler/keydownHandler'
// import { useManageUpdatingDTextComp } from './textTracking/manageUpdatingDTextComp'
import {
    useSetTextDetails, useSetHandlersToTrackText
} from './textTracking/useUpdateArticleDataForText'
import { usePreventDefaultLinkBehavior } from './links/usePreventDefaultLinkBehavior'
import './ArticleFrame.scss'


/* IFrame куда помещается статья */
export default function ArticleFrame() {
    const windowRef = useRef(null)

    // ДЕЙСТВИЯ СОВЕРШАЕМЫЕ ПРИ ЗАГРУЗКЕ САЙТА
    // Hook sets links to IFrame window, document, head and body to Store when IFrame rendered
    useSetIFrameElemsLinks(windowRef)
    // Установка контейнера в которую будет складываться разметка статьи
    useSetRootDivToIFrame()
    // Установка служебных стилей в IFrame
    useSetServiceStyleToIFrame()

    // Установка обработчика нажатия клавиш
    useSetShortcutsHandler()

    // Работа с текстом
    useSetTextDetails()
    useSetHandlersToTrackText()
    // useManageUpdatingDTextComp()

    // Запрет действия по умолчанию при щелчке по ссылке
    usePreventDefaultLinkBehavior()

    // Хук убирает фокусировку с текста если не выбран текстовый компонент
    useClearUnwantedFocus()

    // Подсвечивающие прямоугольники
    useInstallFlashRects()
    useSetMouseHandlersForFlashRects()
    usePassFlashRectCoordsToIFrame()
    useChangeFlashRectanglesPosition()
    useResizeFlashRects()

    // ДЕЙСТВИЯ СОВЕРШАЕМЫЕ ПРИ ОТРИСОВКИ/ОЧИСТКИ СТАТЬИ
    // Загрузка данных статьи при изменении articleId
    useSetArticleDataInStore()
    // Установка/очистка шаблона сайта
    useSetSiteTemplate()
    // Hook sets user's scripts and styles to IFrame
    useSetUserScriptsAndStylesToIFrame()
    // Установка шаблонов компонентов и папок
    useSetComponentsTemplates()

    // Hook sets article JSX to IFrame
    useSetArticleToIFrame()

    return <iframe className="article-frame" ref={windowRef} />
}
