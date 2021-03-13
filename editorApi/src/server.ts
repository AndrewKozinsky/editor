import { config } from './config/config'
import { connectDb } from './utils/db'
import app from './app'


// Выключение сервера при ошибке типа uncaughtException
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION 💥. Shutting down...');
    console.log(err.name, err.message);
    process.exit(1)
})

// Соединение с базой данных
connectDb()
    .on('error', () => console.log('Error'))
    .on('disconnected', connectDb)
    .once('open', startServer)

/**
 * Функция запускает сервер
 */
function startServer(): void {

    // Прослушивание порта на сервере
    const server = app.listen(config.port, (): void => {
        console.log(`⚡️ API server is running`)
    })

    // Выключение сервера при ошибке типа unhandledRejection
    process.on('unhandledRejection', err => {
        console.log(err)
        console.log('UNHANDLED REJECTION. 💥 Shitting down...');
        server.close(() => {
            process.exit(1)
        })
    })
}