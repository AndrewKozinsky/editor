import FilesTreeType from 'types/filesTree'

// Типы компонента TempCompFilesTree
namespace TempCompFilesTreeType {
    // Передаваемый в FilesTree массив с папками и файлами
    export type Items = Item[]

    export interface Item extends FilesTreeType.Item {
        // Is Insert inside button allowed
        afterButtonAllowed?: boolean
        insideButtonAllowed?: boolean
    }

    // id папки или файла
    export type Id = number

    // Массив id
    export type IdArr = FilesTreeType.IdArr

    // Тип элемента: файл или папка
    // export type ItemType = FilesTreeType.ItemType

    export type AfterClickBeforeBtn = (ItemId: Id) => void
    export type AfterClickAfterBtn = (ItemId: Id) => void
    export type AfterClickInsideBtn = (ItemId: Id) => void

    // Функция запускаемая после разворачивания/сворачивания папки
    export type AfterCollapseFolder = (items: Items, openIdArr: IdArr) => void

    export type After = {
        afterCollapseFolder: AfterCollapseFolder
        afterClickBeforeBtn: AfterClickBeforeBtn
        afterClickAfterBtn: AfterClickAfterBtn
        afterClickInsideBtn: AfterClickInsideBtn
    }
}

export default TempCompFilesTreeType
