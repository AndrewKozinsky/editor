import getMsgProxy from './fn/msgProxy'

// Структура папок и файлов шаблонов компонентов
const compFoldersSectionMessages = {
    createNewFolderBth: {
        eng: 'New folder',
        rus: 'Новая папка'
    },
    createNewFileBth: {
        eng: 'New component',
        rus: 'Новый компонент'
    },
}

const compFoldersSectionMsg = getMsgProxy<typeof compFoldersSectionMessages>(compFoldersSectionMessages)
export default compFoldersSectionMsg