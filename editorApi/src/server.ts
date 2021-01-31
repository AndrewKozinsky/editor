import {port} from './configuration'
import {connectDb} from './utils/db'
import app from './app'


// Выключение сервера при ошибке типа uncaughtException
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION 💥. Shutting down...');
    console.log(err.name, err.message);
    process.exit(1)
})

// Соединение с базой данных
connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer)

/**
 * Функция запускает сервер
 */
function startServer() {

    // Прослушивание порта на сервере
    const server = app.listen(port, (): void => {
        console.log(`⚡️ Server is running at http:localhost/:${port}`)
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