import { Response, NextFunction } from 'express'
const jwt = require('jsonwebtoken')
import * as crypto from 'crypto'
import {promisify} from 'util'
import { catchAsync } from '../../utils/errors/catchAsync'
import UserModel from '../../models/user';
import { AppError } from '../../utils/errors/appError'
import { Email } from '../../utils/email/email'
import { createSendToken, sendResponseWithAuthToken } from '../authToken'
import { IUser } from '../../models/user'
import {config} from '../../config/config'
import {getMessageDependingOnTheLang} from '../../utils/errors/messages';
import {ExtendedRequestType, JWTDecodedType } from '../../types/commonTypes'


// Функция отдающая данные по переданному токену. Токен передаётся в куках.
export const getTokenData = async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    let token

    // Получение токена из кук
    if(req.cookies && req.cookies.authToken) {
        token = req.cookies.authToken
    }

    // Если токен не передан, то возвратить ошибочный ответ
    if(!token) return sendErrorResponse(next)

    // Расшифровать JWT и получить payload
        const decoded = await promisify( jwt.verify )(token, config.jwtSecret)

    // Получить пользователя
    const currentUser = await UserModel.findById(decoded.id)

    // Если пользователь не найден, то вернуть ошибочный ответ
    if(!currentUser) return sendErrorResponse(next)

    // Если пароль изменён с последнего захода, то вернуть ошибочный ответ
    if(currentUser.changedPasswordAfter(decoded.iat)) {
        return sendErrorResponse(next)
    }

    // Если все проверки прошли мимо, то вернуть положительный ответ вместе с данными пользователя
    res.status(200).json({
        status: 'success',
        data: {
            name: currentUser.name,
            email: currentUser.email
        }
    })

    // Функция возвращающая ошибочный ответ
    function sendErrorResponse(next: NextFunction) {
        return next(
            new AppError('{{authController.getTokenDataNoCorrectToken}}', 401)
        )
    }
}


// Функция защищающая маршрут от неавторизованных пользователей.
// Если пользователь отправил токен, то программа запускает следующий middleware.
// Если не отправил, то выбрасывает ошибку.
export const protect = catchAsync(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    let token: string | undefined

    // Получение токена
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    } else if(req.cookies && req.cookies.authToken) {
        token = req.cookies.authToken
    }

    // Если токен не передан, то бросить ошибку
    if(!token) {
        return next(
            new AppError('{{authController.protectNoToken}}', 401)
        )
    }

    // Расшифровка JWT и получение payload
    const decoded: JWTDecodedType = await promisify( jwt.verify )(token, config.jwtSecret)

    // Получение пользователя
    const currentUser: IUser | null = await UserModel.findById(decoded.id).select('+password')

    // Проверка существования пользователя
    if(!currentUser) {
        return next(
            new AppError('{{authController.protectNoUser}}', 401)
        )
    }

    // Проверить что пароль не изменён
    if(currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError('{{authController.protectPasswordChanged}}', 401)
        )
    }

    // Поставить в req.user данные пользователя
    req.user = currentUser

    next()
})


/** Обработчик регистрации пользователя */
export const signUp = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Токен подтверждения почты
    const emailConfirmToken: string = crypto.randomBytes(32).toString('hex')

    // Создать нового пользователя
    const newUser = await UserModel.create({
        email: req.body.email,
        emailConfirmToken: emailConfirmToken,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        language: <string>req.get('Editor-Language') || 'eng'
    })

    // Отправление письма с подтверждением почты
    await sendEmailAddressConfirmLetter(req, req.body.email, emailConfirmToken)

    // Создание объекта ответа с токеном пользователя
    const resWithToken = createSendToken(newUser._id, res)

    // Отправить данные пользователю
    sendResponseWithAuthToken(newUser, resWithToken)
})


