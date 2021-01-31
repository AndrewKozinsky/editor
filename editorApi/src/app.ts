import * as express from 'express'
import { Application } from 'express'
//const path = require('path')
//const cookieParser = require('cookie-parser')
import * as bodyParser from 'body-parser';
//const rateLimit = require('express-rate-limit')
import userRouter from './routes/userRouter'
//const myNotesRouter = require('./routes/myNotesRouter')
//const AppError = require('./utils/appError')
//const globalErrorHandler = require('./controllers/errorController')


const app: Application = express()

//app.use(cookieParser())
// Разбор тела запроса
app.use(bodyParser.json())

// Сделаю чтобы в свойство body объекта запроса заносились данные присланные в теле запроса
//app.use(express.json({limit: '10kb'}))

// Ограничение количества запросов
/*const rater = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour!'
})
app.use('/', rater)*/

app.get("/test", function (req, res) {
    res.send("Our api server is working correctly.")
})

// Маршруты API
app.use('/api/v1/users/', userRouter);


// Статические файлы на сервере.
//app.use(express.static(path.join(__dirname, 'static-files')))


// Обработка несуществующего маршрута
/*app.all("*", (req, res, next) => {
    next(
        new AppError(`Can't find ${req.originalUrl} on the server!`, 404)
    )
})*/

// Глобальный обработчик ошибок
//app.use(globalErrorHandler)

export default app