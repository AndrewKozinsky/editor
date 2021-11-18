
// Тип данных отравляемых клиенту при операциях с сайтом
export interface ArtFolderResponseInterface {
    status: 'success'
    statusCode: number
    data: {
        artFolders: ArtFolderType[]
    }
}

type ArtFolderType = {
    id: number
    content: string
}