// Обработчик подтверждения почты пользователя
export const confirmEmail = catchAsync(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Найти пользователя с таким же токеном подтверждения почты
    // и удалить свойство emailConfirmToken потому что почта подтверждена.
    const user: IUser | null = await UserModel.findOneAndUpdate(
        { emailConfirmToken: req.params.token },
        { emailConfirmToken: undefined }, // Как изменить объект
        { new: true } // Вернуть объект после изменения свойства
    )

    // Язык пользователя и тип запроса
    const lang = <string>req.headers['Editor-Language'] // eng или rus
    const reqSource = <string>req.headers['Editor-Request-Source'] // api или browser

    // Если пользователь не найден...
    if(!user) {
        // Если запрос сделан через Postman
        if (reqSource === 'api') {
            // Бросить ошибку
            return next(
                new AppError('{{authController.confirmEmailUserNotFound}}', 400)
            )
        }
        // Если запрос сделан из браузера
        else {
            // Отправить страницу перебрасывающую пользователя на страницу где ему сообщат,
            // что пользователь уже подтвердил свою почту или такого пользователя не существует.
            return res.status(200).send(createRedirectPage('emailIsNotConfirmed', lang))
        }
    }

    // Пользователь найден...

    // Создать объект ответа с токеном пользователя
    const resWithToken = createSendToken(user._id, res)

    // Если запрос сделан через Postman
    if (reqSource === 'api') {
        // Послать положительный ответ
        res.status(200).json({
            status: 'success',
            data: {
                message: getMessageDependingOnTheLang('{{authController.confirmEmailIsConfirmed}}', lang)
            }
        })
    }
    // Если запрос сделан из браузера
    else if (reqSource === 'browser') {
        // Отправить страницу перебрасывающую пользователя на страницу где ему сообщат,
        // что пользователь успешно подтвердил свою почту.
        resWithToken.status(200).send(createRedirectPage('emailIsConfirmed', lang))
    }
})


// Вход пользователя
export const logIn = catchAsync(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Почта и пароль из тела запроса
    const email: string = req.body.email
    const password: string = req.body.password

    // Если почту или пароль не передали, то попросить ввести и завершить функцию
    if(!email || !password) {
        return next(
            new AppError('{{authController.loginNoEmailOrPassword}}', 400)
        )
    }

    // Получение данных пользователя с паролем и без __v
    const user: IUser | null = await UserModel.findOne({email}).select('+password -__v')

    // Если пользователь не найден или пароли не совпадают, то бросить ошибку.
    if(!user || !await user.correctPassword(password, user.password)) {
        return next(
            new AppError('{{authController.loginWrongEmailOrPassword}}', 400)
        )
    }

    // Если в данных пользователя в поле emailConfirmToken есть строка,
    // то значит пользователь еще не подтвердил почту. Попросить чтобы подтвердил.
    if(user.emailConfirmToken) {
        return next(
            new AppError('{{authController.loginConfirmEmail}}', 403)
        )
    }

    // Создать объект ответа с токеном пользователя
    const resWithToken = createSendToken(user._id, res)

    // Отправить данные пользователя
    sendResponseWithAuthToken(user, resWithToken)
})

