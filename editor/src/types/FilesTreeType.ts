// Тип данных по файловой структуре загруженной с сервера
// для DragFilesTree и TempCompFilesTree,
// то есть данных для этих компонентов после загрузки находятся в таком формате,
// после скачивания к ним добавляются другие свойства для функционирования
// DragFilesTree и TempCompFilesTree.
// А для сохранения на сервере данные снова преобразуются в формат FilesTreeType
// Я не могу избавиться от этого типа потому что данные для DragFilesTree и TempCompFilesTree
// загружаются одним и тем же запросом. Поэтому там нужно указывать в каком формате приходят эти данные.
// Если написать DragFilesTree, то они не будут подходить под TempCompFilesTree и наоборот
namespace FilesTreeType {
    // Передаваемый в FilesTree массив с папками и файлами
    export type Items = Item[]

    export type Item = FileItem | FolderItem

    export type FileItem = {
        id: FileItemId
        type: 'file'
        name: string // Item name
    }

    export type FolderItem = {
        id: FolderItemId
        type: 'folder'
        name: string // Item name
        open?: boolean // Is folder open
        content?: Items // Folder's content
    }

    // id папки или файла
    export type FileItemId = number
    export type FolderItemId = string
    export type ItemId = FileItemId | FolderItemId
    export type ItemIdArr = ItemId[]

    export type ItemType = 'file' | 'folder'
}

export default FilesTreeType