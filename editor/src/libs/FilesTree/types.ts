
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
        active?: boolean // Выделен ли элемент
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

    // Функция запускаемая после создания новой папки или файла
    export type AfterAddingNewItemFn = (items: Items, item: Item) => void

    // Функция запускаемая после щелчка по папке или файлу
    export type AfterSelectItemFn = (item: Item) => void

    // Функция запускаемая после разворачивания/сворачивания папки
    // На вход получает массив идентификаторов раскрытых папок
    export type AfterCollapseFolderFn = (openUuIdArr: UuIdArr) => void

    // Функция запускаемая после изменения дерева папок и файлов
    export type AfterChangingTreeFn = (items: Items) => void

    // Функция запускаемая после удаления папки или файла
    export type AfterDeleteItem = (items: Items) => void

    export type After = {
        newFolderName?: string
        newFileName?: string
        addingNewItem?: AfterAddingNewItemFn
        selectItem?: AfterSelectItemFn
        collapseFolder?: AfterCollapseFolderFn
        changingTree?: AfterChangingTreeFn
        deleteItem?: AfterDeleteItem
    }
}

export default FilesTreeType
