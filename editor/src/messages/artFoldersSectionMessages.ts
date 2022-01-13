import getMsgProxy from './fn/msgProxy'

// Структура папок и файлов статей
const artFoldersSectionMessages = {
    createNewFolderBth: {
        eng: 'New folder',
        rus: 'Новая папка'
    },
    createNewFileBth: {
        eng: 'New article',
        rus: 'Новая статья'
    },
}

const artFoldersSectionMsg = getMsgProxy<typeof artFoldersSectionMessages>(artFoldersSectionMessages)
export default artFoldersSectionMsg