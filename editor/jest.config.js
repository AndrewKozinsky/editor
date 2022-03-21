module.exports = {
    verbose: true,
    testEnvironment: 'jsdom',
    // collectCoverage: true,
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest'
    },
    'modulePaths': ['src'],
    'moduleNameMapper': {
        '^utils$': `<rootDir>/utils/`,
    }
    //"src": "<rootDir>/src/",
    // articleManager: path.resolve(__dirname, './src/articleManager'),
    // common: path.resolve(__dirname, './src/common'),
    // editor: path.resolve(__dirname, './src/editor'),
    // entrance: path.resolve(__dirname, './src/entrance'),
    // libs: path.resolve(__dirname, './src/libs'),
    // messages: path.resolve(__dirname, './src/messages'),
    // modules: path.resolve(__dirname, './src/modules'),
    // pages: path.resolve(__dirname, './src/pages'),
    // requests: path.resolve(__dirname, './src/requests'),
    // store: path.resolve(__dirname, './src/store'),
    // types: path.resolve(__dirname, './src/types'),
    // utils$: '<rootDir>/src/utils'
}
