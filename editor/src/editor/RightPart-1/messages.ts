
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
        submitBtnText: {
            eng: 'Save',
            rus: 'Сохранить'
        },
    },
}

export default messages