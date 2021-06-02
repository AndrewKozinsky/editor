
// Типы компонента FilesTree
namespace FilesTreeType {
    // Передаваемый в FilesTree массив с папками и файлами
    export type Items = Item[]
    export type Item = {
        uuid: UuId // Идентификатор
        type: ItemType // Тип элемента: файл или папка
        // Визуальная отметка куда будет помещён перемещаемый элемент
        placeMark?: PlaceMark
        name: string // Имя файла или папки
        open?: boolean // Открыта ли папка (если папка)
        content?: Items // Содержимое папки (если папка)
    }

    // id папки или файла
    export type UuId = string

    // Массив uuid
    export type UuIdArr = UuId[]

    // Тип элемента: файл или папка
    export type ItemType = 'file' | 'folder'

    // Визуальная отметка куда будет помещён перемещаемый элемент:
    // null — отметка не ставится
    // before или after — выше или ниже текущего элемента
    // inside — внутрь (только для папки)
    export type PlaceMark = null | 'before' | 'after' | 'inside'

    // Функция устанавливающая новые данные в Состояние FilesTree
    export type SetItemsFn = (items: Items) => void

    // Функция устанавливающая uuid активной папки или файла в
    export type SetActiveItemIdFn = (activeItemId: UuId) => void

    // Функция запускаемая после создания новой папки
    export type OutAfterAddingNewFileFn = (item: Item) => void

    // Функция запускаемая после щелчка по папке или файлу
    export type OutSelectItemFn = (item: Item) => void

    // Функция запускаемая после разворачивания/сворачивания папки
    // На вход получает массив идентификаторов раскрытых папок
    export type OutCollapseFolderFn = (openUuIdArr: UuIdArr) => void

    // Функция запускаемая после изменения дерева папок и файлов
    export type OutAfterChangingTreeFn = (items: Items) => void

    // Функция запускаемая после щелчка по папке или файлу
    export type OutOnItemClick = (item: Item) => void

    export type Out = {
        newFolderName?: string
        newFileName?: string
        afterAddingNewFile: OutAfterAddingNewFileFn
        selectItem: OutSelectItemFn
        collapseFolder: OutCollapseFolderFn
        afterChangingTree: OutAfterChangingTreeFn
        onItemClick: OutOnItemClick
    }
}

export default FilesTreeType
