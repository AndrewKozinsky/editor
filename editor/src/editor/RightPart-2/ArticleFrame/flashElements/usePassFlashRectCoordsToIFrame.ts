import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import StoreArticleTypes from 'store/article/articleTypes'


// Initial data with coordinates of a flashed element
export const coordsInitialObj: StoreArticleTypes.FlashedElem = {
    tagType: null,
    dataCompId: null,
    dataElemId: null
}

/** The hook gets coordinated of a flashed element from the Store and write they to <body> as an attribute */
export default function usePassFlashRectCoordsToIFrame() {
    const { $links, history, historyCurrentIdx } = useGetArticleSelectors()

    // Objects witch data is stored. I will update them if data from the Store is different
    const [hoverRectCoords, setHoverRectCoords] = useState(coordsInitialObj)
    const [selectRectCoords, setSelectRectCoords] = useState(coordsInitialObj)
    const [moveHoverRectCoords, setMoveHoverRectCoords] = useState(coordsInitialObj)
    const [moveSelectRectCoords, setMoveSelectRectCoords] = useState(coordsInitialObj)

    useEffect(function () {
        if (!history.length) return

        // Get data of the flashed element from an actual article
        const { hoveredElem, selectedElem, moveHoveredComp, moveSelectedComp } = history[historyCurrentIdx]

        // Update Coordinates objects if a data from the Store is different
        if (hoveredElem.dataCompId !== hoverRectCoords.dataCompId || hoveredElem.dataElemId !== hoverRectCoords.dataElemId) {
            setHoverRectCoords(hoveredElem)
        }
        if (selectedElem.dataCompId !== selectRectCoords.dataCompId || selectedElem.dataElemId !== selectRectCoords.dataElemId) {
            setSelectRectCoords(selectedElem)
        }
        if (moveHoveredComp.dataCompId !== moveHoverRectCoords.dataCompId) {
            setMoveHoverRectCoords(moveHoveredComp)
        }
        if (moveSelectedComp.dataCompId !== moveSelectRectCoords.dataCompId) {
            setMoveSelectRectCoords(moveSelectedComp)
        }
    }, [history, historyCurrentIdx])


    // The useEffect is watches when coordinates of a flashed rectangle changed to write new coordinates to <body> as attribute
    useEffect(function () {
        saveCoordsToBody($links, 'hoverrectcoords', hoverRectCoords)
    }, [hoverRectCoords])

    useEffect(function () {
        saveCoordsToBody($links, 'selectrectcoords', selectRectCoords)
    }, [selectRectCoords])

    useEffect(function () {
        saveCoordsToBody($links, 'movehoverrectcoords', moveHoverRectCoords)
    }, [moveHoverRectCoords])

    useEffect(function () {
        saveCoordsToBody($links, 'moveselectrectcoords', moveSelectRectCoords)
    }, [moveSelectRectCoords])
}

/**
 * Функция получает объект с координатами и сохраняет их в <body> под переданным атрибутом
 * @param {Object} $links — объект ссылок на элементы iFrame.
 * @param {String} attrName — имя атрибута, который нужно поставить в <body>.
 * @param {Object} coordsObj — объект с координами подвечивающего прямоугольника
 */
function saveCoordsToBody(
    $links: StoreArticleTypes.LinksObj,
    attrName: 'hoverrectcoords' | 'selectrectcoords' | 'movehoverrectcoords' | 'moveselectrectcoords' ,
    coordsObj: StoreArticleTypes.FlashedElem
) {
    if (!$links.$body) return

    // Превратить данные о выделенном прямоугольнике в JSON
    const hoverCoords = JSON.stringify(coordsObj)
    $links.$body.setAttribute(attrName, hoverCoords)
}
