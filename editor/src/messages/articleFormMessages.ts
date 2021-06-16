import {getMessagesObject} from 'messages/fn/getMessagesObject'


// Форма редактирования выбранной статьи
const obj = {
    articleNameInput: {
        eng: 'Article name',
        rus: 'Название статьи'
    },
    defaultTemplateInput: {
        eng: 'The default template of the plug-in files',
        rus: 'Шаблон подключаемых файлов по умолчанию'
    },
    articleNameRequired: {
        eng: 'The article name cannot be empty',
        rus: 'Название статьи не может быть пустым'
    },
    submitBtnText: {
        eng: 'Save',
        rus: 'Сохранить'
    },
    deleteArticleBtnText: {
        eng: 'Delete',
        rus: 'Удалить'
    },
    deleteArticleConfirmationTextInModal: {
        eng: 'Are you sure you want to delete the article?',
        rus: 'Вы уверены, что хотите удалить статью?'
    },
    closeDeleteArticleModalBtn: {
        eng: 'Cancel',
        rus: 'Отменить'
    },
    deleteArticleBtnInModal: {
        eng: 'Delete',
        rus: 'Удалить'
    },
    editArticleBtnText: {
        eng: 'Edit',
        rus: 'Редактировать'
    },
}

export const articleFormMessages = getMessagesObject(obj)