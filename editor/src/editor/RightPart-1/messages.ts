
type messagesType = {
    [key: string]: {
        [key: string]: {
            [key: string]: string
        }
    }
}

const messages: messagesType = {
    // Содержимое вкладки «Сайты»
    SiteSection: {
        headerNewSite: {
            eng: 'NewSite',
            rus: 'Новый сайт'
        },
        siteNameInput: {
            eng: 'Name',
            rus: 'Название'
        },
        siteNamePlaceholder: {
            eng: 'For example: Corporate portal',
            rus: 'Например: Корпоративный портал'
        },
        siteNameInputRequired: {
            eng: 'Required',
            rus: 'Обязательное поле'
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
        deleteSiteConfirmationTextInModal: {
            eng: 'If you delete the site, all of its templates plugins, component templates and articles will also be deleted. Delete the site?',
            rus: 'При удалении сайта будут удалены и все его шаблоны подключаемых файлов, шаблоны компонентов и статьи. Удалить сайт?'
        },
        closeDeleteSiteModalBtn: {
            eng: 'Cancel',
            rus: 'Отменить'
        },
        deleteSiteBtnInModal: {
            eng: 'Delete',
            rus: 'Удалить'
        },
    },
}

export default messages