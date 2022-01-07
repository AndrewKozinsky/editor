import getMsgProxy from './fn/msgProxy'

// Форма редактирования выбранного шаблона компонента
const componentFormMessages = {
    componentContentInput: {
        eng: 'Component template code',
        rus: 'Код шаблона компонента'
    },
    componentContentInputIsWrong: {
        eng: 'The component\'s template code is not correct',
        rus: 'Код шаблона компонента не правильный'
    },
    submitBtnTextSave: {
        eng: 'Save',
        rus: 'Сохранить'
    },
    deleteComponentBtnText: {
        eng: 'Delete',
        rus: 'Удалить'
    },
    deleteComponentConfirmationHeaderInModal: {
        eng: 'Delete a component template?',
        rus: 'Удалить шаблон компонента?'
    },
    deleteComponentConfirmationTextInModal: {
        eng: 'Are you sure you want to delete the component template?',
        rus: 'Вы уверены, что хотите удалить шаблон компонента?'
    },
    closeDeleteComponentModalBtn: {
        eng: 'Cancel',
        rus: 'Отменить'
    },
    deleteComponentBtnInModal: {
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
}

const componentFormMsg = getMsgProxy<typeof componentFormMessages>(componentFormMessages)
export default componentFormMsg