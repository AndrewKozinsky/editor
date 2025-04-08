import getMsgProxy from './fn/msgProxy'

// Форма редактирования выбранной папки шаблона компонента
const componentFolderFormMessages = {
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
    formNameInputTooLong: {
        eng: 'A folder name cannot be longer than 255 characters',
        rus: 'Название папки не может быть длиннее 255 символов'
    },
    deleteFolderConfirmationHeaderInModal: {
        eng: 'Delete the folder with the component templates?',
        rus: 'Удалить папку с шаблонами компонентов?'
    },
    deleteFolderConfirmationTextInModal: {
        eng: 'Are you sure you want to delete the folder with the component templates?',
        rus: 'Вы уверены, что хотите удалить папку с шаблонами компонентов?'
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

const componentFolderFormMsg = getMsgProxy<typeof componentFolderFormMessages>(componentFolderFormMessages)
export default componentFolderFormMsg