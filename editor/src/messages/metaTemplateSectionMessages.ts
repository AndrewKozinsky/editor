import getMsgProxy from './fn/msgProxy'

// Содержимое вкладки «Шаблоны подключаемых файлов»
const metaTemplateSectionMessages = {
    newTemplateBtn: {
        eng: 'New metadata template',
        rus: 'Новый шаблон метаданных'
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
    deleteMetaTemplateBtnText: {
        eng: 'Delete',
        rus: 'Удалить'
    },
    deleteConfirmationHeaderInModal: {
        eng: 'Deleting the metadata template',
        rus: 'Удаление шаблона метаданных?'
    },
    deleteConfirmationTextInModal: {
        eng: 'Are you sure you want to delete the metadata template?',
        rus: 'Вы уверены, что хотите удалить шаблон метаданных?'
    },
    /*closeDeleteModalBtn: {
        eng: 'Cancel',
        rus: 'Отменить'
    },*/
    deleteBtnInModal: {
        eng: 'Delete',
        rus: 'Удалить'
    },
    /*checkCodeErrorHeader: {
        eng: 'The template needs to be refined',
        rus: 'Шаблон требует доработки'
    },*/
    /*checkCodeSuccessHeader: {
        eng: 'The template is correct',
        rus: 'Шаблон написан верно'
    },*/

    // Тексты ошибок при проверке кода
}

const metaTemplateSectionMsg = getMsgProxy<typeof metaTemplateSectionMessages>(metaTemplateSectionMessages)
export default metaTemplateSectionMsg