import * as express from 'express'
import { Application, Request, Response } from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'
const cookieParser = require('cookie-parser')
import userRouter from './routes/userRouter'
import { AppError } from './utils/errors/appError'
import { globalErrorHandler } from './controllers/errorController'
import { addExtraHeaders } from './middlewares/commonMiddlewares'


const app: Application = express()

// Разбор кук
app.use(cookieParser())
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

app.use(express.static(path.join(__dirname, 'staticFiles')))

// Установка в req.headers.lang английского языка если язык не передан
app.use(addExtraHeaders)

app.get("/", function (req: Request, res: Response) {
    res.send("Our api server is working correctly.")
})

// Маршруты API
app.use('/users/', userRouter);

// Статические файлы на сервере.
app.use(express.static(path.join(__dirname, 'staticFiles')))

// Обработка несуществующего маршрута
app.all("*", (req, res, next) => {
    next(
        new AppError(`Can't find ${req.originalUrl} on the server!`, 404)
    )
})

// Глобальный обработчик ошибок
app.use(globalErrorHandler)

export default app