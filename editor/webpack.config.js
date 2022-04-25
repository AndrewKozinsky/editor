const webpack = require('webpack')

const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = function(env) {
    // Режим разработки?
    const isDev = env.mode !== 'production'
    
    return {
        entry: './src/index.tsx',
        mode: isDev ? 'development' : 'production',
        module: {
            rules: [
                parseJS(),
                parseCSS(isDev),
                parseAssets()
            ]
        },
        devtool: getDevTool(isDev),
        resolve: getResolve(),
        devServer: getDevServerSettings(),
        plugins: getPlugins(isDev),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js',
            assetModuleFilename: 'images/[hash][ext][query]'
        }
    }
}

// Функция возвращает настройки загрузчика для JavaScript
function parseJS() {
    return {
        test: /\.(ts|js)x?$/,
        use: [{ loader: 'babel-loader' }],
        exclude: /node_modules/,
    }
}

// Функция возвращает настройки загрузчика для CSS
function parseCSS(isDev) {
    if (isDev) {
        return {
            test: /\.s?css$/i,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        }
    }
    else {
        return {
            test: /\.s?css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        }
    }
}

// Функция возвращает настройки загрузчика других типов файлов
function parseAssets() {
    return {
        test: /\.(png|jpg|jpeg|gif|woff2|pdf)$/i,
        type: 'asset/resource',
    }
}

// Функция возвращает значение параметра devtools
function getDevTool(isDev) {
    return isDev ? 'inline-source-map' : false // eval
}

// Функция возвращает объект для свойства resolve
function getResolve() {
    return {
        // Почему-то без этой настройки TypeScript не работает
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.png', '.woff2'],
        modules: ['node_modules'],
        alias: {
            src:      path.resolve(__dirname, './src/'),
            articleManager: path.resolve(__dirname, './src/articleManager'),
            common:   path.resolve(__dirname, './src/common'),
            editor:   path.resolve(__dirname, './src/editor'),
            entrance: path.resolve(__dirname, './src/entrance'),
            libs:     path.resolve(__dirname, './src/libs'),
            messages: path.resolve(__dirname, './src/messages'),
            modules:  path.resolve(__dirname, './src/modules'),
            pages:    path.resolve(__dirname, './src/pages'),
            requests: path.resolve(__dirname, './src/requests'),
            store:    path.resolve(__dirname, './src/store'),
            types:    path.resolve(__dirname, './src/types'),
            utils:    path.resolve(__dirname, './src/utils'),
            event:    path.resolve(__dirname, './src/event'),
        }
    }
}

// Функция возвращает значение параметра devtools
function getDevServerSettings() {
    return {
        compress: true,
        port: 3000,
        host: '0.0.0.0',
        historyApiFallback: true,
        allowedHosts: 'all',
        hot: false,
        client: {
            webSocketURL: 'auto://0.0.0.0:0/ws'
        },
    }
}

// Функция возвращающая массив plugins
function getPlugins(isDev) {
    if (isDev) {
        return [
            // Очистка папки с компилированными файлами перед помещением других
            new CleanWebpackPlugin(),
            // Формирование index.html
            new HtmlWebpackPlugin(getHtmlConfig()),
            // Передача в Реакт переменной окружения. По какой-то причине я не смог передать строку.
            new webpack.DefinePlugin({ 'process.env.isDev': isDev })
        ]
    }
    else {
        return [
            // Формирование index.html
            new HtmlWebpackPlugin(getHtmlConfig()),
            // Формирование файлов CSS из строковых стилей
            new MiniCssExtractPlugin({
                filename: 'main-[fullhash:6].css'
            })
        ]
    }
}

// Функция возращающая объект с настройками HtmlWebpackPlugin
function getHtmlConfig() {
    return {
        title: 'Editorium',
        template: './static/template.html',
        favicon: './static/favicon2x.png'
    }
}
