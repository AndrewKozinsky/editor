const config = {
    verbose: true,
    transform: {
        '^.+\\.ts?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest'
    },
}

module.exports = config