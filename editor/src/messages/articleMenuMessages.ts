import getMsgProxy from './fn/msgProxy'

// Форма редактирования выбранной папки шаблона компонента
const articleMenuMessages = {
    undo: {
        eng: 'Undo',
        rus: 'Шаг назад'
    },
    redo: {
        eng: 'Redo',
        rus: 'Шаг вперёд'
    },
    markup: {
        eng: 'Get HTML',
        rus: 'Получить HTML'
    },
    data: {
        eng: 'Get data',
        rus: 'Получить данные'
    },
    save: {
        eng: 'Save',
        rus: 'Сохранить'
    },
    close: {
        eng: 'Close',
        rus: 'Закрыть'
    },

    markupModalHeader: {
        eng: 'HTML article',
        rus: 'HTML статьи'
    },
    dataModalHeader: {
        eng: 'Article data',
        rus: 'Данные статьи'
    },

    closeArticleModalHeader: {
        eng: 'Are you really want to close the article?',
        rus: 'Вы уверены в закрытии статьи?'
    },
    closeArticleModalText: {
        eng: 'There is unsaved data in the article. Does the article need to be saved before closing?',
        rus: 'В статье есть несохранённые данные. Нужно ли сохранить статью перед закрытием?'
    },
    closeArticleModalDoNotSaveBtn: {
        eng: `Don't save`,
        rus: 'Не сохранять'
    },
    closeArticleModalSaveBtn: {
        eng: 'Save',
        rus: 'Сохранить'
    },

    deleteModalHeader: {
        eng: 'Are you sure to delete the article?',
        rus: 'Вы действительно хотите удалить статью?'
    },
    deleteModalDeleteBtn: {
        eng: 'Delete',
        rus: 'Удалить'
    },
    deleteModalText: {
        eng: 'This article will be deleted without possibility of restoration.',
        rus: 'Эта статья будет удалена без возможности восстановления.'
    },
    delete: {
        eng: 'Delete',
        rus: 'Удалить'
    },
}

const articleMenuMsg = getMsgProxy<typeof articleMenuMessages>(articleMenuMessages)
export default articleMenuMsg