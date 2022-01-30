
// Типы компонента DragFilesTree
import FilesTreeType from '../../types/FilesTreeType'

namespace DragFilesTreeType {
    // Передаваемый в FilesTree массив с папками и файлами
    export type Items = FilesTreeType.Items

    export type Item = FileItem | FolderItem

    export interface FileItem extends FilesTreeType.FileItem {
        placeMark?: PlaceMark // Визуальная отметка куда будет помещён перемещаемый элемент
        loading?: boolean // Стоит ли значок загрузки у файла?
        active?: boolean // Выделен ли элемент
    }

    export interface FolderItem extends FilesTreeType.FolderItem {
        placeMark?: PlaceMark // Визуальная отметка куда будет помещён перемещаемый элемент
        active?: boolean // Выделен ли элемент
    }

    // id папки или файла
    export type FileItemId = FilesTreeType.FileItemId
    export type FolderItemId = FilesTreeType.FolderItemId
    export type ItemId = FilesTreeType.ItemId
    export type ItemIdArr = FilesTreeType.ItemIdArr

    export type ItemType = FilesTreeType.ItemType

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