// Выход пользователя (защищённый маршрут)
export const logOut = (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    res.cookie('authToken', 'loggedout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    })

    res.status(200).json({
        status: 'success'
    })
}


// Функция создаёт токен сброса пароля, ставит в ссылку изменения пароля и отправляет на почту пользователя.
export const forgotPassword = catchAsync(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Получить данные пользователя по переданной почте
    const user: IUser | null = await UserModel.findOne({ email: req.body.email })

    // Вернуть ошибку если пользователь не найден
    if(!user) {
        return next(
            new AppError('{{authController.forgotPasswordNoUser}}', 404)
        )
    }

    // Пользователь найден...

    // Создать токен сброса и записать его в свойство passwordResetToken в объект с данными найденного пользователя
    // По этому токену определяется по какому пользователю нужно сбрасывать пароль.
    const resetToken = user.createPasswordResetToken()

    // Домен сервиса
    const domain = config.workMode === 'development' ? config.devSiteURL : config.publishedSiteURL

    // Адрес страницы где нужно написать новый пароль
    const resetUrl = domain + `/reset-password/${resetToken}`

    // Язык
    const lang = <string>req.get('Editor-Language')

    // Послать пользователю письмо со сбросом пароля
    try {
        // Создать письмо
        const userEmail = new Email(user.email, domain, lang)

        // Отправить письмо со сбросом пароля
        await userEmail.sendForgotPasswordLetter(resetUrl)

        // Сохранить обновлённые данные пользователя
        await user.save({
            validateBeforeSave: false
        })

        // Послать положительный ответ
        res.status(200).json({
            status: 'success',
            data: {
                message: getMessageDependingOnTheLang('{{authController.forgotPasswordEmailHasBeenSent}}', lang)
            }
        })
    }
    // Не удалось послать письмо со сбросом пароля...
    catch (err) {
        // Бросить ошибку
        return next(
            new AppError('{{authController.forgotPasswordCanNotSendEmail}}', 500)
        )
    }
})


// Функция меняет пароль взамен забытого
export const resetPassword = catchAsync(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Если не передали пароль или подтверждение пароля, или если они не равны, то бросить ошибку
    if ((!req.body.password || !req.body.passwordConfirm) || (req.body.password !== req.body.passwordConfirm)) {
        return next(
            new AppError('{{authController.resetPasswordPasswordIsNotProvided}}', 400)
        )
    }

    // Зашифровать токен потому что в БД он хранится зашифрованным
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex')

    // Найду пользователя по токену смены пароля
    let user: IUser | null = await UserModel.findOne({
        passwordResetToken: hashedToken,
    })

    // Если срок годности токена сброса просрочен, то обнулить переменную user
    if (user && user.passwordResetExpires) {
        if (Date.now() >= +user.passwordResetExpires) {
            user = null
        }
    }

    // Бросить ошибку если пользователь не найден.
    if (!user) {
        return next(
            new AppError('{{authController.resetPasswordTokenIsInvalid}}', 400)
        )
    }

    // Пользователь найден...
    // Задание нового пароля и удаление данных для смены пароля
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined

    // Сохранить данные пользователя
    await user.save()

    // Создание объекта ответа с токеном пользователя
    const resWithToken = createSendToken(user._id, res)

    // Отправить данные пользователя
    sendResponseWithAuthToken(user, resWithToken)
})


/**
 * Функция отправляющая письмо со ссылкой подтверждения почты
 * @param {Object} req — объект запроса от клиента
 * @param {String} email — почта пользователю, которую он должен подтвердить
 * @param {String} confirmToken — токен подтверждения почты
 * @returns {Promise<void>}
 */
async function sendEmailAddressConfirmLetter(req: ExtendedRequestType, email: string, confirmToken: string) {
    // Получение домена в зависимости от режима работы
    const domain = config.workMode === 'development' ? config.devSiteURL : config.publishedSiteURL

    // Адрес подтверждения почты (домен + адрес API)
    let confirmUrl = domain + `/api/users/confirmEmail/${confirmToken}`

    // Язык
    const lang = <string>req.get('Editor-Language')

    // Создать новое письмо...
    // В конструктор передаётся почта пользователя и URL сайта вида https://editorium.net
    const userEmail = new Email(email, domain, lang)

    // Послать письмо для подтверждения почты
    userEmail.sendConfirmLetter(confirmUrl).then(() => {})
}

/**
 * Функция возвращает разметку страницу где написана переадресацию на другую страницу
 * @param {String} type — тип показываемой страницы
 */
function createRedirectPage(type: string, lang: string) {
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
        </head>
        <body>
            <script>
                window.location = "/message?type=${type}&lang=${lang}"
            </script>
        </body>
        </html>`
}
