import getMsgProxy from './fn/msgProxy'

// Секция «Язык»
const languageSectionMessages = {
    langRadiosHeader: {
        eng: 'Language',
        rus: 'Язык'
    },
    landWillChangeAfterReload: {
        eng: 'The interface language will change after the page reloads',
        rus: 'Язык интерфейса поменяется после перезагрузки страницы'
    },
}

const languageSectionMsg = getMsgProxy<typeof languageSectionMessages>(languageSectionMessages)
export default languageSectionMsg