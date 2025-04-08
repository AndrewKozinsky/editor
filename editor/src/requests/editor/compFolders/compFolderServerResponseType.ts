import ErrorServerResponseType from 'requests/errorServerResponseType'
import FilesTreeType from 'types/FilesTreeType'

type CommonType<T> = {
    status: 'success',
    statusCode: number,
    data: {
        compFolders: CompFolderType<T>[]
    }
}

export type CompFolderType<T> = {
    id: number
    content: T | null
}

// Типы ответов от сервера при операциях с папками компонентов
// Неразобранный
export type CompFolderRowServerRespType = ErrorServerResponseType | CommonType<string>
// Разобранный
export type CompFolderServerSuccessRespType = CommonType<FilesTreeType.Items>
