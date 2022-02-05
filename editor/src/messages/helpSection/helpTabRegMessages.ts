import getMsgProxy from '../fn/msgProxy'

// Содержимое вкладки «Пользователь»
const helpTabRegMessages = {
    header: {
        eng: 'Registration',
        rus: 'Регистрация'
    },
}

const helpTabRegMsg = getMsgProxy<typeof helpTabRegMessages>(helpTabRegMessages)
export default helpTabRegMsg