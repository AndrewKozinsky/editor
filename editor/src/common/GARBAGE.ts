// ЭТО ФАЙЛ С НЕИСПОЛЬЗУЕМЫМИ КУСКАМИ КОДА, КОТОРЫЕ, ВОЗМОЖНО, ПОТРЕБУЮТСЯ

// ЭТО ИМИТАЦИЯ МЕТОДА $selectedLayer.scrollIntoView({ block: 'center'})
// Раньше была в scrollToSelectedLayerAfterClick()
// Разница от начала обёртки слоёв до выделенного слоя
// const topDiff = layersTop - selectedElemTop
// Если разница больше нуля, то выделенный слой скрыт выше видимого начала обёртки слоёв
/*if (topDiff > 0) {
    setTimeout(() => {
        // Прокрутить обёртку слоёв чтобы выделенный слой был в середине
        $layersWrapper.scrollTop = $layersWrapper.scrollTop - topDiff - halfHeight
    }, 10)
}*/

// Разница от конца обёртки слоёв до выделенного слоя
// const bottomDiff = selectedElemBottom - layersBottom
// Если разница больше нуля, то выделенный слой скрыт ниже видимого конца обёртки слоёв
/*if (bottomDiff > 0) {
    setTimeout(() => {
        // Прокрутить обёртку слоёв чтобы выделенный слой был в середине
        $layersWrapper.scrollTop = $layersWrapper.scrollTop + bottomDiff + halfHeight
    }, 10)
}*/