
// Типы компонента TempCompFilesTree
namespace TempCompsTreeType {
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

    export type FileItemId = number
    export type FolderItemId = string
    export type ItemId = FileItemId | FolderItemId
    export type ItemIdArr = ItemId[]


    // Тип элемента: файл или папка
    export type ItemType = 'file' | 'folder'

    export type AfterClickBeforeBtn = (ItemId: FileItemId) => void
    export type AfterClickAfterBtn = (ItemId: FileItemId) => void
    export type AfterClickInsideBtn = (ItemId: FileItemId) => void

    // Функция запускаемая после разворачивания/сворачивания папки
    export type AfterCollapseFolder = (items: Items, openIdArr: FolderItemId[]) => void

    export type After = {
        afterCollapseFolder: AfterCollapseFolder
        afterClickBeforeBtn: AfterClickBeforeBtn
        afterClickAfterBtn: AfterClickAfterBtn
        afterClickInsideBtn: AfterClickInsideBtn
    }
}

export default TempCompsTreeType