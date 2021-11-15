import DragFilesTreeType from 'libs/DragFilesTree/types'
import ErrorServerResponseType from '../../errorServerResponseType'

type CommonType<T> = {
    status: 'success',
    statusCode: number,
    data: {
        compFolders: CompFolderType<T>[]
    }
}

export type CompFolderType<T> = {
    id: number
    content: T
    createdAt: Date
}

// Типы ответов от сервера при операциях с папками с компонентами
// Неразобранный
export type GetCompFolderRowServerRespType = ErrorServerResponseType | CommonType<string>
// Разобранный
export type GetCompFolderServerSuccessRespType = CommonType<DragFilesTreeType.Items>

