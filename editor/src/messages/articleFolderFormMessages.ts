import getMsgProxy from './fn/msgProxy'

// Форма редактирования выбранной папки шаблона компонента
const articleFolderFormMessages = {
    folderNameInput: {
        eng: 'Folder name',
        rus: 'Название папки'
    },
    emailToLong: {
        eng: 'Email is too long',
        rus: 'Почта слишком длинная'
    },
    submitBtnTextSave: {
        eng: 'Save',
        rus: 'Сохранить'
    },
    deleteFolderBtnText: {
        eng: 'Delete',
        rus: 'Удалить'
    },
    formNameInputRequired: {
        eng: 'The folder name cannot be empty',
        rus: 'Название папки не может быть пустым'
    },
    deleteFolderConfirmationHeaderInModal: {
        eng: 'Do you want to delete the folder with articles?',
        rus: 'Удалить папку со статьями?'
    },
    deleteFolderConfirmationTextInModal: {
        eng: 'Are you sure you want to delete the folder with articles?',
        rus: 'Вы уверены, что хотите удалить папку со статьями?'
    },
    closeDeleteFolderModalBtn: {
        eng: 'Cancel',
        rus: 'Отменить'
    },
    deleteFolderBtnInModal: {
        eng: 'Delete',
        rus: 'Удалить'
    },
}

const articleFolderFormMsg = getMsgProxy<typeof articleFolderFormMessages>(articleFolderFormMessages)
export default articleFolderFormMsg