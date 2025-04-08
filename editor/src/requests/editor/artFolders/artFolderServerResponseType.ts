import ErrorServerResponseType from 'requests/errorServerResponseType'
import FilesTreeType from 'types/FilesTreeType'

type CommonType<T> = {
    status: 'success',
    statusCode: number,
    data: {
        artFolders: ArtFolderType<T>[]
    }
}

export type ArtFolderType<T> = {
    id: number
    content: T | null
}

// Типы ответов от сервера при операциях с папками компонентов
// Неразобранный
export type ArtFolderRowServerRespType = ErrorServerResponseType | CommonType<string>
// Разобранный
export type ArtFolderServerSuccessRespType = CommonType<FilesTreeType.Items>
