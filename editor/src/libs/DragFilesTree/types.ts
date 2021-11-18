
// Типы компонента DragFilesTree
import {afterAddingNewFile} from '../../editor/RightPart-1/ComponentsOrArticles/FoldersList/FoldersList-func'

namespace DragFilesTreeType {
    // Передаваемый в FilesTree массив с папками и файлами
    export type Items = Item[]

    export interface Item {
        id: Id // Folder or file uuid
        type: ItemType // Item type: folder or file
        name: string // Item name
        open?: boolean // Is folder open
        content?: Items // Folder's content
        placeMark?: PlaceMark // Визуальная отметка куда будет помещён перемещаемый элемент
        loading?: boolean // Стоит ли значёк загрузки у файла?
        active?: boolean // Выделен ли элемент
    }

    // id папки или файла
    export type Id = number
    export type IdArr = Id[]

    // Тип элемента: файл или папка
    export type ItemType = 'file' | 'folder'

    // Визуальная отметка куда будет помещён перемещаемый элемент:
    // null — отметка не ставится
    // before или after — выше или ниже текущего элемента
    // inside — внутрь (только для папки)
    export type PlaceMark = null | 'before' | 'after' | 'inside'

    export type SetItems = (items: Items) => void

    // Функция запускаемая после создания новой папки или файла
    // export type AfterAddingNewFileFn = (...args: any) => Promise<number>
    // export type AfterAddingNewFileFn = () => (...args: any) => Promise<number>
    export type AfterAddingNewFileFn = () => Promise<number>

    // Функция запускаемая после щелчка по папке или файлу
    export type AfterSelectItemFn = (item: Item) => void

    // Функция запускаемая после разворачивания/сворачивания папки
    // На вход получает массив идентификаторов раскрытых папок
    export type AfterCollapseFolderFn = (openIdArr: IdArr) => void

    // Функция запускаемая после изменения дерева папок и файлов
    export type AfterChangingTreeFn = (items: Items) => void

    // Функция запускаемая после удаления папки или файла
    export type AfterDeleteItem = (items: Items, deletedItemUuid: Id) => void

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
