import getMsgProxy from './fn/msgProxy'

// Сообщения в IFrame-е редактируемой статьи
const articleSectionMessages = {
    mainSection: {
        eng: 'General',
        rus: 'Основные'
    },
    metaSection: {
        eng: 'Metadata',
        rus: 'Метаданные'
    },
    submitMetaFormButton: {
        eng: 'Save',
        rus: 'Сохранить'
    },
    defaultSelectItem: {
        eng: 'Not selected',
        rus: 'Не выбрано'
    },
    selectMetaTempSelectLabel: {
        eng: 'Metadata template',
        rus: 'Шаблон метаданных'
    },
}

const articleSectionMsg = getMsgProxy<typeof articleSectionMessages>(articleSectionMessages)
export default articleSectionMsg