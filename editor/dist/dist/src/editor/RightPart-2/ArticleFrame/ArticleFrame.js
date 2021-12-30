import React, { useRef } from 'react';
import { useInstallFlashRects } from './flashElements/useInstallFlashRects';
import { useSetMouseHandlersForFlashRects } from './flashElements/useSetMouseHandlersForFlashRects';
import { usePassFlashRectCoordsToIFrame } from './flashElements/usePassFlashRectCoordsToIFrame';
import { useChangeFlashRectanglesPosition } from './flashElements/useChangeFlashRectanglesPosition';
import { useResizeFlashRects } from './flashElements/useResizeFlashRects';
import useSetKeyDownHandlerForText from './textComponents/useSetKeyDownHandlerForText';
import useChangeActiveTextComponent from './textComponents/useChangeActiveTextComponent';
import { useSetRootDivToIFrame } from './init/useSetRootDivToIFrame';
import useSetIFrameElemsLinks from './init/useSetIFrameElemsLinks';
import useSetServiceStyleToIFrame from './init/useSetServiceStyleToIFrame';
import useSetArticleDataInStore from './setArticleData/useSetArticleDataInStore';
import { useSetSiteTemplate, useSetUserScriptsAndStylesToIFrame } from './setArticleData/useSetSiteTemplate';
import { useSetComponentsTemplates } from './setArticleData/useSetComponentsTemplates';
import useSetArticleToIFrame from './setArticleData/useSetArticleToIFrame';
import './ArticleFrame.scss';
/* IFrame куда помещается статья */
export default function ArticleFrame() {
    const windowRef = useRef(null);
    // ДЕЙСТВИЯ СОВЕРШАЕМЫЕ ПРИ ЗАГРУЗКЕ САЙТА
    // Hook sets links to IFrame window, document, head and body to Store when IFrame rendered
    useSetIFrameElemsLinks(windowRef);
    // Установка контейнера в которую будет складываться разметка статьи
    useSetRootDivToIFrame();
    // Установка служебных стилей в IFrame
    useSetServiceStyleToIFrame();
    // Работа с текстом
    useSetKeyDownHandlerForText();
    useChangeActiveTextComponent();
    // Подсвечивающие прямоугольники
    useInstallFlashRects();
    useSetMouseHandlersForFlashRects();
    usePassFlashRectCoordsToIFrame();
    useChangeFlashRectanglesPosition();
    useResizeFlashRects();
    // ДЕЙСТВИЯ СОВЕРШАЕМЫЕ ПРИ ОТРИСОВКИ/ОЧИСТКИ СТАТЬИ
    // Загрузка данных статьи при изменении articleId
    useSetArticleDataInStore();
    // Установка/очистка шаблона сайта
    useSetSiteTemplate();
    // Hook sets user's scripts and styles to IFrame
    useSetUserScriptsAndStylesToIFrame();
    // Установка шаблонов компонентов и папок
    useSetComponentsTemplates();
    // Hook sets article JSX to IFrame
    useSetArticleToIFrame();
    return React.createElement("iframe", { className: "article-frame", ref: windowRef });
}
//# sourceMappingURL=ArticleFrame.js.map
//# sourceMappingURL=ArticleFrame.js.map