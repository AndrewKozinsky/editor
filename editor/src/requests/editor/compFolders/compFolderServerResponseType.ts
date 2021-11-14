
// Успешный ответ от сервера при операциях с сайтами
type CompFolderServerResponseType = {
    status: 'success',
    statusCode: number,
    data: {
        compFolders: CompFolderType[]
    }
}

export default CompFolderServerResponseType


export type CompFolderType = {
    id: number
    content: string
    createdAt: Date
}

