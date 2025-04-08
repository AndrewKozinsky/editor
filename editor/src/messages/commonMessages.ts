import getMsgProxy from './fn/msgProxy'

// Сообщения не привязанные к конкретному месту
const commonMessages = {
    emailPlaceholder: {
        eng: 'For example: mail@gmail.com',
        rus: 'Например: mail@gmail.com'
    },
    emailErrInvalid: {
        eng: 'Invalid email address',
        rus: 'Почта написана неправильно'
    },
    requiredField: {
        eng: 'Required field',
        rus: 'Обязательное поле'
    },
    emailToLong: {
        eng: 'Must be 100 characters or less',
        rus: 'Максимум можно ввести 100 символов'
    },
    passwordToShort: {
        eng: 'Must be 6 characters or more',
        rus: 'Минимально нужно ввести 6 символов'
    },
    passwordToLong: {
        eng: 'Must be 50 characters or less',
        rus: 'Максимум можно ввести 50 символов'
    },
    // Пункт без значения в выпадающие списки и переключатели
    optionNotSelected: {
        eng: 'Not selected',
        rus: 'Не выбрано'
    },
}

const commonMsg = getMsgProxy<typeof commonMessages>(commonMessages)
export default commonMsg