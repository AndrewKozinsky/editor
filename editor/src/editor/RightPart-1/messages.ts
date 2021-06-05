
type messagesType = {
    [key: string]: {
        [key: string]: {
            [key: string]: string
        }
    }
}

const messages: messagesType = {
    // Названия вкладок на первой правой вкладке
    Tabs: {
        sites: {
            eng: 'Sites',
            rus: 'Сайты'
        },
        incFilesTemplates: {
            eng: 'Templates of plug-in files',
            rus: 'Шаблоны подключаемых файлов'
        },
        components: {
            eng: 'Component templates',
            rus: 'Шаблоны компонентов'
        },
        articles: {
            eng: 'Articles',
            rus: 'Статьи'
        },

    },
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
        defaultTemplateInput: {
            eng: 'The default template of the plug-in files',
            rus: 'Шаблон подключаемых файлов по умолчанию'
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
        defaultTemplateSelectNoValue: {
            eng: 'Not selected',
            rus: 'Не выбрано'
        },
    },
    // Содержимое вкладки «Шаблоны подключаемых файлов»
    IncFilesTemplateSection: {
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
        templateNameInputRequired: {
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
    // Структура папок и файлов шаблонов компонентов
    FoldersComponentsSection: {
        createNewFolderBth: {
            eng: 'New folder',
            rus: 'Новая папка'
        },
        createNewFileBth: {
            eng: 'New component',
            rus: 'Новый компонент'
        },
    },
    // Форма редактирования выбранной папки шаблона компонента
    ComponentFolderForm: {
        folderNameInput: {
            eng: 'Component name',
            rus: 'Название компонента'
        },
        submitBtnTextSave: {
            eng: 'Save',
            rus: 'Сохранить'
        },
        deleteFolderBtnText: {
            eng: 'Delete',
            rus: 'Удалить'
        },
        formNameInputRequired: {
            eng: 'The folder name cannot be empty',
            rus: 'Название папки не может быть пустым'
        },
        deleteFolderConfirmationTextInModal: {
            eng: 'Are you sure you want to delete the folder with the component templates',
            rus: 'Вы уверены, что хотите удалить папку с шаблонами компонентов?'
        },
        closeDeleteFolderModalBtn: {
            eng: 'Cancel',
            rus: 'Отменить'
        },
        deleteFolderBtnInModal: {
            eng: 'Delete',
            rus: 'Удалить'
        },
    },
    // Форма редактирования выбранного шаблона компонента
    ComponentTemplateForm: {
        componentNameInput: {
            eng: 'Component name',
            rus: 'Название компонента'
        },
        componentNamePlaceholder: {
            eng: 'Banner, for example',
            rus: 'Например: Баннер'
        },
        componentCodeInput: {
            eng: 'Markup',
            rus: 'Разметка'
        },
        submitBtnTextNew: {
            eng: 'Create',
            rus: 'Создать'
        },
        submitBtnTextSave: {
            eng: 'Save',
            rus: 'Сохранить'
        },
        deleteComponentBtnText: {
            eng: 'Delete',
            rus: 'Удалить'
        },
    },
}

export default messages