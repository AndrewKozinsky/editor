import {useEffect, useState} from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'

export default function useScrollToSelectedLayerAfterClick() {
    const { $links } = useGetArticleSelectors()
    // Was mouse click handler set?
    const [handlerWasSet, setHandlerWasSet] = useState(false)
    const $layersWrapper = document.getElementById('layersContentWrapper')

    useEffect(function () {
        if (!$links.$document || handlerWasSet || !$layersWrapper) return

        // Поставить обработчик
        $links.$document.addEventListener('click', (e) => {
            scrollToSelectedLayerAfterClick(e, $layersWrapper)
        })

        // Set flag that handlers were set
        setHandlerWasSet(true)
    }, [$links, $layersWrapper])
}

/**
 * Функция срабатывает после щелчка по статье. Если выделен какой-то элемент и он не виден на панели Слоёв,
 * то функция прокручивает обёртку со слоями так, чтобы выделенный слой был виден в середине панели.
 * @param {Event} e — объект события
 * @param {HTMLElement} $layersWrapper — обёртка всех слоёв
 */
function scrollToSelectedLayerAfterClick(e: MouseEvent, $layersWrapper: HTMLElement) {
    if (!$layersWrapper) return

    // Получить координаты относительно начала документа
    // верхней и нижней точки обёртки со слоями и половину видимой высоты обёртки слоёв (из панели Слоёв)
    const {layersTop, layersBottom} = getLayersWrapperCoords($layersWrapper)

    // Получить координаты относительно начала документа верхней и нижней точки обёртки выделенного слоя + сам элемент слоя
    const {$selectedLayer, selectedElemTop, selectedElemBottom} = getSelectedElemCoords()
    if (!$selectedLayer) return

    // Разница от начала обёртки слоёв до выделенного слоя
    const topDiff = layersTop - selectedElemTop

    // Разница от конца обёртки слоёв до выделенного слоя
    const bottomDiff = selectedElemBottom - layersBottom

    // Я не хочу сразу использовать функцию scrollIntoView потому что
    // я хочу чтобы прокрутка была только если выделенный слой не виден.
    // А она срабатывает всегда если элемент не находится ровно в обёртке слоёв

    if (topDiff > 0 || bottomDiff > 0) {
        setTimeout(() => {
            // Прокрутить обёртку слоёв чтобы выделенный слой был в середине
            $selectedLayer.scrollIntoView({ block: 'center'})
        }, 10)
    }
}

/**
 * Функция возвращает координаты относительно начала документа
 * верхней и нижней точки обёртки со слоями и половину видимой высоты обёртки слоёв (из панели Слоёв)
 * @param {HTMLElement} $layersWrapper — элемент обёртки слоёв компонентов из панели Слои
 */
function getLayersWrapperCoords($layersWrapper: HTMLElement) {
    const $layersCoords = $layersWrapper.getClientRects()

    // Верхняя и нижняя точка обёртки со слоями относительно начала документа
    const layersTop = $layersCoords[0].top
    const layersBottom = $layersCoords[0].bottom

    return {
        layersTop,
        layersBottom,
    }
}

/**
 * Функция возвращает координаты относительно начала документа
 * верхней и нижней точки обёртки выделенного слоя + сам элемент слоя
 */
function getSelectedElemCoords() {
    // Может быть выделен или корневой элемент (компонент) или внутренний элемент
    const $selectedLayer =
        document.querySelector('.layer__name-wrapper--comp-select') ||
        document.querySelector('.layer__name-wrapper--elem-select')

    // Вернуть пустой объект если ничего не найдено
    if (!$selectedLayer) {
        return {
            $selectedLayer: null,
            selectedElemTop: 0,
            selectedElemBottom: 0
        }
    }

    // Получение координат выделенного слоя
    const $selectedElemCoords = $selectedLayer.getClientRects()

    return {
        $selectedLayer,
        selectedElemTop: $selectedElemCoords[0].top,
        selectedElemBottom: $selectedElemCoords[0].bottom
    }
}
