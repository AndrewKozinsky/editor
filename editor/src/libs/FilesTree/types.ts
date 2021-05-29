
// Типы компонента FilesTree
namespace FilesTreeType {
    // Передаваемый в FilesTree массив с папками и файлами
    export type Items = Item[]
    export type Item = {
        id: Id // Идентификатор
        type: ItemType // Тип элемента: файл или папка
        // Визуальная отметка куда будет помещён перемещаемый элемент
        placeMark?: PlaceMark
        name: string // Имя файла или папки
        open?: boolean // Открыта ли папка (если папка)
        content?: Items // Содержимое папки (если папка)
    }

    // id папки или файла
    export type Id = string

    // Тип элемента: файл или папка
    export type ItemType = 'file' | 'folder'

    // Визуальная отметка куда будет помещён перемещаемый элемент:
    // null — отметка не ставится
    // before или after — выше или ниже текущего элемента
    // inside — внутрь (только для папки)
    export type PlaceMark = null | 'before' | 'after' | 'inside'

    // id папок, которые должны быть изначально открыты
    export type OpenFolderIds = string[]

    // Функция открывающая/сворачивающая папку
    // ДУМАЮ ПОЗЖЕ МОЖНО УДАЛИТЬ
    // export type ToggleFolderFn = (folderId: string) => void

    // Функция открывающая/сворачивающая папку
    // ДУМАЮ ПОЗЖЕ МОЖНО УДАЛИТЬ
    // export type ShowPlaceMarkFn = (itemId: string, position: PlaceMark) => void

    // Функция находит в массиве объект данных с переданным id
    // ДУМАЮ ПОЗЖЕ МОЖНО УДАЛИТЬ
    // export type GetItemDataByIdFn = (items: Items, itemId: string) => void

    // Функция помещает указанный элемент в другую часть дерева папок и файлов и обновляет Состояние
    // ДУМАЮ ПОЗЖЕ МОЖНО УДАЛИТЬ
    // export type MoveItemToFn = (movedItemId: string, anchorItemId: string, position: PlaceMark) => void

    // Функция устанавливающая новые данные в Состояние FilesTree
    export type SetItemsFn = (items: Items) => void
}

export default FilesTreeType
