import getMsgProxy from './fn/msgProxy'

// Содержимое вкладки «Шаблоны подключаемых файлов»
const siteTemplateSectionMessages = {
    newTemplateBtn: {
        eng: 'New site template',
        rus: 'Новый шаблон сайта'
    },
    templateCodeInput: {
        eng: 'Template code',
        rus: 'Код шаблона'
    },
    codeInputRequired: {
        eng: 'Required',
        rus: 'Обязательное поле'
    },
    codeInputIsWrong: {
        eng: 'Incorrect template code',
        rus: 'Неверный код шаблона'
    },
    submitBtnTextNew: {
        eng: 'Create',
        rus: 'Создать'
    },
    submitBtnTextSave: {
        eng: 'Save',
        rus: 'Сохранить'
    },
    deleteSiteTemplateBtnText: {
        eng: 'Delete',
        rus: 'Удалить'
    },
    deleteConfirmationHeaderInModal: {
        eng: 'Deleting the group template',
        rus: 'Удаление шаблон группы?'
    },
    deleteConfirmationTextInModal: {
        eng: 'Are you sure you want to delete the site template?',
        rus: 'Вы уверены, что хотите удалить шаблон сайта?'
    },
    closeDeleteModalBtn: {
        eng: 'Cancel',
        rus: 'Отменить'
    },
    deleteBtnInModal: {
        eng: 'Delete',
        rus: 'Удалить'
    },
    checkCodeErrorHeader: {
        eng: 'The template needs to be refined',
        rus: 'Шаблон требует доработки'
    },
    checkCodeSuccessHeader: {
        eng: 'The template is correct',
        rus: 'Шаблон написан верно'
    },

    // Тексты ошибок при проверке кода
}

const siteTemplateSectionMsg = getMsgProxy<typeof siteTemplateSectionMessages>(siteTemplateSectionMessages)
export default siteTemplateSectionMsg