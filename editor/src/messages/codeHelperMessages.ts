import getMsgProxy from './fn/msgProxy'

// Содержимое вкладки «Шаблоны подключаемых файлов»
const codeHelperMessages = {
    checkCodeErrorHeader: {
        eng: 'The template needs to be refined',
        rus: 'Шаблон требует доработки'
    },
    checkCodeSuccessHeader: {
        eng: 'The template is correct',
        rus: 'Шаблон написан верно'
    },
    exampleHeader: {
        eng: 'Example',
        rus: 'Пример'
    },
}

const codeHelperMsg = getMsgProxy<typeof codeHelperMessages>(codeHelperMessages)
export default codeHelperMsg