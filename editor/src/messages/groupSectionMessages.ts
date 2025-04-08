import getMsgProxy from './fn/msgProxy'

// Содержимое вкладки «Сайты»
const groupSectionMessages = {
    siteNameInput: {
        eng: 'Name',
        rus: 'Название'
    },
    siteNamePlaceholder: {
        eng: 'For example: Corporate portal',
        rus: 'Например: Корпоративный портал'
    },
    siteNameInputRequired: {
        eng: 'This field is required',
        rus: 'Обязательное поле'
    },
    siteNameInputIsTooLong: {
        eng: 'Site name can not be longer than 255 characters',
        rus: 'Название сайта не может быть длиннее 255 символов'
    },
    defaultSiteTemplateIdInput: {
        eng: 'The default group template',
        rus: 'Шаблон группы по умолчанию'
    },
    defaultMetaTemplateIdInput: {
        eng: 'The default metadata template',
        rus: 'Шаблон метаданных по умолчанию'
    },
    submitBtnTextNewSite: {
        eng: 'Create',
        rus: 'Создать'
    },
    submitBtnTextSave: {
        eng: 'Save',
        rus: 'Сохранить'
    },
    deleteSiteBtnText: {
        eng: 'Delete',
        rus: 'Удалить'
    },
    deleteSiteModalHeader: {
        eng: 'Are you sure you want to delete the group?',
        rus: 'Вы точно хотите удалить группу?'
    },
    deleteSiteConfirmationTextInModal: {
        eng: 'If you delete the group, all of its templates plugins, component templates and articles will also be deleted. Delete the group?',
        rus: 'При удалении группы будут удалены и все его шаблоны подключаемых файлов, шаблоны компонентов и статьи. Удалить группу?'
    },
    closeDeleteSiteModalBtn: {
        eng: 'Cancel',
        rus: 'Отменить'
    },
    deleteSiteBtnInModal: {
        eng: 'Delete',
        rus: 'Удалить'
    },
    defaultSiteTemplateNotSelected: {
        eng: 'Not selected',
        rus: 'Не выбрано'
    },
}

const siteSectionMsg = getMsgProxy<typeof groupSectionMessages>(groupSectionMessages)
export default siteSectionMsg