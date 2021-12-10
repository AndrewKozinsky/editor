// import { useEffect, useState } from 'react'
// import useGetArticleSelectors from 'store/article/articleSelectors'
// import StoreArticleTypes from 'store/article/articleTypes'

// Type with coordinates of a flashed element
/*export type CoordsObjType = {
    type: StoreArticleTypes.HoveredElementType
    dataCompId: null | number
    dataElemId: null | number
}*/

// Initial data with coordinates of a flashed element
/*export const coordsInitialObj: CoordsObjType = {
    type: null,
    dataCompId: null,
    dataElemId: null
}*/

/** The hook gets coordinated of a flashed element from the Store and write its to <body> as a attribute */
/*export function usePassFlashElemsCoordsToIFrame() {
    const { $links, history, historyCurrentIdx } = useGetArticleSelectors()

    // Objects witch data is stored. I will update them if data from the Store is different
    const [hoverRectCoords, setHoverRectCoords] = useState(coordsInitialObj)
    const [selectRectCoords, setSelectRectCoords] = useState(coordsInitialObj)
    const [moveHoverRectCoords, setMoveHoverRectCoords] = useState(coordsInitialObj)
    const [moveSelectRectCoords, setMoveSelectRectCoords] = useState(coordsInitialObj)

    useEffect(function () {
        if (!$links.$body || !history.length) return

        // Get data of the flashed element from an actual article
        const { hoveredElem, selectedElem, moveHoveredElem, moveSelectedElem } = history[historyCurrentIdx]

        // Update hoverRectCoords if a data from the Store is different
        if (hoveredElem.dataCompId !== hoverRectCoords.dataCompId || hoveredElem.dataElemId !== hoverRectCoords.dataElemId) {
            setHoverRectCoords(hoveredElem)
        }
        // Update selectRectCoords if a data from the Store is different
        if (selectedElem.dataCompId !== selectRectCoords.dataCompId || selectedElem.dataElemId !== selectRectCoords.dataElemId) {
            setSelectRectCoords(selectedElem)
        }
        if (moveHoveredElem.dataCompId !== moveHoverRectCoords.dataCompId || moveHoveredElem.dataElemId !== moveHoverRectCoords.dataElemId) {
            setMoveHoverRectCoords(moveHoveredElem)
        }
        if (moveHoveredElem.dataCompId !== moveSelectRectCoords.dataCompId || moveHoveredElem.dataElemId !== moveSelectRectCoords.dataElemId) {
            setMoveSelectRectCoords(moveSelectedElem)
        }
    }, [$links, history, historyCurrentIdx])


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
}*/

/**
 * Функция получает объект с координатами и сохраняет их в <body> под переданным атрибутом
 * @param {Object} $links — объект ссылок на элементы iFrame.
 * @param {String} attrName — имя атрибута, который нужно поставить в <body>.
 * @param {Object} coordsObj — объект с координами подвечивающего прямоугольника
 */
/*
function saveCoordsToBody(
    $links: StoreArticleTypes.LinksObj,
    attrName: 'hoverrectcoords' | 'selectrectcoords' | 'movehoverrectcoords' | 'moveselectrectcoords' ,
    coordsObj: CoordsObjType
) {
    if (!$links.$body) return

    // Превратить данные о выделенном прямоугольнике в JSON
    const hoverCoords = JSON.stringify(coordsObj)
    $links.$body.setAttribute(attrName, hoverCoords)
}*/
