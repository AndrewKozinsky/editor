import ArticleCodeType from 'store/article/codeType/articleCodeType'

namespace LayersConfigType {
    export type Layers = Layer[]

    export type Layer = {
        key: string
        dCompId: null | ArticleCodeType.Id // id данных компонента
        dElemId: null | ArticleCodeType.Id // id данных элемента
        type: LayerType // Тип слоя
        name: string // Имя компонента или элемента

        collapsed?: boolean // Раскрыт ли слой
        hasChildren?: boolean // Слой имеет детей?

        hidden?: boolean // Показывается ли слой?
        parentLayerHidden?: boolean // Скрыт ли родительский слой?
        offset: number // Уровень вложенности слоя относительно его предков

        selected?: boolean // Слой выделен?
        hovered?: boolean // На слой навели?
        moveSelected?: boolean // Слой выделен для перемещения?
        moveHovered?: boolean // На слой навели для перемещения?

        hasSelectedChild?: boolean // Содержит выделенный слой
        hasMovedChild?: boolean // Содержит перемещаемый слой

        collapseHandler?: () => void // Обработчик щелчка по кнопке сворачивания/разворачивания слоя
        showHideHandler?: () => void // Обработчик щелчка по кнопке скрытия/раскрытия слоя
        onClickHandler?: (e: any) => void // Обработчик щелчка по слою
        onMouseEnterHandler?: (e: any) => void // Обработчик щелчка по слою
    }

    export type LayerType = 'component' | 'element' | 'text'

    // Массив с ключами свёрнутых компонентов/элементов
    export type CollapsedItems = string[]
    // Функция ставящая в Состояние обновлённый массив ключей свёрнутых компонентов/элементов
    export type SetCollapsedItems = (items: CollapsedItems) => void
}
export default LayersConfigType