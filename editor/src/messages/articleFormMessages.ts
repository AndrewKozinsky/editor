import getMsgProxy from './fn/msgProxy'

// Форма редактирования выбранной статьи
const articleFormMessages = {
    articleNameInput: {
        eng: 'Article name',
        rus: 'Название статьи'
    },
    articleNameRequired: {
        eng: 'The article name cannot be empty',
        rus: 'Название статьи не может быть пустым'
    },
    articleNameIsTooLong: {
        eng: 'An article name cannot be longer than 255 characters',
        rus: 'Название статьи не может быть длиннее 255 символов'
    },
    defaultTemplateInput: {
        eng: 'Group Include Files',
        rus: 'Подключаемые файлы группы'
    },
    submitBtnText: {
        eng: 'Save',
        rus: 'Сохранить'
    },
    deleteArticleBtnText: {
        eng: 'Delete',
        rus: 'Удалить'
    },
    deleteArticleConfirmationHeaderInModal: {
        eng: 'Are you sure you want to delete the article?',
        rus: 'Хотите удалить статью?'
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
    toEditor: {
        eng: 'To the editor',
        rus: 'В редактор'
    },
    articleIsAlreadyEdited: {
        eng: 'It is already being edited',
        rus: 'Уже редактируется'
    },
    templateNotSelected: {
        eng: 'Not selected',
        rus: 'Не выбрано'
    },
}

const articleFormMsg = getMsgProxy<typeof articleFormMessages>(articleFormMessages)
export default articleFormMsg