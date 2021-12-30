
// Типы компонента DragFilesTree
namespace DragFilesTreeType {
    // Передаваемый в FilesTree массив с папками и файлами
    export type Items = Item[]

    export type Item = FileItem | FolderItem

    export type FileItem = {
        id: FileItemId
        type: 'file'
        name: string // Item name
        placeMark?: PlaceMark // Визуальная отметка куда будет помещён перемещаемый элемент
        loading?: boolean // Стоит ли значёк загрузки у файла?
        active?: boolean // Выделен ли элемент
    }

    export type FolderItem = {
        id: FolderItemId
        type: 'folder'
        name: string // Item name
        open?: boolean // Is folder open
        content?: Items // Folder's content
        placeMark?: PlaceMark // Визуальная отметка куда будет помещён перемещаемый элемент
        active?: boolean // Выделен ли элемент
    }

    export type ItemType = 'file' | 'folder'

    // id папки или файла
    export type FileItemId = number
    export type FolderItemId = string
    export type ItemId = FileItemId | FolderItemId
    export type ItemIdArr = ItemId[]

    // Визуальная отметка куда будет помещён перемещаемый элемент:
    // null — отметка не ставится
    // before или after — выше или ниже текущего элемента
    // inside — внутрь (только для папки)
    export type PlaceMark = null | 'before' | 'after' | 'inside'

    export type SetItems = (items: Items) => void

    // Функция запускаемая после создания новой папки или файла
    export type AfterAddingNewFileFn = () => Promise<number>

    // Функция запускаемая после щелчка по папке или файлу
    export type AfterSelectItemFn = (item: Item) => void

    // Функция запускаемая после разворачивания/сворачивания папки
    // На вход получает массив идентификаторов раскрытых папок
    export type AfterCollapseFolderFn = (openIdArr: FolderItemId[]) => void

    // Функция запускаемая после изменения дерева папок и файлов
    export type AfterChangingTreeFn = (items: Items) => void

    // Функция запускаемая после удаления папки или файла
    export type AfterDeleteItem = (originalItems: Items, newItems: Items, deletedItem: Item) => void

    export type After = {
        newFolderName?: string
        newFileName?: string
        addingNewFile?: AfterAddingNewFileFn
        selectItem?: AfterSelectItemFn
        collapseFolder?: AfterCollapseFolderFn
        changingTree?: AfterChangingTreeFn
        deleteItem?: AfterDeleteItem
    }
}

export default DragFilesTreeType
