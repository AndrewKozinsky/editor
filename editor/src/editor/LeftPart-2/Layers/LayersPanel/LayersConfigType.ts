
namespace LayersConfigType {
    export type Layers = Layer[]

    export type Layer = {
        type: LayerType // Тип слоя
        name: string // Имя компонента или элемента

        hidden: boolean // Скрыт ли слой на панели слоёв?
        parentLayerHidden: boolean
        offset: number // Уровень вложенности слоя относительно его предков

        selected: boolean // Слой выделен?
        hovered: boolean // На слой навели?
        moveSelected: boolean // Слой выделен для перемещения?
        moveHovered: boolean // На слой навели для перемещения?

        showHideHandler: (e: any) => void // Обработчик щелчка по кнопке скрытия/раскрытия слоя
        onClickHandler: (e: any) => void // Обработчик щелчка по слою
        onMouseEnterHandler: (e: any) => void // Обработчик щелчка по слою
    }

    export type LayerType = 'rootElement' | 'element' | 'text'
}
export default LayersConfigType