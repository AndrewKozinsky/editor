import { promisify } from 'util'
import { compare } from 'bcrypt'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { Repository } from 'typeorm'
import { sign, verify } from 'jsonwebtoken'
import { CreateUserDto } from './dto/createUser.dto'
import { createRandomString } from 'src/utils/stringUtils'
import MiscTypes from 'src/types/miscTypes'
import { Email } from 'src/utils/email/email'
import { Response } from 'express'
import { config } from 'src/config'
import { UserResponseInterface } from './types/userResponse.interface'
import responseCommonError from 'src/utils/error/responseCommonError'
import { LoginDto } from './dto/login.dto'
import { ExpressRequestInterface } from 'src/types/expressRequest.interface'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async getTokenData(request: ExpressRequestInterface): Promise<UserEntity> {
        const token = request?.cookies.authToken

        // Если токен не передан, то возвратить ошибочный ответ
        if(!token) sendErrorResponse()

        // Расшифровать JWT и получить payload
        const decodedJWT: MiscTypes.JWTDecoded = await promisify( verify )(token, config.jwtSecret)

        // Get user by id
        const user = await this.userRepository.findOne(decodedJWT.id)

        // Если пользователь не найден, то вернуть ошибочный ответ
        if (!user) sendErrorResponse()

        // Если пароль изменён с последнего захода, то вернуть ошибочный ответ
        if(this.changedPasswordAfter(user, decodedJWT.iat)) {
            sendErrorResponse()
        }

        // Если почта не подтверждена, то вернуть ошибочный ответ
        if(user.emailConfirmToken) {
            sendErrorResponse()
        }

        // Если все проверки прошли мимо, то вернуть пользователя
        return user

        // Функция возвращающая ошибочный ответ
        function sendErrorResponse() {
            responseCommonError('user_getTokenData_tokenIsNotPassed', HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

    async createUser(createUserDto: CreateUserDto, language: MiscTypes.Language): Promise<UserEntity> {

        // Throw an error if user exists
        if (await this.getUserByEmail(createUserDto.email)) {
            responseCommonError('user_createUser_alreadyRegistered', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const emailConfirmToken = createRandomString()

        const newUser = new UserEntity()
        Object.assign(
            newUser,
            { emailConfirmToken },
            { language },
            createUserDto
        )

        // Отправление письма с подтверждением почты
        await sendEmailAddressConfirmLetter(language, newUser.email, emailConfirmToken)

        return await this.userRepository.save(newUser)
    }

    async login(loginDto: LoginDto): Promise<UserEntity> {

        // Get user by email
        const user = await this.userRepository.findOne({email: loginDto.email})
        const isPasswordMatch = compare(loginDto.password, user.password)

        // Throw an error response if user passed wrong data
        if (!user || !isPasswordMatch) {
            responseCommonError('user_login_userDoesNotExist')
        }

        // Throw an error response if user didn't confirm its email
        if (user.emailConfirmToken) {
            responseCommonError('user_login_userDoesNotConfirmEmail')
        }

        return user
    }

    // ADDITIONAL METHODS

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({email})
    }

    generateToken(user: UserEntity): string {
        return sign(
            { id: user.id },
            config.jwtSecret,
            { expiresIn: config.jwtExpiresIn + config.jwtExpiresUnit }
        )
    }

    /**
     * The function form response and send it to clien
     * @param {Object} user — user data from database
     * @param {Object} response — response object
     * @param {Boolean} setCookieToken — do I have to put token cookie
     * @param {Number} statusCode — status code
     */
    buildUserResponse(
        user: UserEntity,
        response: Response,
        setCookieToken: boolean = true,
        statusCode: number = HttpStatus.OK
    ): void {
        const token = this.generateToken(user)

        const resBody: UserResponseInterface = {
            status: 'success',
            statusCode,
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    language: user.language,
                    token
                }
            }
        }

        if (setCookieToken) {
            const cookieOptions = {
                expires: new Date(Date.now() + config.jwtExpiresIn * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            response.cookie('token', token, cookieOptions).send(resBody)
        }
        else {
            response.send(resBody)
        }
    }

    changedPasswordAfter = function (user: UserEntity, JWTTimestamp: number) {

        if(user.passwordChangedAt) {
            const changedTimestamp = Math.round(
                this.passwordChangedAt.getTime() / 1000
            )

            return JWTTimestamp < changedTimestamp
        }

        return false
    }
}


/**
 * Функция отправляющая письмо со ссылкой подтверждения почты
 * @param {String} language — объект запроса от клиента
 * @param {String} email — почта пользователю, которую он должен подтвердить
 * @param {String} confirmToken — токен подтверждения почты
 * @returns {Promise<void>}
 */
async function sendEmailAddressConfirmLetter(language: MiscTypes.Language, email: string, confirmToken: string) {

    // Создать новое письмо...
    // В конструктор передаётся почта пользователя и URL сайта вида https://editorium.net
    const userEmail = new Email(email, language)

    // Послать письмо для подтверждения почты
    userEmail.sendConfirmLetter(confirmToken).then(() => {})
}
