import getMsgProxy from './fn/msgProxy'

// Содержимое вкладки «Пользователь»
const userTabContentMessages = {
    header: {
        eng: 'User',
        rus: 'Пользователь'
    },
}

const userTabContentMsg = getMsgProxy<typeof userTabContentMessages>(userTabContentMessages)
export default userTabContentMsg