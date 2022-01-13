import getMsgProxy from './fn/msgProxy'

// Содержимое вкладки «Редактор»
const editorTabContentMessages = {
    header: {
        eng: 'Editor',
        rus: 'Редактор'
    },
}

const editorTabContentMsg = getMsgProxy<typeof editorTabContentMessages>(editorTabContentMessages)
export default editorTabContentMsg