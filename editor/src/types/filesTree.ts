
// Тип данных папки с вложенными файлами и документами
// получаемые с сервера
// Думаю это можно удалить и использовать DragFilesTreeType
namespace FilesTreeType {
    // Folders and files array
    export type Items = Item[]

    export type Item = {
        id: Id // Folder or file id
        type: ItemType // Item type: folder or file
        name: string // Item name
        open?: boolean // Is folder open
        content?: Items // Folder's content
    }

    export type Id = number
    export type IdArr = Id[]

    // Item type: folder or file
    export type ItemType = 'file' | 'folder'
}

export default FilesTreeType
