
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
            eng: 'New site',
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
    // Содержимое вкладки «Сайты»
    PluginsSection: {
        headerNewPlugin: {
            eng: 'New template',
            rus: 'Новый шаблон'
        },
        newTemplateBtn: {
            eng: 'New file template',
            rus: 'Новый шаблон файлов'
        },
        templateNameInput: {
            eng: 'Template name',
            rus: 'Название шаблона'
        },
        templateNamePlaceholder: {
            eng: 'For example: Dark article',
            rus: 'Например: Тёмная статья'
        },
        defaultTemplateCheckboxLabel: {
            eng: 'Default template',
            rus: 'Шаблон по умолчанию'
        },
        headInput: {
            eng: 'Code added to <head>',
            rus: 'Код добавляемый в <head>'
        },
        bodyInput: {
            eng: 'Code added before </body>',
            rus: 'Код добавляемый до </body>'
        },
        pluginNameInputRequired: {
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
        deletePluginConfirmationTextInModal: {
            eng: 'Are you sure you want to delete the plugin template?',
            rus: 'Вы уверены, что хотите удалить шаблон подключаемых файлов?'
        },
        closeDeletePluginModalBtn: {
            eng: 'Cancel',
            rus: 'Отменить'
        },
        deletePluginBtnInModal: {
            eng: 'Delete',
            rus: 'Удалить'
        },
    },
}

export default messages