
// Тип данных отравляемых клиенту при операциях с сайтом
export interface CompFolderResponseInterface {
    status: 'success'
    statusCode: number
    data: {
        compFolders: CompFolderType[]
    }
}

type CompFolderType = {
    id: number
    content: string
}
