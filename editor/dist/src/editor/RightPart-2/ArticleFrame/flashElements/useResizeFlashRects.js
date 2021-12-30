import { useEffect, useState } from 'react';
import useGetArticleSelectors from 'store/article/articleSelectors';
import { setSizeAndPosition } from './setSizeAndPosition';
/** Хук отслеживает изменения в статье и пересчитывает положение подсвечивающих прямоугольников */
export function useResizeFlashRects() {
    const { $links, history } = useGetArticleSelectors();
    // Were resize and scroll handlers set?
    const [handlersSet, setHandlerSet] = useState(false);
    // Ссылка на функцию, который нужно запускать для пересчёта положения
    // и размера подсвечивающих прямоугольников
    const resizeHandler = useGetResizeHandler();
    useEffect(function () {
        if (!resizeHandler)
            return;
        if (!handlersSet) {
            $links.$window.addEventListener('resize', resizeHandler);
            $links.$document.addEventListener('scroll', resizeHandler);
            setHandlerSet(true);
        }
        setTimeout(resizeHandler, 0);
    }, [resizeHandler, handlersSet, history.length]);
}
/* Хук возвращает функцию, которая пересчитывает положение и размеры подсвечивающих прямоугольников */
function useGetResizeHandler() {
    const { $links } = useGetArticleSelectors();
    const [calcRectCoords, setCalcRectCoords] = useState(null);
    useEffect(function () {
        if (!$links.$document)
            return;
        const $hoverRect = $links.$body.querySelector('[data-em-hover-rect]');
        const $selectRect = $links.$body.querySelector('[data-em-select-rect]');
        const $moveHoverRect = $links.$body.querySelector('[data-em-move-hover-rect]');
        const $moveSelectRect = $links.$body.querySelector('[data-em-move-select-rect]');
        const fn = getCalcRectCoords($links, $hoverRect, $selectRect, $moveHoverRect, $moveSelectRect);
        setCalcRectCoords(() => fn);
    }, [$links]);
    return calcRectCoords;
}
/**
 * Обработчик изменения размера окна и прокрутки.
 * Функция запускает функцию пересчёта положения подсвечивающих прямоугольников.
 * @param {Object} $links — объект ссылок на элементы iFrame.
 * @param {HTMLElement} $hoverRect — ссылка на прямоугольник наведения
 * @param {HTMLElement} $selectRect — ссылка на прямоугольник выделения
 * @param {HTMLElement} $moveHoverRect — ссылка на прямоугольник наведения для перемещения
 * @param {HTMLElement} $moveSelectRect — ссылка на прямоугольник выделения для перемещения
 */
function getCalcRectCoords($links, $hoverRect, $selectRect, $moveHoverRect, $moveSelectRect) {
    return function () {
        const rects = [
            { type: 'hover', $rect: $hoverRect },
            { type: 'select', $rect: $selectRect },
            { type: 'movehover', $rect: $moveHoverRect },
            { type: 'moveselect', $rect: $moveSelectRect }
        ];
        for (let i = 0; i < rects.length; i++) {
            const rectData = rects[i];
            const rectCoordsStr = $links.$body.getAttribute(rectData.type + 'rectcoords');
            if (rectCoordsStr) {
                let rectCoords = JSON.parse(rectCoordsStr);
                // Correct flashed rectangles visibility, size and position
                setSizeAndPosition($links, rectData.type, rectCoords, rectData.$rect);
            }
        }
    };
}
//# sourceMappingURL=useResizeFlashRects.js.map